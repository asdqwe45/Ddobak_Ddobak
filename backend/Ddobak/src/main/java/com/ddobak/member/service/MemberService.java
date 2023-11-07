package com.ddobak.member.service;

import com.ddobak.global.exception.ErrorCode;
import com.ddobak.global.service.S3Service;
import com.ddobak.member.dto.request.MemberLoginRequest;
import com.ddobak.member.dto.request.ModifyInfoTextRequest;
import com.ddobak.member.dto.request.ModifyLoginPasswordRequest;
import com.ddobak.member.dto.request.ModifyNicknameRequest;
import com.ddobak.member.dto.request.SignUpRequest;
import com.ddobak.member.dto.response.LoginResponse;
import com.ddobak.member.dto.response.RefreshTokenResponse;
import com.ddobak.member.entity.Member;
import com.ddobak.member.entity.SignUpType;
import com.ddobak.member.exception.EmailException;
import com.ddobak.member.exception.MemberException;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.security.util.JwtProvider;
import com.ddobak.security.util.LoginInfo;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final Long emailExpireTimeMs =  1800000L;
    private final String EMAIL_PREFIX = "AuthCode";

    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final S3Service s3Service;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    private final RedisTemplate<String, String> redisTemplate;

    @Value("${jwt.token.secret}")
    private String secretKey;

    public void sendCodeToEmail(String email) {
        checkDuplicatedEmail(email);
        String title = "또박또박 이메일 인증 번호";
        String authCode = createCode();

        // 메일 보내기
        emailService.sendEmail(email,title,authCode);

        // 이메일 인증 요청 시 인증 번호 Redis에 저장 후 비교
        redisTemplate.opsForValue().set(EMAIL_PREFIX + email, authCode, emailExpireTimeMs, TimeUnit.MILLISECONDS);
    }

    public void verifyEmail(String email, String authCode) {
        String redisAuthCode = redisTemplate.opsForValue().get(EMAIL_PREFIX+email);

        // 인증번호 비교
        if(redisAuthCode == null || !redisAuthCode.equals(authCode)) {
            throw new EmailException(ErrorCode.EMAIL_NOT_VALID);
        }

        // 인증 후 Redis에서 삭제
        redisTemplate.delete(EMAIL_PREFIX+email);

    }

    @Transactional
    public void signUpMember(SignUpRequest signUpRequest, MultipartFile profileImg) {
        // 이메일 중복 검사
        this.checkDuplicatedEmail(signUpRequest.email());

        // 이메일 인증 여부 검사 -> 캐시에 없으면 인증된것으로 간주
        String redisAuthCode = redisTemplate.opsForValue().get(EMAIL_PREFIX+signUpRequest.email());

        // 회원 Entity 생성
        Member member = Member.from(signUpRequest);
        member.encodePassword(passwordEncoder.encode(member.getLoginPassword()));

        // 프로필 이미지 저장
        if (profileImg != null) {
            String profileImgAddress = s3Service.uploadFile(profileImg);
            member.registerProfileImg(profileImgAddress);
        }

        memberRepository.save(member);
    }

    @Transactional
    public LoginResponse loginMember(MemberLoginRequest memberLoginRequest) {
        // 회원 검색
        Member member = findByEmailGeneral(memberLoginRequest.email(), SignUpType.GENERAL);

        // 비밀번호 확인
        if(!passwordEncoder.matches(memberLoginRequest.loginPassword(), member.getLoginPassword())) {
            throw new MemberException(ErrorCode.INVALID_PASSWORD);
        }

        // 토큰 생성
        String accessToken = jwtProvider.createAccessToken(member.getId(), member.getEmail(), secretKey);
        String refreshToken = jwtProvider.createRefreshToken(member.getEmail(), secretKey);
        String profileImgUrl = member.getProfileImg();

        return new LoginResponse(member.getId(), accessToken, refreshToken, profileImgUrl);
    }

    @Transactional
    public void logoutMember(LoginInfo loginInfo) {
        if(redisTemplate.hasKey(loginInfo.email())) {
            redisTemplate.delete(loginInfo.email());
        }
    }

    @Transactional
    public void modifyInfoText(LoginInfo loginInfo, ModifyInfoTextRequest modifyInfoTextRequest) {
        // 회원 검색
        Member member = findByEmail(loginInfo.email());

        member.modifyInfoText(modifyInfoTextRequest.infoText());
    }

    @Transactional(readOnly = true)
    public void isNicknameDuplicated(String nickname) {
        boolean memberExists = memberRepository.existsByNickname(nickname);

        if(memberExists) {
            throw new MemberException(ErrorCode.NICKNAME_DUPLICATED);
        }
    }

    @Transactional
    public RefreshTokenResponse refreshToken(String refreshToken) {
        String accessToken = jwtProvider.createNewAccessToken(refreshToken, secretKey);

        return new RefreshTokenResponse(accessToken);
    }

    @Transactional
    public void modifyNickname(LoginInfo loginInfo, ModifyNicknameRequest modifyNicknameRequest) {
        boolean memberExists = memberRepository.existsByNickname(modifyNicknameRequest.nickname());

        if(memberExists) {
            throw new MemberException(ErrorCode.NICKNAME_DUPLICATED);
        }
        else{
            Member member = findByEmail(loginInfo.email());

            member.modifyNickname(modifyNicknameRequest.nickname());
        }
    }

    @Transactional
    public void modifyProfileImg(LoginInfo loginInfo, MultipartFile profileImg) {
        Member member = findByEmail(loginInfo.email());

        String profileImgAddress = s3Service.uploadFile(profileImg);
        member.registerProfileImg(profileImgAddress);
    }

    @Transactional
    public void modifyLoginPassword(LoginInfo loginInfo, ModifyLoginPasswordRequest modifyLoginPasswordRequest) {
        Member member = findByEmail(loginInfo.email());

        // 비밀번호 비교
        if(!passwordEncoder.matches(modifyLoginPasswordRequest.prevLoginPassword(), member.getLoginPassword())){
            throw new MemberException(ErrorCode.PASSWORD_NOT_SAME);
        }
        else {
            member.encodePassword(passwordEncoder.encode(modifyLoginPasswordRequest.newLoginPassword()));
        }

    }

    public Member findByEmail(String email) {
        return memberRepository.findByEmail(email).orElseThrow(() -> new MemberException(ErrorCode.USER_NOT_FOUND));
    }

    private Member findByEmailGeneral(String email, SignUpType signUpType) {
        return memberRepository.findByEmailAndSignUpType(email,signUpType)
                               .orElseThrow(() -> new MemberException(ErrorCode.USER_NOT_FOUND));
    }

    public Member findSellerById(Long id) {
        return memberRepository.findById(id).orElseThrow(() -> new MemberException(ErrorCode.SELLER_NOT_FOUND));
    }

    private String createCode() {
        int length = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder sb = new StringBuilder();
            for(int i=0;i<length;i++) {
                sb.append(random.nextInt(10));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new EmailException(ErrorCode.NO_ALGORITHM);
        }
    }

    private void checkDuplicatedEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);

        if(member.isPresent()) {
            log.info("Already exists email {}", email);
            throw new MemberException(ErrorCode.EMAIL_DUPLICATED);
        }
    }
}

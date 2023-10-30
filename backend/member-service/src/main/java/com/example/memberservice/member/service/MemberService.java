package com.example.memberservice.member.service;

import com.example.memberservice.global.exception.ErrorCode;
import com.example.memberservice.global.service.S3Service;
import com.example.memberservice.member.dto.request.SignUpRequest;
import com.example.memberservice.member.entity.Member;
import com.example.memberservice.member.exception.EmailException;
import com.example.memberservice.member.exception.MemberException;
import com.example.memberservice.member.repository.MemberRepository;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Optional;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final Long emailExpireTimeMs =  1800000L;
    private final String EMAIL_PREFIX = "AuthCode";

    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final S3Service s3Service;
    private final BCryptPasswordEncoder passwordEncoder;

    private final RedisTemplate<String, String> redisTemplate;

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

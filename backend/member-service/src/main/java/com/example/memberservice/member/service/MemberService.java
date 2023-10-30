package com.example.memberservice.member.service;

import com.example.memberservice.global.exception.ErrorCode;
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
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private final Long emailExpireTimeMs =  1800000L;
    private final String EMAIL_PREFIX = "AuthCode";

    private final MemberRepository memberRepository;
    private final EmailService emailService;
    private final RedisTemplate<String, String> redisTemplate;

    public void sendCodeToEmail(String email) {
        checkDuplicatedEmail(email);
        String title = "또박또박 이메일 인증 번호";
        String authCode = createCode();
        emailService.sendEmail(email,title,authCode);

        // 이메일 인증 요청 시 인증 번호 Redis에 저장 후 비교
        redisTemplate.opsForValue().set(EMAIL_PREFIX + email, authCode, emailExpireTimeMs, TimeUnit.MILLISECONDS);
    }

    public void verifyEmail(String email, String authCode) {
        String redisAuthCode = redisTemplate.opsForValue().get(EMAIL_PREFIX+email);

        if(redisAuthCode == null || !redisAuthCode.equals(authCode)) {
            throw new EmailException(ErrorCode.EMAIL_NOT_VALID);
        }
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

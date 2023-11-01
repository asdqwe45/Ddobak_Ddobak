package com.example.memberservice.member.controller;

import com.example.memberservice.member.dto.request.EmailVerificationRequest;
import com.example.memberservice.member.dto.request.EmailVerifyRequest;
import com.example.memberservice.member.dto.request.MemberLoginRequest;
import com.example.memberservice.member.dto.request.SignUpRequest;
import com.example.memberservice.member.dto.response.TokenResponse;
import com.example.memberservice.member.service.EmailService;
import com.example.memberservice.member.service.MemberService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;
    private final EmailService emailService;

    // 이메일 인증 요청
    @PostMapping("/email/verify-request")
    public ResponseEntity<Void> sendEmail(@RequestBody EmailVerifyRequest emailVerifyRequest) {
       log.info("Send Email to {}", emailVerifyRequest.email());

       memberService.sendCodeToEmail(emailVerifyRequest.email());

       return ResponseEntity.noContent().build();
   }

   // 이메일 인증 확인
    @GetMapping("/email/verify")
    public ResponseEntity<Void> verifyEmail(@RequestBody EmailVerificationRequest emailVerificationRequest) {
        log.info("verify email {} with authCode {}", emailVerificationRequest.email(), emailVerificationRequest.authCode());

        memberService.verifyEmail(emailVerificationRequest.email(),
            emailVerificationRequest.authCode());

        return ResponseEntity.noContent().build();
   }

   // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<Void> singUpMember(@RequestPart SignUpRequest signUpRequest, @RequestPart(required = false) MultipartFile profileImg) {
        log.info("{} request signUp", signUpRequest.email());

        memberService.signUpMember(signUpRequest, profileImg);

        return ResponseEntity.noContent().build();
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> memberLogin(@RequestBody @Valid MemberLoginRequest memberLoginRequest) {
        log.info("{} request Login", memberLoginRequest.email());

        TokenResponse tokenResponse = memberService.loginMember(memberLoginRequest);

        return ResponseEntity.ok().body(tokenResponse);
    }

}

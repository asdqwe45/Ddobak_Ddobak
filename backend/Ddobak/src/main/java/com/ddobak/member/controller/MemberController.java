package com.ddobak.member.controller;

import com.ddobak.member.dto.request.EmailVerificationRequest;
import com.ddobak.member.dto.request.EmailVerifyRequest;
import com.ddobak.member.dto.request.MemberLoginRequest;
import com.ddobak.member.dto.request.SignUpRequest;
import com.ddobak.member.dto.response.LoginResponse;
import com.ddobak.member.service.MemberService;
import com.ddobak.security.util.LoginInfo;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;

    // 이메일 인증 요청
    @PostMapping("/email/verify-request")
    public ResponseEntity<Void> sendEmail(@RequestBody EmailVerifyRequest emailVerifyRequest) {
        log.debug("Send Email to {}", emailVerifyRequest.email());

        memberService.sendCodeToEmail(emailVerifyRequest.email());

        return ResponseEntity.noContent().build();
    }

    // 이메일 인증 확인
    @GetMapping("/email/verify")
    public ResponseEntity<Void> verifyEmail(@RequestBody EmailVerificationRequest emailVerificationRequest) {
        log.debug("verify email {} with authCode {}", emailVerificationRequest.email(), emailVerificationRequest.authCode());

        memberService.verifyEmail(emailVerificationRequest.email(),
            emailVerificationRequest.authCode());

        return ResponseEntity.noContent().build();
    }

    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<Void> singUpMember(@RequestPart SignUpRequest signUpRequest, @RequestPart(required = false) MultipartFile profileImg) {
        log.debug("{} request signUp", signUpRequest.email());

        memberService.signUpMember(signUpRequest, profileImg);

        return ResponseEntity.noContent().build();
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> memberLogin(@RequestBody @Valid MemberLoginRequest memberLoginRequest) {
        log.debug("{} request Login", memberLoginRequest.email());

        LoginResponse loginResponse = memberService.loginMember(memberLoginRequest);

        return ResponseEntity.ok().body(loginResponse);
    }

    // 로그아웃
    @GetMapping("/logout")
    public ResponseEntity<Void> memberLogout(@AuthenticationPrincipal LoginInfo loginInfo) {
        log.debug("{} wants logout", loginInfo.email());

        memberService.logoutMember(loginInfo);
        return ResponseEntity.noContent().build();
    }
}

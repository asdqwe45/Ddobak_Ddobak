package com.example.memberservice.member.controller;

import com.example.memberservice.member.dto.request.EmailVerificationRequest;
import com.example.memberservice.member.dto.request.EmailVerifyRequest;
import com.example.memberservice.member.service.EmailService;
import com.example.memberservice.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;
    private final EmailService emailService;

    @PostMapping("/email/verify-request")
    public ResponseEntity<Void> sendEmail(@RequestBody EmailVerifyRequest emailVerifyRequest) {
       log.info("Send Email to {}", emailVerifyRequest.email());

       memberService.sendCodeToEmail(emailVerifyRequest.email());

       return ResponseEntity.noContent().build();
   }

   @GetMapping("/email/verify")
    public ResponseEntity<Void> verifyEmail(@RequestBody EmailVerificationRequest emailVerificationRequest) {
        log.info("verify email {} with authCode {}", emailVerificationRequest.email(), emailVerificationRequest.authCode());

        memberService.verifyEmail(emailVerificationRequest.email(),
            emailVerificationRequest.authCode());

        return ResponseEntity.noContent().build();
   }
}

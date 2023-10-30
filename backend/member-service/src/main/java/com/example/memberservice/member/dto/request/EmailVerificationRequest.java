package com.example.memberservice.member.dto.request;

public record EmailVerificationRequest(String email, String authCode) {

}

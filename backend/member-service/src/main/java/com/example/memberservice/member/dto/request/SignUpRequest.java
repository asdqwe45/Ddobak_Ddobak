package com.example.memberservice.member.dto.request;

public record SignUpRequest(
    String email,
    String nickname,
    String loginPassword
) {

}

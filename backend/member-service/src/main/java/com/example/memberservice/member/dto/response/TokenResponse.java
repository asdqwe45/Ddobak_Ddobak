package com.example.memberservice.member.dto.response;

public record TokenResponse(
    Long id,
    String accessToken,
    String refreshToken
) {

}

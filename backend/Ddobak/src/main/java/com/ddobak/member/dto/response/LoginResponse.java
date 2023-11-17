package com.ddobak.member.dto.response;

public record LoginResponse(
    Long id,
    String accessToken,
    String refreshToken,
    String profileImgUrl,
    boolean productionStatus
) {

}

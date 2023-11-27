package com.ddobak.member.dto.request;

public record EmailVerificationRequest(String email, String authCode) {

}

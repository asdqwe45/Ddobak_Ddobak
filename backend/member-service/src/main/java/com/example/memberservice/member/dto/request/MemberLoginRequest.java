package com.example.memberservice.member.dto.request;

import javax.validation.constraints.NotBlank;

public record MemberLoginRequest(
    @NotBlank String email,
    @NotBlank String loginPassword
) {

}

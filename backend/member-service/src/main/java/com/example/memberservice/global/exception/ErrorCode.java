package com.example.memberservice.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Member Exception
    NICKNAME_DUPLICATED("MEM01", HttpStatus.CONFLICT, "이미 사용중인 닉네임입니다.");

    private final String code;
    private final HttpStatus httpStatus;
    private final String message;
}

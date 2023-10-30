package com.example.memberservice.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Email Exception
    EMAIL_SEND_ERROR("EMA01", HttpStatus.INTERNAL_SERVER_ERROR, "전송 실패"),
    NO_ALGORITHM("EMA02",HttpStatus.NOT_IMPLEMENTED,"해당 알고리즘 존재 하지 않음"),
    EMAIL_NOT_VALID("EMA03",HttpStatus.UNAUTHORIZED,"인증번호가 다릅니다."),

    // Member Exception
    EMAIL_DUPLICATED("MEM01",HttpStatus.CONFLICT,"이미 가입된 이메일입니다.");

    private final String code;
    private final HttpStatus httpStatus;
    private final String message;
}

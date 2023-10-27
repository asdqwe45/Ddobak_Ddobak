package com.example.memberservice.global.dto.response;

import com.example.memberservice.global.exception.ErrorCode;

public record ErrorResponse(
    String code,
    ErrorCode errorCode,
    String message
) {

}

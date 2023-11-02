package com.ddobak.global.dto.response;

import com.ddobak.global.exception.ErrorCode;

public record ErrorResponse(
    String code,
    ErrorCode errorCode,
    String message
) {

}

package com.example.memberservice.member.exception;

import com.example.memberservice.global.exception.BaseException;
import com.example.memberservice.global.exception.ErrorCode;

public class EmailException extends BaseException {

    public EmailException(ErrorCode errorCode) {
        super(errorCode);
    }
}

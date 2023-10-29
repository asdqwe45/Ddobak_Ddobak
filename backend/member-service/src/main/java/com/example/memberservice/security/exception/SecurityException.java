package com.example.memberservice.security.exception;

import com.example.memberservice.global.exception.BaseException;
import com.example.memberservice.global.exception.ErrorCode;

public class SecurityException extends BaseException {
    public SecurityException(ErrorCode errorCode) {super(errorCode);}
}

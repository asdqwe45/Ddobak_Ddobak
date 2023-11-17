package com.ddobak.security.exception;

import com.ddobak.global.exception.BaseException;
import com.ddobak.global.exception.ErrorCode;

public class SecurityException extends BaseException {

    public SecurityException(ErrorCode errorCode) {
        super(errorCode);
    }
}

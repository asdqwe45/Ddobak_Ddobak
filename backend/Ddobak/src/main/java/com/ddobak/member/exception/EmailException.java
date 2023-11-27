package com.ddobak.member.exception;

import com.ddobak.global.exception.BaseException;
import com.ddobak.global.exception.ErrorCode;

public class EmailException extends BaseException {

    public EmailException(ErrorCode errorCode) {
        super(errorCode);
    }
}

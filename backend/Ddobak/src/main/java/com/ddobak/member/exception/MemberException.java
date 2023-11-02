package com.ddobak.member.exception;

import com.ddobak.global.exception.BaseException;
import com.ddobak.global.exception.ErrorCode;

public class MemberException extends BaseException {

    public MemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}

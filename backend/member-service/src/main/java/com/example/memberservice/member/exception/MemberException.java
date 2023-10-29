package com.example.memberservice.member.exception;

import com.example.memberservice.global.exception.BaseException;
import com.example.memberservice.global.exception.ErrorCode;

public class MemberException extends BaseException {

    public MemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}

package com.ddobak.global.exception;

public class S3Exception extends BaseException{

    public S3Exception(ErrorCode errorCode) {
        super(errorCode);
    }
}

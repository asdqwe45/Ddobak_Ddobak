package com.ddobak.transaction.exception;

import com.ddobak.global.exception.BaseException;
import com.ddobak.global.exception.ErrorCode;

public class TransactionException extends BaseException {
    public TransactionException(ErrorCode errorCode) {
        super(errorCode);
    }
}

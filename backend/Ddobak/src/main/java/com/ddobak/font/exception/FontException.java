package com.ddobak.font.exception;

import com.ddobak.global.exception.BaseException;
import com.ddobak.global.exception.ErrorCode;

public class FontException extends BaseException {

    public FontException(ErrorCode errorCode) {
        super(errorCode);
    }
}

package com.ddobak.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Email Exception
    EMAIL_SEND_ERROR("EMA01", HttpStatus.INTERNAL_SERVER_ERROR, "전송 실패"),
    NO_ALGORITHM("EMA02",HttpStatus.NOT_IMPLEMENTED,"해당 알고리즘 존재 하지 않음"),
    EMAIL_NOT_VALID("EMA03",HttpStatus.UNAUTHORIZED,"인증번호가 다릅니다."),

    // Member Exception
    EMAIL_DUPLICATED("MEM01",HttpStatus.CONFLICT,"이미 가입된 이메일입니다."),
    USER_NOT_FOUND("MEM02", HttpStatus.NOT_FOUND,"존재하지 않는 회원입니다."),
    INVALID_PASSWORD("MEM03",HttpStatus.BAD_REQUEST, "비밀번호가 틀립니다"),
    NICKNAME_DUPLICATED("MEM04",HttpStatus.CONFLICT,"이미 가입된 닉네임입니다."),
    PASSWORD_NOT_SAME("MEM05", HttpStatus.CONFLICT, "현재 비밀번호가 일치 하지 않습니다."),
    SELLER_NOT_FOUND("MEM06",HttpStatus.NOT_FOUND, "존재 하지 않는 판매자 입니다."),

    // S3 Exception
    UPLOAD_FAIL("AWS01",HttpStatus.BAD_REQUEST,"알수 없는 이유로 업로드 실패"),

    // Security Exception
    INVALID_REFRESH_TOKEN("TOK01",HttpStatus.BAD_REQUEST,"유효하지 않은 토큰"),

    // Convert Exception
    CONVERT_FAIL("CON01", HttpStatus.BAD_REQUEST, "변환할 파일 형식이 올바르지 않습니다."),

    // AI Exception
    AI_FAIL("AI01",HttpStatus.BAD_REQUEST,"AI Response의 파일 타입이 올바르지 않습니다."),

    // Font Exception
    PAY_FAIL("FONT01", HttpStatus.BAD_REQUEST, "포인트가 부족합니다."),
    FONT_NOT_FOUND("FONT02", HttpStatus.NOT_FOUND, "존재 하지 않는 폰트입니다."),

    // Transaction Exception
    POINT_NOT_ENOUGH("TRAN01", HttpStatus.BAD_REQUEST, "포인트가 부족합니다.");

    private final String code;
    private final HttpStatus httpStatus;
    private final String message;
}

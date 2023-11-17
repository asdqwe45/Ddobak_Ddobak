package com.ddobak.transaction.dto.response;

public record FontResponse(
    Long fontId,
    String fontName,
    String fontFileUrl,
    boolean openStatus
) {

}

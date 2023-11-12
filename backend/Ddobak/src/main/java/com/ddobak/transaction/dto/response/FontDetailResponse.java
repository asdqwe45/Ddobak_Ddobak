package com.ddobak.transaction.dto.response;

public record FontDetailResponse(
    Long fontId,
    String fontName,
    String fontUrl,
    String producerName,
    boolean openStatus
) {

}

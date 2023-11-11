package com.ddobak.transaction.dto.response;

public record ProducerResponse(
    Long producerId,
    String fontName,
    boolean favoriteStatus,
    boolean followStatus
) {

}

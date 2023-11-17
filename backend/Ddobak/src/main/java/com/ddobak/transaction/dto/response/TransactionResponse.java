package com.ddobak.transaction.dto.response;

import java.time.LocalDateTime;

public record TransactionResponse(
    LocalDateTime transactionDate,
    String transactionType,
    String fontName,
    String fontCreator,
    int transactionAmount,
    int transactionAfterAmount,
    boolean isMultiple,
    int totalOrderCount
) {

}

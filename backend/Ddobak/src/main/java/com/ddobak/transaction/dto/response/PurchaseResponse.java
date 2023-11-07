package com.ddobak.transaction.dto.response;

public record PurchaseResponse(int purchaseAmount, int purchaseAfterAmount, boolean isMultiple) {

}

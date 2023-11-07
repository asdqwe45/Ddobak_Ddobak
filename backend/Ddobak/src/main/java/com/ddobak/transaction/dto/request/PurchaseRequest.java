package com.ddobak.transaction.dto.request;

public record PurchaseRequest(Long fontId, Long sellerId, int amount) {

}

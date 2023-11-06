package com.ddobak.review.dto.request;

public record ReviewRegisterRequest(
    Long fontId,
    String imageUrl,
    String context
) {
}

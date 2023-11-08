package com.ddobak.review.dto.response;

public record ReviewResponse(
        String reviewer,
        String reviewContext,
        String reviewUrl
) {
}

package com.ddobak.review.dto.response;

import java.util.List;

public record ReviewListResponse(
        Long reviewCount,
        List<ReviewResponse> reviewResponseList
) {
    public ReviewListResponse(Long reviewCount,List<ReviewResponse> reviewResponseList){
        this.reviewCount=reviewCount;
        this.reviewResponseList=reviewResponseList;
    }
}

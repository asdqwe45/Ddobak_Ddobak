package com.ddobak.font.dto.response;

import com.ddobak.review.dto.response.ReviewResponse;

import java.util.List;

public record FontDetailResponse(
        Long fontId,
        Boolean dibCheck,
        Long producerId,
        String producerName,
        Integer viewCount,
        List<String> keywords,
        String introduceContext,
        String fontFileUrl,
        Long dibCount,
        String fontName,
        Integer fontPrice,
        Long reviewCount,

        List<ReviewResponse> reviewResponseList
    ) {
    public FontDetailResponse(Long fontId,
                            Boolean dibCheck,
                              Long producerId,
                            String producerName,
                            Integer viewCount,
                            List<String> keywords,
                            String introduceContext,
                            String fontFileUrl,
                              Long dibCount,
                            String fontName,
                              Integer fontPrice,
                              Long reviewCount,
                              List<ReviewResponse> reviewResponseList
                              ){
        this.fontId=fontId;
        this.dibCheck=dibCheck;
        this.producerId=producerId;
        this.producerName=producerName;
        this.viewCount=viewCount;
        this.keywords=keywords;
        this.introduceContext=introduceContext;
        this.fontFileUrl=fontFileUrl;
        this.dibCount = dibCount;
        this.fontName=fontName;
        this.fontPrice=fontPrice;
        this.reviewCount=reviewCount;
        this.reviewResponseList=reviewResponseList;
    }
}

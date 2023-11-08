package com.ddobak.font.dto.response;

import java.util.List;

public record FontDetailResponse(
        Long fontId,
        Boolean dibCheck,
        String producerName,
        Integer viewCount,
        List<String> keywords,
        String introduceContext,
        String fontFileUrl,
        Long dibCount,
        String fontName
    ) {
    public FontDetailResponse(Long fontId,
                            Boolean dibCheck,
                            String producerName,
                            Integer viewCount,
                            List<String> keywords,
                            String introduceContext,
                            String fontFileUrl,
                              Long dibCount,
                            String fontName
                              ){
        this.fontId=fontId;
        this.dibCheck=dibCheck;
        this.producerName=producerName;
        this.viewCount=viewCount;
        this.keywords=keywords;
        this.introduceContext=introduceContext;
        this.fontFileUrl=fontFileUrl;
        this.dibCount = dibCount;
        this.fontName=fontName;
    }
}

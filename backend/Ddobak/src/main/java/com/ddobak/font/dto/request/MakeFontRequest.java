package com.ddobak.font.dto.request;

import java.util.List;

public record MakeFontRequest(
        Long fontId,
        String fontSortUrl,
        String korFontName,
        String engFontName,
        Boolean openStatus,
        Boolean freeStatus,
        int price,
        String introduceText,
        List<String> keywords
) {

}

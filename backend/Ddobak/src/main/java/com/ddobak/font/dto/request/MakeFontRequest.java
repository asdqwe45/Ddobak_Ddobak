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
        Boolean commerceStatus,
        String introduceText,
        Boolean copyrightNotice,
        Boolean samePersonCheck,
        String copyrighter,
        List<String> keywords
) {

}

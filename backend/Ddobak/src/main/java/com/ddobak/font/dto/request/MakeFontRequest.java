package com.ddobak.font.dto.request;

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
        String keyword1,
        String keyword2,
        String keyword3
) {

}

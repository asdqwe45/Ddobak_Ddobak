package com.ddobak.font.dto.request;

public record CreateFontRequest(
       String kor_font_name,
       String eng_font_name,
       Boolean openStatus,
       Boolean freeStatus,
       int price,
       Boolean commerceStatus,
       String introduceText
) {

}

package com.ddobak.basket.dto.response;

public record FontBasketResponse(
        Long fontId,
        String fontName,
        String producer,
        Boolean favoriteCheck,
        Integer fontPrice,
        String fontUrl
) {
    public FontBasketResponse(Long fontId, String fontName, String producer, Boolean favoriteCheck, Integer fontPrice, String fontUrl) {
        this.fontId = fontId;
        this.fontName = fontName;
        this.producer = producer;
        this.favoriteCheck = favoriteCheck;
        this.fontPrice = fontPrice;
        this.fontUrl = fontUrl;
    }
}

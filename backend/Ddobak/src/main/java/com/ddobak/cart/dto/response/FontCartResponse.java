package com.ddobak.cart.dto.response;
public record FontCartResponse(
        Long fontId,
        Long sellerId,
        String fontName,
        String producer,
        Boolean favoriteCheck,
        Integer fontPrice,
        String fontUrl
) {
    public FontCartResponse(Long fontId,Long sellerId, String fontName, String producer, Boolean favoriteCheck, Integer fontPrice, String fontUrl) {
        this.fontId = fontId;
        this.sellerId = sellerId;
        this.fontName = fontName;
        this.producer = producer;
        this.favoriteCheck = favoriteCheck;
        this.fontPrice = fontPrice;
        this.fontUrl = fontUrl;
    }
}

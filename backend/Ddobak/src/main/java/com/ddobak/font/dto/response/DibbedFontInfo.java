package com.ddobak.font.dto.response;

public record DibbedFontInfo (
        Long fontId,
        Boolean dibCheck,
        String producerName,
        String fontFileUrl,
        String fontName
){

    public DibbedFontInfo(Long fontId,
                          Boolean dibCheck,
                          String producerName,
                          String fontFileUrl,
                          String fontName){
        this.fontId=fontId;
        this.dibCheck=dibCheck;
        this.producerName=producerName;
        this.fontFileUrl=fontFileUrl;
        this.fontName=fontName;
        }
}

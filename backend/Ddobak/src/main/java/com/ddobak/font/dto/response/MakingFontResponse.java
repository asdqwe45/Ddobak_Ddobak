package com.ddobak.font.dto.response;

import com.ddobak.font.entity.FontStatusType;

public record MakingFontResponse(
        Long fontId,
        String fontName,
        String fontFileUrl,
        Boolean openStatus,
        FontStatusType makeStatus
) {
    public MakingFontResponse(Long fontId, String fontName, String fontFileUrl, Boolean openStatus, FontStatusType makeStatus) {
        this.fontId = fontId;
        this.fontName = fontName;
        this.fontFileUrl = fontFileUrl;
        this.openStatus = openStatus;
        this.makeStatus = makeStatus;
    }
}

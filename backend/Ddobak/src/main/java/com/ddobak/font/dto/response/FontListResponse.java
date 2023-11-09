package com.ddobak.font.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class FontListResponse {
    private long fontCount;
    private List<FontResponse> fontListResponse;

    public FontListResponse(long fontCount, List<FontResponse> fontList) {
        this.fontCount = fontCount;
        this.fontListResponse = fontList;
    }
}

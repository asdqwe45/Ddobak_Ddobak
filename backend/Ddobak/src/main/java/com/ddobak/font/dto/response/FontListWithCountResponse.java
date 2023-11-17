package com.ddobak.font.dto.response;

import java.util.List;

public record FontListWithCountResponse(
        List<FontResponse> fontResponseList,
        Long fontCount
) {
    public FontListWithCountResponse(List<FontResponse> fontResponseList, Long fontCount){
        this.fontResponseList=fontResponseList;
        this.fontCount = fontCount;
    }
}

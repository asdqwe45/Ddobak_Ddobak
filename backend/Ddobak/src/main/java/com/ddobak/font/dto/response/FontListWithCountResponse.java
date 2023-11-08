package com.ddobak.font.dto.response;

import java.util.List;

public record FontListWithCountResponse(
        Long fontCount,
        List<FontResponse> fontResponseList

) {
    public FontListWithCountResponse( Long fontCount,List<FontResponse> fontResponseList){
        this.fontResponseList=fontResponseList;
        this.fontCount = fontCount;
    }
}

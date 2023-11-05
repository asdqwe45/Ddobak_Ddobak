package com.ddobak.font.dto.response;


public record FontListResponse(
    String kor_fort_url,
    String producer_name,
    Boolean dib_check,
    String font_file_url
    ){
}

package com.ddobak.font.dto.request;

public record CreateFontRequest(
        Long producer_id,
        String font_sort_url,
        String kor_file_name,
        String eng_file_name
) {

}

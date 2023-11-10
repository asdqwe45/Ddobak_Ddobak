package com.ddobak.font.dto.response;


import lombok.Getter;

@Getter
public class FontResponse {
    private Long font_id;
    private String kor_font_name;
    private String producer_name;
    private String font_file_url;
    private Boolean dibCheck;
    private Long producer_id;
    public FontResponse(Long id, String kor_font_name, String producer_name, String font_file_url, Boolean dibCheck, Long producer_id) {
        this.font_id = id;
        this.kor_font_name = kor_font_name;
        this.producer_name = producer_name;
        this.font_file_url = font_file_url;
        this.dibCheck = dibCheck;
        this.producer_id=producer_id;
    }
}

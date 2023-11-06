package com.ddobak.font.dto.response;


import lombok.Getter;

@Getter
public class FontListResponse {
    private Long font_id;
    private String kor_fort_url;
    private String producer_name;
    private String font_file_url;
    private Boolean dibCheck;
    public FontListResponse(Long id, String kor_font_url, String producer_name, String font_file_url, Boolean dibCheck) {
        this.font_id = id;
        this.kor_fort_url = kor_font_url;
        this.producer_name = producer_name;
        this.font_file_url = font_file_url;
        this.dibCheck = dibCheck;
    }
}

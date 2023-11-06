package com.ddobak.font.dto.request;

import lombok.NoArgsConstructor;


public record MakeFontRequest(
        String font_sort_url,
        String kor_font_name,
        String eng_font_name,
        Boolean open_status,
        Boolean free_status,
        int price,
        Boolean commerce_status,
        String introduce_text,
        Boolean copyright_notice,
        Boolean same_person_check,
        String copyrighter,
        String keyword1,
        String keyword2,
        String keyword3
) {

}

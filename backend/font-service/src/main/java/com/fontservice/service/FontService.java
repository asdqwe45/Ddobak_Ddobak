package com.fontservice.service;

import com.fontservice.controller.FontController;
import com.fontservice.domain.Font;
import com.fontservice.repository.FontRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;

import static com.fontservice.controller.FontController.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class FontService {

    private final FontRepository fontRepository;
    public void addFont(
                        Long producer_id,
                        String font_sort_url){
        Font font = new Font(producer_id,font_sort_url);
        fontRepository.save(font);
    }
    public void makeFont(String url,FontWebRequest req){
        Font font = fontRepository.findByFontSortUrl(req.font_sort_url()).get();

        font.setFont_file_url(url);
        font.setPrice(req.price());
        font.setCommerceStatus(req.commerceStatus());
        font.setFreeStatus(req.freeStatus());
        font.setIntroduceText(req.introduceText());
        font.setOpenStatus(req.openStatus());

        fontRepository.save(font);
    }
}

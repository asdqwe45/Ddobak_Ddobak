package com.ddobak.font.service;

import com.fontservice.controller.FontController;
import com.fontservice.domain.Font;
import com.fontservice.repository.FontQueryRepository;
import com.fontservice.repository.FontRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;

import java.util.ArrayList;
import java.util.List;

import static com.fontservice.controller.FontController.*;
import static com.fontservice.repository.FontQueryRepository.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class FontService {

    private final FontRepository fontRepository;
    private final FontQueryRepository fontQueryRepository;
    public void addFont(
        Long producer_id,
        String font_sort_url,
        String font_file_url
    ){
        fontQueryRepository.createFont(producer_id,font_sort_url,font_file_url);

    }

    public void makeFont(String url,FontWebRequest req){
        Font font = new Font();

        font.setFont_file_url(url);
        font.setPrice(req.price());
        font.setCommerceStatus(req.commerceStatus());
        font.setFreeStatus(req.freeStatus());
        font.setIntroduceText(req.introduceText());
        font.setOpenStatus(req.openStatus());

        fontRepository.save(font);
    }

    public void getFontAll() {

    }
}


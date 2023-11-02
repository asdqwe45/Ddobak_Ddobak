package com.ddobak.font.service;

import com.ddobak.font.controller.FontController;
import com.ddobak.font.entity.Font;
import com.ddobak.font.repository.FontQueryRepository;
import com.ddobak.font.repository.FontRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class FontService {

    private final FontRepository fontRepository;
    private final FontQueryRepository fontQueryRepository;
//    public void addFont(
//        Long producer_id,
//        String font_sort_url,
//        String font_file_url
//    ){
//        fontQueryRepository.createFont(producer_id,font_sort_url,font_file_url);
//
//    }

    public void makeFont(String url, FontController.FontWebRequest req){
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


package com.fontservice.service;

import com.fontservice.domain.Font;
import com.fontservice.repository.FontRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class FontService {

    private final FontRepository fontRepository;
    public void addFont(
                        Long producer_id,
                        String font_sort_url){
        Font font = new Font();
        font.setProducer_id(producer_id);
        font.setFont_sort_url(font_sort_url);
        fontRepository.save(font);
    }

}

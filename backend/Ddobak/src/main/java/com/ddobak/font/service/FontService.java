package com.ddobak.font.service;

import com.ddobak.font.controller.FontController;
import com.ddobak.font.dto.request.CreateFontRequest;
import com.ddobak.font.entity.Font;
import com.ddobak.font.repository.FontQueryRepository;
import com.ddobak.font.repository.FontRepository;

import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import javax.swing.text.html.Option;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
public class FontService {

    private final FontRepository fontRepository;
    private final MemberRepository memberRepository;
    public void addFont(CreateFontRequest req, String font_file_url){
        Long member_id = req.producer_id();

        Member member = memberRepository.findById(member_id).orElseThrow(
                () -> new EntityNotFoundException("Member not found with id: " + member_id)
        );
        Font newFont = Font.from(req,font_file_url,member);

        fontRepository.save(newFont);
    }

}


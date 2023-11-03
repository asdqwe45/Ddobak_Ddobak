package com.ddobak.font.service;

import com.ddobak.font.controller.FontController;
import com.ddobak.font.dto.request.CreateFontRequest;
import com.ddobak.font.entity.Font;
import com.ddobak.font.repository.FontQueryRepository;
import com.ddobak.font.repository.FontRepository;

import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.security.util.LoginInfo;
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
    public void createFont(String font_sort_url, LoginInfo loginInfo){
        String email = loginInfo.email();

        Member member = memberRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("Member not found with email: " + email)
        );
        Font newFont = Font.from(font_sort_url,member);

        fontRepository.save(newFont);
    }

}


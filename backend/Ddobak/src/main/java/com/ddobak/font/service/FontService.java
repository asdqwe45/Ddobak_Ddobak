package com.ddobak.font.service;

import com.ddobak.font.dto.request.MakeFontRequest;
import com.ddobak.font.entity.Font;
import com.ddobak.font.entity.Keyword;
import com.ddobak.font.repository.FontQueryRepository;
import com.ddobak.font.repository.FontRepository;

import com.ddobak.font.repository.KeywordRepository;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.security.util.LoginInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class FontService {

    private final FontRepository fontRepository;
    private final MemberRepository memberRepository;
    private final FontQueryRepository fontQueryRepository;
    private final KeywordRepository keywordRepository;
    public void createFont(String font_sort_url, LoginInfo loginInfo){
        String email = loginInfo.email();

        Member member = memberRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("Member not found with email: " + email)
        );
        Font newFont = Font.from(font_sort_url,member);
        System.out.println("############");
        System.out.println(newFont.getFont_sort_url());
        System.out.println("############");

        fontRepository.save(newFont);
    }

    public void makeFont(MakeFontRequest req, LoginInfo loginInfo, String fontUrl) {
        String email = loginInfo.email();

        Member member = memberRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("Member not found with email: " + email)
        );
        System.out.println("1");
        Font font = fontRepository.findByFontSortUrl(req.font_sort_url());
        System.out.println("2");
        font.makeDetail(req,fontUrl);

        if(!keywordRepository.existsByKeyword(req.keyword1())) {
            Keyword keyword = new Keyword(req.keyword1(),font);
            keywordRepository.save(keyword);
            font.getKeywords().add(keyword);
        }else {
            font.getKeywords().add(keywordRepository.findByKeyword(req.keyword1()));
        }
        if(req.keyword2() != null){
            if(!keywordRepository.existsByKeyword(req.keyword2())) {
                Keyword keyword = new Keyword(req.keyword2(),font);
                keywordRepository.save(keyword);
                font.getKeywords().add(keyword);
            }else {
                font.getKeywords().add(keywordRepository.findByKeyword(req.keyword2()));
            }
            if(req.keyword3() != null){
                if(!keywordRepository.existsByKeyword(req.keyword3())) {
                    Keyword keyword = new Keyword(req.keyword3(),font);
                    keywordRepository.save(keyword);
                    font.getKeywords().add(keyword);
                }else {
                    font.getKeywords().add(keywordRepository.findByKeyword(req.keyword3()));
                }
            }
        }


        fontRepository.save(font);



    }

}


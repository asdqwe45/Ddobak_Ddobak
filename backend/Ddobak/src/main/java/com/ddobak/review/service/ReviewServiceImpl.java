package com.ddobak.review.service;

import com.ddobak.font.entity.Font;
import com.ddobak.font.repository.FontRepository;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.review.dto.request.ReviewRegisterRequest;
import com.ddobak.review.entity.Review;
import com.ddobak.security.util.LoginInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@ComponentScan
public class ReviewServiceImpl implements ReviewService{
    private final MemberRepository memberRepository;
    private final FontRepository fontRepository;

    public void registerReview(ReviewRegisterRequest req, LoginInfo loginInfo){
        Member member = memberRepository.findById(loginInfo.id())
                .orElseThrow(() -> new RuntimeException("Member Not Found"));


        Font font = fontRepository.findById(req.fontId())
                .orElseThrow(() -> new RuntimeException("Font Not Found"));
        Review review = new Review(req.context(),req.imageUrl(),member,font);


    }

}

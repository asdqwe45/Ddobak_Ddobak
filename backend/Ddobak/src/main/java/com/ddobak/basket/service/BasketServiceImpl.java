package com.ddobak.basket.service;

import com.ddobak.basket.entity.Basket;
import com.ddobak.basket.repository.BasketRepository;
import com.ddobak.font.entity.Font;
import com.ddobak.font.repository.FontRepository;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.security.util.LoginInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class BasketServiceImpl implements BasketService {
    private final BasketRepository basketRepository;
    private final MemberRepository memberRepository;
    private final FontRepository fontRepository;

    public void addBasket(Long fontId, LoginInfo loginInfo){
        System.out.println("###############");
        Basket basket = basketRepository.findByMemberId(loginInfo.id());
        if(basket == null) {
            Optional<Member> member = memberRepository.findById(loginInfo.id());
            List<Font> fontList = new ArrayList<>();
            basketRepository.save(new Basket(member.get(), fontList));
            basket = basketRepository.findByMemberId(loginInfo.id());
        }
        System.out.println("###############");

        Optional<Font> font = fontRepository.findById(fontId);
        System.out.println("###############");

        basket.getFontList().add(font.get());
        System.out.println("###############");

        basketRepository.save(basket);
    }

}

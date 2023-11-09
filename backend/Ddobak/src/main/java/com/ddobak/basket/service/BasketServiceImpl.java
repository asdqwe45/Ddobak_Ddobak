package com.ddobak.basket.service;

import com.ddobak.basket.dto.response.FontBasketResponse;
import com.ddobak.basket.entity.Basket;
import com.ddobak.basket.repository.BasketRepository;
import com.ddobak.favorite.repository.FavoriteRepository;
import com.ddobak.font.entity.Font;
import com.ddobak.font.repository.FontRepository;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.security.util.LoginInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final FavoriteRepository favoriteRepository;

    public void addBasket(Long fontId, LoginInfo loginInfo){
        System.out.println("###############");
        Basket basket = basketRepository.findByMemberId(loginInfo.id());
        if(basket == null) {
            Optional<Member> member = memberRepository.findById(loginInfo.id());
            List<Font> fontList = new ArrayList<>();
            basketRepository.save(new Basket(member.get(), fontList));
            basket = basketRepository.findByMemberId(loginInfo.id());
        }
        Optional<Font> font = fontRepository.findById(fontId);
        basket.getFontList().add(font.get());
        basketRepository.save(basket);
    }
    public List<FontBasketResponse> getBasketFontList(LoginInfo loginInfo){
    Basket basket = basketRepository.findByMemberId(loginInfo.id());

        List<Font> fontList = basket.getFontList();

        List<FontBasketResponse> result = new ArrayList<>();
        for(Font f : fontList){
            Boolean favoriteCheck = favoriteRepository.existsByMemberIdAndFontId(loginInfo.id(),f.getId());
            FontBasketResponse temp = new FontBasketResponse(f.getId(),f.getKor_font_name(),f.getProducer().getNickname(),favoriteCheck,f.getPrice(),f.getFont_file_url());
            result.add(temp);
        }
        return result;
    }

}

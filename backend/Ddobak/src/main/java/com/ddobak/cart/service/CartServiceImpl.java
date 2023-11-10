package com.ddobak.cart.service;


import com.ddobak.cart.dto.request.AddCartRequest;
import com.ddobak.cart.dto.request.FontDeleteRequest;
import com.ddobak.cart.dto.response.FontCartResponse;
import com.ddobak.cart.entity.Cart;
import com.ddobak.cart.repository.CartRepository;
import com.ddobak.favorite.repository.FavoriteRepository;
import com.ddobak.font.entity.Font;
import com.ddobak.font.entity.FontStatusType;
import com.ddobak.font.exception.FontException;
import com.ddobak.font.repository.FontRepository;
import com.ddobak.global.exception.ErrorCode;
import com.ddobak.member.entity.Member;
import com.ddobak.member.exception.MemberException;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.security.util.LoginInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CartServiceImpl implements com.ddobak.cart.service.CartService {
    private final CartRepository cartRepository;
    private final MemberRepository memberRepository;
    private final FontRepository fontRepository;
    private final FavoriteRepository favoriteRepository;

    @Override
    public void addFontToCart(Long fontId, LoginInfo loginInfo){
        Boolean existCheck = cartRepository.existsByMemberIdAndFontId(loginInfo.id(),fontId);
        System.out.println("############### " + existCheck);
        if(existCheck){
           log.info("이미 존재하는 font : {}", fontId);
           throw new FontException(ErrorCode.FONT_NOT_FOUND);
        }

        Font font = fontRepository.findById(fontId)
                .orElseThrow(() -> {
                    log.error("Font not found with Id: {}", fontId);
                    return new EntityNotFoundException("폰트가 이미 존재합니다.");
                });
        Member member = memberRepository.findById(loginInfo.id())
                .orElseThrow(() -> {
                    log.error("Member not found with Id: {}", loginInfo.id());
                    return new MemberException(ErrorCode.USER_NOT_FOUND);
                });

        Cart cart = new Cart(member,font);

        cartRepository.save(cart);
    }
    @Override
    public List<FontCartResponse> getCart(LoginInfo loginInfo){
        List<Cart> cart = cartRepository.findAllByMemberIdOrderByCreatedAtDesc(loginInfo.id());
        List<FontCartResponse> result = new ArrayList<>();
        for(Cart c : cart){
            Boolean favoriteCheck = favoriteRepository.existsByMemberIdAndFontId(loginInfo.id(),c.getFont().getId());
            FontCartResponse temp = new FontCartResponse(c.getFont().getId(), c.getFont().getKor_font_name(),c.getMember().getNickname(),favoriteCheck,c.getFont().getPrice(),c.getFont().getFont_file_url());
            result.add(temp);
        }

        return result;
    }

    @Override
    public void deleteFontList(List<Long> fontList, LoginInfo loginInfo){
            cartRepository.deleteFontsFromCart(loginInfo.id(),fontList);
    }

}

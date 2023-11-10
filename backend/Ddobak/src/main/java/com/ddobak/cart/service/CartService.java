package com.ddobak.cart.service;


import com.ddobak.cart.dto.request.AddCartRequest;
import com.ddobak.cart.dto.request.FontDeleteRequest;
import com.ddobak.cart.dto.response.FontCartResponse;
import com.ddobak.security.util.LoginInfo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {

    void addFontToCart(Long fontId, LoginInfo loginInfo);

    List<FontCartResponse> getCart(LoginInfo loginInfo);

    void deleteFontList(List<Long> fontList, LoginInfo loginInfo);
}

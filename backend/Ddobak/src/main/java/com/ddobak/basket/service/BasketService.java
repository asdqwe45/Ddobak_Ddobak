package com.ddobak.basket.service;

import com.ddobak.basket.dto.response.FontBasketResponse;
import com.ddobak.security.util.LoginInfo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BasketService {
    void addBasket(Long fontId, LoginInfo loginInfo);

    //List<FontBasketResponse> getBasketList(LoginInfo loginInfo);
}

package com.ddobak.basket.service;

import com.ddobak.security.util.LoginInfo;
import org.springframework.stereotype.Service;

@Service
public interface BasketService {
    void addBasket(Long fontId, LoginInfo loginInfo);
}

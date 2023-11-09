package com.ddobak.basket.controller;

import com.ddobak.basket.dto.request.AddBasketRequest;
import com.ddobak.basket.dto.response.FontBasketResponse;
import com.ddobak.basket.service.BasketService;
import com.ddobak.security.util.LoginInfo;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/basket")
@RequiredArgsConstructor
@Slf4j
public class BasketController {

    private final BasketService basketService;

    @GetMapping("/list")
    public ResponseEntity<List<FontBasketResponse>> getBasketList(@AuthenticationPrincipal LoginInfo loginInfo){

        List<FontBasketResponse> basketResponseList = basketService.getBasketFontList(loginInfo);

        return ResponseEntity.ok(basketResponseList);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBasket(@RequestBody AddBasketRequest req, @AuthenticationPrincipal LoginInfo loginInfo){
        System.out.println("??");
        basketService.addBasket(req.fontId(),loginInfo);

        return ResponseEntity.ok("success");
    }
}

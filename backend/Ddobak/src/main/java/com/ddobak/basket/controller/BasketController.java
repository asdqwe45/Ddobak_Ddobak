package com.ddobak.basket.controller;

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

//    @GetMapping("/list")
//    public ResponseEntity<?> getBasketList(@AuthenticationPrincipal LoginInfo loginInfo){
//
//        List<FontBasketResponse> basketResponseList = basketService.getBasketList(loginInfo);
//
//        return ResponseEntity.ok(null);
//    }

    @PostMapping("/add")
    public ResponseEntity<?> addBasket(@RequestParam Long fontId, @AuthenticationPrincipal LoginInfo loginInfo){
        System.out.println("??");
        basketService.addBasket(fontId,loginInfo);

        return ResponseEntity.ok("success");
    }
}

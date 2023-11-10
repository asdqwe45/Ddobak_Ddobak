package com.ddobak.cart.controller;



import com.ddobak.cart.dto.request.AddCartRequest;
import com.ddobak.cart.dto.request.FontDeleteRequest;
import com.ddobak.cart.dto.response.FontCartResponse;
import com.ddobak.cart.service.CartService;
import com.ddobak.font.dto.response.FontIdResponse;
import com.ddobak.security.util.LoginInfo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {

    private final CartService cartService;

    @PostMapping("/add/{fontId}")
    public ResponseEntity<String> addFontToCart(@PathVariable Long fontId, @AuthenticationPrincipal LoginInfo loginInfo){
        cartService.addFontToCart(fontId,loginInfo);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/get")
    public ResponseEntity<List<FontCartResponse>> getCart(@AuthenticationPrincipal LoginInfo loginInfo){
        List<FontCartResponse> result = cartService.getCart(loginInfo);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCartFont(@RequestParam List<Long> fontList, @AuthenticationPrincipal LoginInfo loginInfo){
        cartService.deleteFontList(fontList,loginInfo);
        return ResponseEntity.ok("success");
    }
}

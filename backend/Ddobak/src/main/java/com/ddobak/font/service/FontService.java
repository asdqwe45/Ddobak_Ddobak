package com.ddobak.font.service;

import com.ddobak.font.dto.request.MakeFontRequest;
import com.ddobak.font.dto.response.FontListResponse;

import com.ddobak.security.util.LoginInfo;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface FontService {


    void createFont(String font_sort_url, LoginInfo loginInfo);

    void makeFont(MakeFontRequest req, LoginInfo loginInfo, String fontUrl);

    ResponseEntity<FontListResponse> getFontList();
}


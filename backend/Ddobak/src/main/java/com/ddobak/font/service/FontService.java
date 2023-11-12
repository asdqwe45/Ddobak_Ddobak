package com.ddobak.font.service;

import com.ddobak.font.dto.request.MakeFontRequest;
import com.ddobak.font.dto.request.finalMakeRequeset;
import com.ddobak.font.dto.response.FontDetailResponse;
import com.ddobak.font.dto.response.FontIdResponse;
import com.ddobak.font.dto.response.FontListResponse;
import com.ddobak.font.dto.response.FontResponse;

import com.ddobak.font.entity.Font;
import com.ddobak.security.util.LoginInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface FontService {


    FontIdResponse createFont(String font_sort_url, LoginInfo loginInfo);

    Font makeFont(MakeFontRequest req, LoginInfo loginInfo);

    FontListResponse getFontList(LoginInfo loginInfo, Pageable pageable, String search, List<String> keywords, Boolean free);

    FontListResponse getFontListNoAuth(Pageable pageable, String search, List<String> keywords, Boolean free);

    FontDetailResponse getFontDetail(Long fontId, LoginInfo loginInfo);

    Font findByFontId(Long id);

    Boolean checkNameDuplicate(String korFontName, String engFontName);

    void finalMakeFont(finalMakeRequeset req, LoginInfo loginInfo);
}


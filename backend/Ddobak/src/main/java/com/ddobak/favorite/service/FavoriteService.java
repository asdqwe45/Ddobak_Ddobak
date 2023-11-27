package com.ddobak.favorite.service;

import com.ddobak.favorite.entity.Favorite;
import com.ddobak.font.dto.response.DibbedFontInfo;
import com.ddobak.font.entity.Font;

import java.util.List;

public interface FavoriteService {

    void makeDib(Long memberId, Long fontId);

    List<Favorite> findByMemberId(Long memberId);

    Long countByFontId(Long fontId);

    void removeDib(Long memberId, Long fontId);

    boolean existsByMemberIDAndFontID(Long memberId, Long fontId);

    DibbedFontInfo getDibbedFontInfo(Font font);
}

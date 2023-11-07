package com.ddobak.favorite.service;

import com.ddobak.favorite.entity.Favorite;

import java.util.List;

public interface FavoriteService {

    void makeDib(Long memberId, Long fontId);

    List<Favorite> findByMemberId(Long memberId);

    Long countByFontId(Long fontId);

    void removeDib(Long memberId, Long fontId);

    boolean existsByMemberIDAndFontID(Long memberId, Long fontId);

}

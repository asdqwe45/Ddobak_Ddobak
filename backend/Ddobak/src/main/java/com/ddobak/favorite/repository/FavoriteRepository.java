package com.ddobak.favorite.repository;

import com.ddobak.favorite.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface FavoriteRepository extends JpaRepository<Favorite, Long> {

    boolean existsByMemberIdAndFontId(Long memberId, Long fontId);
    List<Favorite> findByMemberId(Long memberId);
    Long countByFontId(Long fontId);
    void deleteByMemberIdAndFontId(Long memberId, Long fontId);

}

package com.ddobak.font.repository;

import com.ddobak.font.dto.response.MakingFontResponse;
import com.ddobak.font.entity.Font;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FontRepository extends JpaRepository<Font,Long> {
    @Query("SELECT f FROM Font f WHERE f.font_sort_url = :font_sort_url")
    Optional<Font> findByFontSortUrl(@Param("font_sort_url") String font_sort_url);

    Optional<Font> findAllById(Long font_id);

    Boolean existsByKorFontName(String korFontName);

    Boolean existsByEngFontName(String eng_font_name);

    @Query("SELECT new com.ddobak.font.dto.response.MakingFontResponse(f.id,f.korFontName,f.font_file_url,f.open_status,f.makeStatus) FROM Font f WHERE f.producer = :memberId")
    Optional<List<MakingFontResponse>> findAllByMemberId(@Param("memberId") Long memberId);
}


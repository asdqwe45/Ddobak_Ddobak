package com.ddobak.font.repository;

import com.ddobak.basket.dto.response.FontBasketResponse;
import com.ddobak.font.entity.Font;
import com.ddobak.review.dto.response.ReviewResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FontRepository extends JpaRepository<Font,Long> {
    @Query("SELECT f FROM Font f WHERE f.font_sort_url = :font_sort_url")
    Optional<Font> findByFontSortUrl(@Param("font_sort_url") String font_sort_url);

    Optional<Font> findAllById(Long font_id);


}


package com.ddobak.font.repository;

import com.ddobak.font.entity.Font;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FontRepository extends JpaRepository<Font,Long> {
    @Query("SELECT f FROM Font f WHERE f.font_sort_url = :font_sort_url")
    Font findByFontSortUrl(@Param("font_sort_url") String font_sort_url);

    @Query("SELECT f FROM Font f WHERE f.open_status = true ORDER BY f.create_date DESC")
    Font findFontsByOpenStatusIsTrueOrderByCreate_dateDesc();
}


package com.fontservice.repository;

import com.fontservice.domain.Font;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FontRepository extends JpaRepository<Font,Long> {
    @Query("SELECT f FROM Font f WHERE f.font_sort_url = :font_sort_url")
    Optional<Font> findByFontSortUrl(String font_sort_url);
}

package com.ddobak.font.repository;

import com.ddobak.font.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword,Long> {
    Boolean existsByKeyword(String keyword);
    Keyword findByKeyword(String keyword);
}

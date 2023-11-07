package com.ddobak.font.repository;

import com.ddobak.font.entity.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword,Long> {
    Boolean existsByKeyword(String keyword);
    Optional<Keyword> findByKeyword(String keyword);
}

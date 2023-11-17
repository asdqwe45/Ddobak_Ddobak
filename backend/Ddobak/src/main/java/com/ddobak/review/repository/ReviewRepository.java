package com.ddobak.review.repository;

import com.ddobak.review.dto.response.ReviewResponse;
import com.ddobak.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review,Long> {
    @Query("select new com.ddobak.review.dto.response.ReviewResponse(r.member.nickname, r.context, r.image_url) from Review r where r.font.id = :fontId")
    List<ReviewResponse> findAllByFontId(@Param("fontId") Long fontId);
}

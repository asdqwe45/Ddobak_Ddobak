package com.ddobak.review.controller;

import com.ddobak.review.dto.request.ReviewRegisterRequest;
import com.ddobak.review.dto.response.ReviewListResponse;
import com.ddobak.review.dto.response.ReviewResponse;
import com.ddobak.review.service.ReviewService;
import com.ddobak.security.util.LoginInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/review")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/register")
    public ResponseEntity<?> registerReview(@RequestPart("data") ReviewRegisterRequest req, @RequestPart(value = "file", required = false) MultipartFile image, @AuthenticationPrincipal LoginInfo loginInfo) {
        System.out.println(req.fontId());
        reviewService.registerReview(req, image, loginInfo);
        return ResponseEntity.ok("success");
    }

    @DeleteMapping("/delete/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable Long reviewId, @AuthenticationPrincipal LoginInfo loginInfo) {
        reviewService.deleteReview(reviewId, loginInfo);
        return ResponseEntity.ok("success");
    }

    @GetMapping("/list/{fontId}")
    public ResponseEntity<?> findReviewList(@PathVariable Long fontId) {
        List<ReviewResponse> reviewResponseList = reviewService.findReviewByFontId(fontId);
        ReviewListResponse result = new ReviewListResponse(reviewResponseList.stream().count(),reviewResponseList);
        return ResponseEntity.ok(result);
    }
}

package com.ddobak.review.service;

import com.ddobak.font.entity.Font;
import com.ddobak.font.repository.FontRepository;
import com.ddobak.global.service.S3Service;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.review.dto.request.ReviewRegisterRequest;
import com.ddobak.review.dto.response.ReviewResponse;
import com.ddobak.review.entity.Review;
import com.ddobak.review.repository.ReviewRepository;
import com.ddobak.security.util.LoginInfo;
import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@ComponentScan
public class ReviewServiceImpl implements ReviewService{
    private final MemberRepository memberRepository;
    private final FontRepository fontRepository;
    private final S3Service s3Service;
    private final ReviewRepository reviewRepository;

    @Override
    public void registerReview(ReviewRegisterRequest req, MultipartFile image, LoginInfo loginInfo){

        Member member = memberRepository.findById(loginInfo.id())
                .orElseThrow(() -> new RuntimeException("Member Not Found"));

        Font font = fontRepository.findById(req.fontId())
                .orElseThrow(() -> new RuntimeException("Font Not Found"));
        byte[] fileData;
        try {
            fileData = image.getBytes();
        } catch (IOException e) {
            // 예외 처리 코드 (예: 로그 작성, 사용자 정의 예외 발생 등)
            throw new RuntimeException("Failed to convert image to byte[]", e);
        } catch (java.io.IOException e) {
            throw new RuntimeException(e);
        }

        String imageUrl = s3Service.uploadReviewFile(fileData,"image/png");

        Review review = new Review(imageUrl,req.context(),member,font);

        reviewRepository.save(review);

    }

    public void deleteReview(Long reviewId, LoginInfo loginInfo){
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new RuntimeException("Review Not Found."));
        if(loginInfo.id().equals(review.getMember().getId())){
            reviewRepository.deleteById(reviewId);
        }else{
            throw new RuntimeException("You are not authorized to delete this review.");
        }
    }

    public List<ReviewResponse> findReviewByFontId(Long fontId){
        return reviewRepository.findAllByFontId(fontId);
    }
}

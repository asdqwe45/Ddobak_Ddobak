package com.ddobak.review.service;

import com.ddobak.review.dto.request.ReviewRegisterRequest;
import com.ddobak.security.util.LoginInfo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ReviewService {

    void registerReview(ReviewRegisterRequest req, MultipartFile image, LoginInfo loginInfo);

    void deleteReview(Long reviewId, LoginInfo loginInfo);
}

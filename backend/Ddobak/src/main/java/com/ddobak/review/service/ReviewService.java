package com.ddobak.review.service;

import com.ddobak.review.dto.request.ReviewRegisterRequest;
import com.ddobak.security.util.LoginInfo;
import org.springframework.stereotype.Service;

@Service
public interface ReviewService {

    void registerReview(ReviewRegisterRequest req, LoginInfo loginInfo);
}

package com.ddobak.follow.service;

import com.ddobak.follow.dto.FollowingMemberResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FollowService {
    void createFollow(Long followerId, Long followingId);
    void unfollow(Long followerId, Long followingId);
    ResponseEntity<List<FollowingMemberResponse>> getFollowingsByFollower(Long followerId);
    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);
    int countByFollowingId(Long followingId);
}

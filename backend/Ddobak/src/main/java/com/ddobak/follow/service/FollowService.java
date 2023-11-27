package com.ddobak.follow.service;

import com.ddobak.follow.dto.FollowingMemberResponse;

import java.util.ArrayList;

public interface FollowService {
    void createFollow(Long followerId, Long followingId);
    void unfollow(Long followerId, Long followingId);
    ArrayList<FollowingMemberResponse> getFollowingsByFollower(Long followerId);
    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);
    int countByFollowingId(Long followingId);
}

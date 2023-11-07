package com.ddobak.follow.service;

import com.ddobak.member.entity.Member;
import java.util.List;

public interface FollowService {
    void createFollow(Long followerId, Long followingId);
    void unfollow(Long followerId, Long followingId);
    List<Member> getFollowingsByFollower(Long followerId);
    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);
}

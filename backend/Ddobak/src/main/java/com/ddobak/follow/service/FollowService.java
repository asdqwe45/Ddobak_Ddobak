package com.ddobak.follow.service;

import com.ddobak.member.entity.Member;
import org.springframework.http.HttpStatus;

import java.util.List;

public interface FollowService {
    HttpStatus createFollow(Long followerId, Long followingId);
    HttpStatus unfollow(Long followerId, Long followingId);
    List<Member> getFollowingsByFollower(Long followerId);
    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);
}

package com.ddobak.follow.service;

import com.ddobak.follow.dto.FollowingMemberResponse;
import com.ddobak.follow.entity.Follow;
import com.ddobak.follow.exception.UserAlreadyFollowingException;
import com.ddobak.follow.exception.UserNotFoundException;
import com.ddobak.follow.repository.FollowRepository;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class FollowServiceImpl implements FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;

    public FollowServiceImpl(FollowRepository followRepository, MemberRepository memberRepository) {
        this.followRepository = followRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    @Transactional
    public void createFollow(Long followerId, Long followingId) {
        Member follower = memberRepository.findById(followerId)
                .orElseThrow(() -> new UserNotFoundException("Invalid follower ID."));
        Member following = memberRepository.findById(followingId)
                .orElseThrow(() -> new UserNotFoundException("Invalid following ID."));

        if (followRepository.existsByFollowerIdAndFollowingId(followerId, followingId)) {
            throw new UserAlreadyFollowingException("The user is already following the target user.");
        }

        Follow follow = Follow.builder()
                .follower(follower)
                .following(following)
                .build();

        followRepository.save(follow);
    }

    @Override
    @Transactional
    public void unfollow(Long followerId, Long followingId) {
        if (followRepository.existsByFollowerIdAndFollowingId(followerId, followingId)) {
            followRepository.deleteByFollowerIdAndFollowingId(followerId, followingId);
        } else {
            throw new UserNotFoundException("The user is not following the target user.");
        }
    }

    @Override
    public ArrayList<FollowingMemberResponse> getFollowingsByFollower(Long followerId) {
        List<Follow> follows = followRepository.findAllByFollowerId(followerId);
        ArrayList<FollowingMemberResponse> result = new ArrayList<>();

            for (Follow follow: follows) {
                Member member = follow.getFollowing();
                FollowingMemberResponse followingMember = new FollowingMemberResponse(member.getNickname(), member.getProfileImg());
                result.add(followingMember);
            }
            return result;
    }

    @Override
    public boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId) {
        return followRepository.existsByFollowerIdAndFollowingId(followerId, followingId);
    }

    @Override
    public int countByFollowingId(Long followingId) {
        return followRepository.findAllByFollowingId(followingId).size();
    }
}

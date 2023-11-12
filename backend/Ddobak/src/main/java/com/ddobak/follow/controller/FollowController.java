package com.ddobak.follow.controller;

import com.ddobak.follow.dto.FollowingMemberResponse;
import com.ddobak.follow.service.FollowService;
import com.ddobak.security.util.LoginInfo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/follow")
public class FollowController {

    private final FollowService followService;

    public FollowController(FollowService followService) {
        this.followService = followService;
    }

    @PostMapping("/{followingId}")
    public ResponseEntity<Void> createFollow(@PathVariable Long followingId,
                                             @AuthenticationPrincipal LoginInfo loginInfo) {
        Long followerId = loginInfo.id();
        followService.createFollow(followerId, followingId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/unfollow/{followingId}")
    public ResponseEntity<Void> unfollow(@PathVariable Long followingId,
                                         @AuthenticationPrincipal LoginInfo loginInfo) {
        Long followerId = loginInfo.id();
        followService.unfollow(followerId, followingId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/list")
    public ResponseEntity<List<FollowingMemberResponse>> getFollowingByFollower(@AuthenticationPrincipal LoginInfo loginInfo) {
        Long followerId = loginInfo.id();
        ArrayList<FollowingMemberResponse> members = followService.getFollowingsByFollower(followerId);
        return ResponseEntity.ok(members);
    }

    @GetMapping("/check/{followingId}")
    public ResponseEntity<Boolean> existsByFollowerIdAndFollowingId(@PathVariable Long followingId,
                                                                    @AuthenticationPrincipal LoginInfo loginInfo) {
        Long followerId = loginInfo.id();
        boolean exists = followService.existsByFollowerIdAndFollowingId(followerId, followingId);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/count/{followingId}")
    public ResponseEntity<Integer> countByFollowingId(@PathVariable Long followingId,
                                                      @AuthenticationPrincipal LoginInfo loginInfo) {
        int followingNum = followService.countByFollowingId(followingId);
        return ResponseEntity.ok(followingNum);
    }
}

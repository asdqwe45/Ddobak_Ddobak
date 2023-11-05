package com.ddobak.follow.controller;

import com.ddobak.follow.service.FollowService;
import com.ddobak.member.entity.Member;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/follow")
public class FollowController {
    private final FollowService followService;

    public FollowController(FollowService followService){
        this.followService = followService;
    }

    @PostMapping("/{followerId}/{followingId}")
    public ResponseEntity<Void> createFollow(@PathVariable Long followerId, @PathVariable Long followingId){
        HttpStatus status = followService.createFollow(followerId, followingId);
        return ResponseEntity.status(status).build();
    }

    @DeleteMapping("/{followerId}/unfollow/{followingId}")
    public ResponseEntity<Void> unfollow(@PathVariable Long followerId, @PathVariable Long followingId){
        HttpStatus status = followService.unfollow(followerId, followingId);
        return ResponseEntity.status(status).build();
    }

    @GetMapping("/{followerId}")
    public ResponseEntity<List<Member>> getFollowingByFollower(@PathVariable Long followerId){
        List<Member> members = followService.getFollowingsByFollower(followerId);
        return new ResponseEntity<>(members, HttpStatus.OK);
    }
}

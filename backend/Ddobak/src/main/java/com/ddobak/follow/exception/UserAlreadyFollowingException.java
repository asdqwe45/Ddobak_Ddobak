package com.ddobak.follow.exception;

// UserAlreadyFollowingException
public class UserAlreadyFollowingException extends RuntimeException {
    public UserAlreadyFollowingException(String message) {
        super(message);
    }
}
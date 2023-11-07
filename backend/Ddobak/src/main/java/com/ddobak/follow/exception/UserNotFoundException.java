package com.ddobak.follow.exception;

// UserNotFoundException
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
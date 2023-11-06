package com.ddobak.member.dto.request;

public record ModifyLoginPasswordRequest(String prevLoginPassword, String newLoginPassword) {

}

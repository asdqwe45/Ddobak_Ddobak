package com.ddobak.member.controller;

import com.ddobak.member.dto.request.EmailVerificationRequest;
import com.ddobak.member.dto.request.EmailVerifyRequest;
import com.ddobak.member.dto.request.MemberLoginRequest;
import com.ddobak.member.dto.request.ModifyInfoTextRequest;
import com.ddobak.member.dto.request.CheckNickNameRequest;
import com.ddobak.member.dto.request.ModifyLoginPasswordRequest;
import com.ddobak.member.dto.request.ModifyNicknameRequest;
import com.ddobak.member.dto.request.RefreshTokenRequest;
import com.ddobak.member.dto.request.SignUpRequest;
import com.ddobak.member.dto.response.InfoTextResponse;
import com.ddobak.member.dto.response.LoginResponse;
import com.ddobak.member.dto.response.MyOwnFontResponse;
import com.ddobak.member.dto.response.MyPageResponse;
import com.ddobak.member.dto.response.ProfileImgResponse;
import com.ddobak.member.dto.response.RefreshTokenResponse;
import com.ddobak.member.service.MemberService;
import com.ddobak.security.util.LoginInfo;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;

    // 이메일 인증 요청
    @PostMapping("/email/verify-request")
    public ResponseEntity<Void> sendEmail(@RequestBody EmailVerifyRequest emailVerifyRequest) {
        log.info("Send Email to {}", emailVerifyRequest.email());

        memberService.sendCodeToEmail(emailVerifyRequest.email());

        return ResponseEntity.noContent().build();
    }

    // 이메일 인증 확인
    @PostMapping("/email/verify")
    public ResponseEntity<Void> verifyEmail(@RequestBody EmailVerificationRequest emailVerificationRequest) {
        log.info("verify email {} with authCode {}", emailVerificationRequest.email(), emailVerificationRequest.authCode());

        memberService.verifyEmail(emailVerificationRequest.email(),
            emailVerificationRequest.authCode());

        return ResponseEntity.noContent().build();
    }

    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<Void> singUpMember(@RequestPart SignUpRequest signUpRequest, @RequestPart(required = false) MultipartFile profileImg) {
        log.info("{} request signUp", signUpRequest.email());

        memberService.signUpMember(signUpRequest, profileImg);

        return ResponseEntity.noContent().build();
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> memberLogin(@RequestBody @Valid MemberLoginRequest memberLoginRequest) {
        log.info("{} request Login", memberLoginRequest.email());

        LoginResponse loginResponse = memberService.loginMember(memberLoginRequest);

        return ResponseEntity.ok().body(loginResponse);
    }

    // 로그아웃
    @GetMapping("/logout")
    public ResponseEntity<Void> memberLogout(@AuthenticationPrincipal LoginInfo loginInfo) {
        log.info("{} wants logout", loginInfo.email());

        memberService.logoutMember(loginInfo);
        return ResponseEntity.noContent().build();
    }

    // 소개글 변경
    @PostMapping("/textinfo")
    public ResponseEntity<Void> modifyInfoText(@AuthenticationPrincipal LoginInfo loginInfo, @RequestBody
        ModifyInfoTextRequest modifyInfoTextRequest) {
        log.info("{} wants to change InfoText  -> {}", loginInfo.email(), modifyInfoTextRequest.infoText());

        memberService.modifyInfoText(loginInfo, modifyInfoTextRequest);
        return ResponseEntity.noContent().build();
    }

    // 닉네임 중복 확인
    @PostMapping("/nickname/duplicate")
    public ResponseEntity<Void>  checkNickname(@RequestBody CheckNickNameRequest checkNickNameRequest) {
        log.info("{} is duplicated?", checkNickNameRequest.nickname());

        memberService.isNicknameDuplicated(checkNickNameRequest.nickname());
        return ResponseEntity.noContent().build();
    }

    // accessToken 갱신
    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@AuthenticationPrincipal LoginInfo loginInfo, @RequestBody RefreshTokenRequest refreshTokenRequest) {
        log.info("{} wants to refresh Token", loginInfo.email());

        RefreshTokenResponse refreshTokenResponse = memberService.refreshToken(
            refreshTokenRequest.refreshToken());
        return ResponseEntity.ok().body(refreshTokenResponse);
    }

    // 닉네임 변경
    @PostMapping("/nickname")
    public ResponseEntity<Void> modifyNickname(@AuthenticationPrincipal LoginInfo loginInfo, @RequestBody ModifyNicknameRequest modifyNicknameRequest) {
        log.info("{} wants to change nickname to {}", loginInfo.email(), modifyNicknameRequest.nickname());

        memberService.modifyNickname(loginInfo, modifyNicknameRequest);
        return ResponseEntity.noContent().build();
    }

    // 비밀번호 변경
    @PostMapping("/password")
    public ResponseEntity<Void> modifyPassword(@AuthenticationPrincipal LoginInfo loginInfo, @RequestBody
    ModifyLoginPasswordRequest modifyLoginPasswordRequest) {
        log.info("{} request modify password", loginInfo.email());

        memberService.modifyLoginPassword(loginInfo, modifyLoginPasswordRequest);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/profileImg")
    public ResponseEntity<ProfileImgResponse> requestProfileImg(@AuthenticationPrincipal LoginInfo loginInfo) {
        log.info("{} request profileImg");

        ProfileImgResponse profileImgResponse = memberService.getProfileImg(loginInfo);
        return ResponseEntity.ok().body(profileImgResponse);
    }

    // 프로필이미지 변경
    @PostMapping("/profileImg")
    public ResponseEntity<Void> modifyProfileImg(@AuthenticationPrincipal LoginInfo loginInfo, @RequestPart MultipartFile profileImg) {
        log.info("{} wants to change ProfileImg", loginInfo.email());

        memberService.modifyProfileImg(loginInfo, profileImg);
        return ResponseEntity.noContent().build();
    }

    // 마이 페이지 조회
    @GetMapping("/mypage")
    public ResponseEntity<MyPageResponse> requestMyPage(@AuthenticationPrincipal LoginInfo loginInfo) {
        log.info("{} mypage", loginInfo.email());

        MyPageResponse myPageResponse = memberService.getMyPage(loginInfo);
        return ResponseEntity.ok().body(myPageResponse);
    }

    // 제작자 소개글 조회
    @GetMapping("/textinfo/{producerId}")
    public ResponseEntity<InfoTextResponse> requestInfoText(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long producerId) {
        log.info("{} wants InfoText", loginInfo.email());

        InfoTextResponse infoTextResponse = memberService.getInfoText(producerId);
        return ResponseEntity.ok().body(infoTextResponse);
    }

    @GetMapping("/test")
    public ResponseEntity<Void> testException(@AuthenticationPrincipal LoginInfo loginInfo) {
            memberService.test();
            return null;
    }
}

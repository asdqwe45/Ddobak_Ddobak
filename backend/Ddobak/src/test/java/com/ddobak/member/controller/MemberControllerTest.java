package com.ddobak.member.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestPartFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.partWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParts;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ddobak.member.dto.request.CheckNickNameRequest;
import com.ddobak.member.dto.request.EmailVerificationRequest;
import com.ddobak.member.dto.request.EmailVerifyRequest;
import com.ddobak.member.dto.request.MemberLoginRequest;
import com.ddobak.member.dto.request.ModifyInfoTextRequest;
import com.ddobak.member.dto.request.SignUpRequest;
import com.ddobak.member.dto.response.LoginResponse;
import com.ddobak.security.util.LoginInfo;
import com.ddobak.util.ControllerTest;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

public class MemberControllerTest extends ControllerTest {

    private final String baseUrl = "/api/v1/member";

    @Test
    @DisplayName("이메일_인증번호_요청")
    void sendEmailTest() throws Exception {
        EmailVerifyRequest emailVerifyRequest = new EmailVerifyRequest("ddobak@naver.com");

        mockMvc
            .perform(
                post(baseUrl + "/email/verify-request")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsBytes(emailVerifyRequest))
            )
            .andExpect(status().isNoContent())
            .andDo(
                document("/member/email-verify-request",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    requestFields(
                        fieldWithPath("email").description("이메일")
                    ))
            );
    }

    @Test
    @DisplayName("이메일_인증번호_요청_확인")
    void verifyEmailTest() throws Exception {
        EmailVerificationRequest emailVerificationRequest = new EmailVerificationRequest("ddobak@naver.com", "123456");

        mockMvc
            .perform(
                post(baseUrl + "/email/verify")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsBytes(emailVerificationRequest))
            )
            .andExpect(status().isNoContent())
            .andDo(
                document("/member/email-verify",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    requestFields(
                        fieldWithPath("email").description("이메일"),
                        fieldWithPath("authCode").description("인증번호")
                    ))
            );
    }

    @Test
    @DisplayName("일반_회원가입")
    void signUpMemberTest() throws Exception {
        SignUpRequest signUpRequest = new SignUpRequest("ddobak@naver.com","도도ㅗ도도도","1234");
        MockMultipartFile requestPart1 = new MockMultipartFile("signUpRequest","","application/json",objectMapper.writeValueAsBytes(signUpRequest));

        MockMultipartFile requestPart2 = new MockMultipartFile("profileImg","reg.png", "image/png", "<<png data>>".getBytes(
            StandardCharsets.UTF_8));

        mockMvc
            .perform(
                multipart(baseUrl + "/signup")
                    .file(requestPart1)
                    .file(requestPart2)
            )
            .andExpect(status().isNoContent())
            .andDo(
                document("/member/signup",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    requestParts(
                        partWithName("signUpRequest").description("회원가입 정보"),
                        partWithName("profileImg").description("프로필 이미지").optional()
                    ),
                    requestPartFields("signUpRequest",
                        fieldWithPath("email").description("이메일"),
                        fieldWithPath("nickname").description("닉네임"),
                        fieldWithPath("loginPassword").description("비밀번호")
                    )
                )
            );
    }

    @Test
    @DisplayName("회원_일반_로그인")
    void memberLoginTest() throws Exception {
        MemberLoginRequest memberLoginRequest = new MemberLoginRequest("ddobak@naver.com","1234");

        LoginResponse loginResponse = new LoginResponse(1L, "accessToken","refreshToken","profileImgUrl");
        when(memberService.loginMember(any())).thenReturn(loginResponse);

        mockMvc
            .perform(
                post(baseUrl + "/login")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsBytes(memberLoginRequest))
            )
            .andExpect(status().isOk())
            .andDo(
                document("member/login",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    requestFields(
                        fieldWithPath("email").description("이메일"),
                        fieldWithPath("loginPassword").description("비밀번호")
                    ),
                    responseFields(
                        fieldWithPath("id").description("회원 PK 값"),
                        fieldWithPath("accessToken").description("JWT access Token"),
                        fieldWithPath("refreshToken").description("JWT Refresh Token"),
                        fieldWithPath("profileImgUrl").description("프로필 이미지 URL")
                    )
                )
            );
    }

    @Test
    @DisplayName("로그아웃")
    void memberLogoutTest() throws Exception {
        LoginInfo loginInfo = new LoginInfo("lkm454545@gmail.com");
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        doNothing().when(memberService).logoutMember(loginInfo);

        mockMvc.perform(
            get(baseUrl + "/logout")
                .with(authentication(new TestingAuthenticationToken(loginInfo, null)))
        ).andExpect(status().isNoContent())
            .andDo(
                document("/member/logout",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()))
            );
    }

    @Test
    @DisplayName("회원_소개글_변경")
    void modifyInfoTextTest() throws Exception {
        LoginInfo loginInfo = new LoginInfo("lkm454545@gmail.com");
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        ModifyInfoTextRequest modifyInfoTextRequest = new ModifyInfoTextRequest("변경 후 소개글");

        doNothing().when(memberService).modifyInfoText(loginInfo, modifyInfoTextRequest);

        mockMvc.perform(
            post(baseUrl + "/textinfo")
                .with(authentication(new TestingAuthenticationToken(loginInfo, null)))
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(modifyInfoTextRequest))
        )
            .andExpect(status().isNoContent())
            .andDo(
                document("/member/modify-textInfo",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    requestFields(
                        fieldWithPath("infoText").description("변경된 소개글")
                    ))
            );
    }

    @Test
    @DisplayName("닉네임_중복_확인한다.")
    void checkNicknameTest() throws Exception{
        CheckNickNameRequest checkNickNameRequest = new CheckNickNameRequest("checkNickName");

        mockMvc.perform(
            get(baseUrl +"/nickname")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(checkNickNameRequest))
        ).andExpect(status().isNoContent())
            .andDo(
                document("/member/checkNickname",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    requestFields(
                        fieldWithPath("nickname").description("중복체크할 닉네임")
                    ))
            );
    }
}

package com.ddobak.member.controller;

import static org.mockito.ArgumentMatchers.any;
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
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.ddobak.member.dto.request.EmailVerificationRequest;
import com.ddobak.member.dto.request.EmailVerifyRequest;
import com.ddobak.member.dto.request.MemberLoginRequest;
import com.ddobak.member.dto.request.SignUpRequest;
import com.ddobak.member.dto.response.LoginResponse;
import com.ddobak.util.ControllerTest;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

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
                get(baseUrl + "/email/verify")
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

        LoginResponse loginResponse = new LoginResponse(1L, "accessToken","refreshToken");
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
                        fieldWithPath("refreshToken").description("JWT Refresh Token")
                    )
                )
            );
    }
}

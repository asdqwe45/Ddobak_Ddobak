package com.ddobak.font.controller;

import com.ddobak.font.dto.request.MakeFontRequest;

import com.ddobak.security.util.LoginInfo;
import com.ddobak.util.ControllerTest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.authentication;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


public class FontControllerTest extends ControllerTest {

    private final String baseUrl = "/api/v1/font";


    @Test
    @DisplayName("테스트 엔드포인트")
    void testTest() throws Exception {
        LoginInfo loginInfo = new LoginInfo("lkm454545@gmail.com");
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        mockMvc.perform(
                        get(baseUrl + "/test")
                                .with(authentication(new TestingAuthenticationToken(loginInfo, null)))
                ).andExpect(status().isOk())
                .andExpect(content().string("test"))
                .andDo(
                        document("/font/test",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()))
                );
    }


    @Test
    @DisplayName("정렬하기")
    void sortTest() throws Exception {
        LoginInfo loginInfo = new LoginInfo("lkm454545@gmail.com");
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);
        // 테스트 파일 생성
        MockMultipartFile firstFile = new MockMultipartFile(
                "multipartFile", // 이 부분을 컨트롤러가 기대하는 파라미터 이름으로 변경해야 합니다.
                "filename.png",
                MediaType.IMAGE_PNG_VALUE,
                "PNG data".getBytes() // 실제 PNG 데이터로 대체해야 합니다.
        );

        MockMultipartFile secondFile = new MockMultipartFile(
                "multipartFile", // 마찬가지로, 이 부분도 변경해야 합니다.
                "other-file-name.png",
                MediaType.IMAGE_PNG_VALUE,
                "Other PNG data".getBytes() // 실제 PNG 데이터로 대체해야 합니다.
        );

        // FontImageService의 메서드에 대한 모의 행동 설정
        when(fontImageService.convertToPng(any(MultipartFile.class))).thenAnswer(new Answer<File>() {

            @Override
            public File answer(InvocationOnMock invocation) throws Throwable {
                // 실제 파일 생성 대신 모의 파일 객체를 생성
                File mockFile = mock(File.class);
                // 필요한 경우 모의 객체의 행동을 추가로 설정할 수 있습니다.
                // 예: when(mockFile.exists()).thenReturn(true);
                when(mockFile.length()).thenReturn(1L);
                return mockFile;
            }
        }/* 모의 파일 반환 */);
        when(fontImageService.getS3SortUrl(any(File.class))).thenReturn("mockedS3Url");


        // 파일을 포함하는 POST 요청 시뮬레이션
        mockMvc.perform(multipart(baseUrl + "/sort")
                        .file(firstFile)
                        .file(secondFile)
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk()) // HTTP 200 상태 코드 기대
                .andExpect(jsonPath("$").isNotEmpty()) // 응답이 비어있지 않아야 함
                .andDo(
                        document("/font/sort",
                                preprocessRequest(prettyPrint()),
                                preprocessResponse(prettyPrint()))
                );
    }

    @Test
    @DisplayName("미리보기")
    void watchTest() throws Exception {
        LoginInfo loginInfo = new LoginInfo("lkm454545@gmail.com");
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        File firstFile = new File("test1");
        File secondFile = new File("test2");

        List<File> files = new ArrayList<>();

        files.add(firstFile);
        files.add(secondFile);

        // 가짜 URL을 설정
        String fakeUrl = "http://example.com/fake-image-url";

        // 서비스가 URL로부터 파일 목록을 반환하도록 모킹
        when(fontImageService.urlToFile(fakeUrl)).thenReturn(files);

        // 서비스가 ZIP 파일을 다운로드하도록 모킹
        when(fontImageService.downloadZip(files)).thenAnswer(invocation -> {
            // 임시 ZIP 파일을 생성하고 리턴
            File tempZipFile = File.createTempFile("mockedZip", ".zip");
            tempZipFile.deleteOnExit();
            // ZIP 파일에 파일을 추가하는 코드 생략
            return new ResponseEntity<>(Files.readAllBytes(tempZipFile.toPath()), HttpStatus.OK);
        });

        // mockMvc 테스트 실행
        mockMvc.perform(post(baseUrl + "/watch").param("sortUrl", fakeUrl)
                        .with(authentication(new TestingAuthenticationToken(loginInfo, null)))
                ).andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_OCTET_STREAM))
                .andDo(document("/font/watch",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())));
    }


    @Test
    @DisplayName("폰트 엔티티 초기 제작")
    void createFontTest() throws Exception {
        LoginInfo loginInfo = new LoginInfo("lkm454545@gmail.com");
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        String fakeUrl = "http://example.com/fake-image-url";

        doNothing().when(fontService).createFont(fakeUrl, loginInfo);

        mockMvc.perform(post(baseUrl + "/goSetting").param("sortUrl",fakeUrl)
                .with(authentication(new TestingAuthenticationToken(loginInfo,null)))
        ).andExpect(status().isOk())
                .andDo(document("/font/goSetting",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())));
    }

    @Test
    @DisplayName("폰트 디데일 제작")
    void makeFontTest() throws Exception {
        LoginInfo loginInfo = new LoginInfo("lkm454545@gmail.com");
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        MakeFontRequest makeFontRequest = new MakeFontRequest(
                "http://example.com/font_sort_url",
                "한글폰트이름",
                "EnglishFontName",
                true,
                true,
                10000,
                true,
                "폰트에 대한 소개 텍스트",
                true,
                true,
                "저작권자",
                "키워드1",
                "키워드2",
                "키워드3"
        );
        String fontUrl = "http://example.com/mockedS3Url";
        List<File> files = Arrays.asList(new File("test1"), new File("test2"));

        // 가짜 URL을 설정
        String fakeUrl = "http://example.com/fake-image-url";

        // 서비스가 URL로부터 파일 목록을 반환하도록 모킹
        when(fontImageService.urlToFile(fakeUrl)).thenReturn(files);
        when(fontImageService.getS3SortUrl(any(File.class))).thenReturn("mockedS3Url");
        doNothing().when(fontService).makeFont(any(MakeFontRequest.class), any(LoginInfo.class), any(String.class));

        mockMvc.perform(post(baseUrl + "/make")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(makeFontRequest))
                        .with(authentication(new TestingAuthenticationToken(loginInfo, null))))
                .andExpect(status().isOk())
                .andExpect(content().string("success"))
                .andDo(document("/font/make",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())));

    }

}
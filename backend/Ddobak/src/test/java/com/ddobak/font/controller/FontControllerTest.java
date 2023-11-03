package com.ddobak.font.controller;

import com.ddobak.font.service.FontImageService;
import com.ddobak.font.service.FontService;
import com.ddobak.security.util.LoginInfo;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class FontControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private FontImageService fontImageService;

    @MockBean
    private FontService fontService;



//    @Test
//    @DisplayName("정렬하기")
//    @WithMockUser // 시뮬레이션된 인증된 사용자
//    public void testSort() throws Exception {
//        // 테스트 파일 생성
//        MockMultipartFile firstFile = new MockMultipartFile(
//                "file",
//                "filename.txt",
//                MediaType.TEXT_PLAIN_VALUE,
//                "some xml".getBytes()
//        );
//
//        MockMultipartFile secondFile = new MockMultipartFile(
//                "file",
//                "other-file-name.data",
//                MediaType.TEXT_PLAIN_VALUE,
//                "some other type".getBytes()
//        );
//
//        // 파일을 포함하는 POST 요청 시뮬레이션
//        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/v1/font/sort")
//                        .file(firstFile)
//                        .file(secondFile)
//                        .contentType(MediaType.MULTIPART_FORM_DATA))
//                .andExpect(status().isOk()) // HTTP 200 상태 코드 기대
//                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON)) // JSON 응답 기대
//                .andExpect(jsonPath("$").isNotEmpty()); // 응답이 비어있지 않아야 함
//    }
//
//    @Test
//    @DisplayName("미리보기")
//    @WithMockUser(username="test@example.com")
//    void watchTest() throws Exception {
//        // URL을 $로 파싱
//        String reqUrl = "http://some.url/to/image.png$http://some.url/to/image.png$";
//
//        // URL을 기반으로 모킹된 파일 리스트 생성
//        String[] urls = reqUrl.split("\\$");
//        List<File> mockFiles = new ArrayList<>();
//        for (String url : urls) {
//            if (!url.isEmpty()) {
//                // 파일을 실제로 생성하지 않고 File 객체를 모킹
//                File mockFile = mock(File.class);
//                // 파일 이름을 URL 마지막 부분으로 설정 (가정)
//                when(mockFile.getName()).thenReturn(url.substring(url.lastIndexOf('/') + 1));
//                mockFiles.add(mockFile);
//            }
//        }
//
//        // 예상되는 ZIP 파일 콘텐츠
//        byte[] mockZipContent = "fake-zip-content".getBytes();
//
//        // FontImageService를 모킹하여 가짜 ZIP 파일의 바이트 배열을 반환하도록 설정
//        when(fontImageService.urlToFile(any(String.class))).thenReturn(mockFiles);
//        when(fontImageService.downloadZip(any(List.class))).thenReturn(new ResponseEntity<>(mockZipContent, HttpStatus.OK));
//
//        // MockMvc를 통해 '/api/v1/font/watch' 엔드포인트 테스트
//        mockMvc.perform(post("/api/v1/font/watch")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(reqUrl))
//                .andExpect(status().isOk())
//                .andExpect(header().string(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_OCTET_STREAM.toString()))
//                .andExpect(header().string(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"files.zip\""))
//                .andExpect(MockMvcResultMatchers.content().bytes(mockZipContent));
//
//    }

    @Test
    @DisplayName("폰트 엔티티 초기 제작")
    @WithMockUser(username = "test@example.com")
    void createFontTest() throws Exception {
        // fontService.createFont의 동작을 모킹
        LoginInfo loginInfo = new LoginInfo("lkm454545@gmail.com");
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);

        String fontSortUrl = "http://mock-font-sort-url.com";
        doNothing().when(fontService).createFont(fontSortUrl, loginInfo);

        // MockMvc를 통해 '/api/v1/font/goSetting' 엔드포인트 테스트
        mockMvc.perform(post("/api/v1/font/goSetting")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(fontSortUrl)) // 페이로드로 font_sort_url을 보냅니다.
                .andExpect(status().isOk()) // HTTP 200 OK 상태를 기대합니다.
                .andExpect(MockMvcResultMatchers.content().string("success")); // 응답 본문으로 "success" 문자열을 기대합니다.
    }
}

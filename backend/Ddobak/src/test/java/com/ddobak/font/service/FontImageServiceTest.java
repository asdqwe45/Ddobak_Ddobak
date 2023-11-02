package com.ddobak.font.service;

import com.ddobak.font.service.FontImageService;
import com.ddobak.global.service.S3Service;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.client.RestTemplate;
import static org.mockito.ArgumentMatchers.any;
import java.io.File;
import java.io.IOException;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FontImageServiceTest {

    @Autowired
    private FontImageService fontImageService;

    @MockBean
    private S3Service s3Service;

    @MockBean
    private RestTemplate restTemplate;

    @Test
    public void convertToPngTest() throws IOException {
        // MockMultipartFile 생성
        MockMultipartFile mockFile = new MockMultipartFile("file", "test.jpg", "image/jpg", new byte[10]);

        File convertedFile = fontImageService.convertToPng(mockFile);

        // 반환된 파일의 확장자 확인
        assertEquals("png", getExtension(convertedFile.getName()));
    }

    @Test
    public void getS3SortUrlTest() {
        when(restTemplate.exchange(
                anyString(),
                any(HttpMethod.class),
                any(HttpEntity.class),
                eq(byte[].class)))
                .thenReturn(new ResponseEntity<>(new byte[10], HttpStatus.OK));

        when(s3Service.uploadSortFile(any(), anyString())).thenReturn("mockS3Url");

        File mockImageFile = mock(File.class);
        String s3Url = fontImageService.getS3SortUrl(mockImageFile);

        assertEquals("mockS3Url", s3Url);
    }

    private String getExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        return (dotIndex == -1) ? "" : filename.substring(dotIndex + 1);
    }
}

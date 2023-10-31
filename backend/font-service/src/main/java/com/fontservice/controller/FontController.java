package com.fontservice.controller;

import com.fontservice.service.FontImageService;
import com.fontservice.service.FontService;
import com.fontservice.service.S3Service;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.client.RestTemplate;
import java.io.File;
import java.io.IOException;
import java.util.Collections;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/font")
@Slf4j
public class FontController {

    public record FontWebRequest(
            Long producer_id

    ){}


    @Autowired
    private final FontImageService fontImageService;

    @Autowired
    private final FontService fontService;

    @GetMapping("/test")
    public String test(){
        return "test";
    }


    @PostMapping("/sort")
    public ResponseEntity<String> sort(@RequestParam("file") MultipartFile file, @RequestParam Long producer_id){

        try {
            File tempOutputFile = fontImageService.convertToPng(file);
            if (tempOutputFile.length() == 0) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일 형식이 올바르지 않습니다.");
            }

            // AI에 넘겨주고 받기
            String s3Url = fontImageService.getS3Url(tempOutputFile);
            if(s3Url == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AI response의 파일 타입이 올바르지 않습니다.");
            }
            fontService.addFont(producer_id,s3Url);

            return ResponseEntity.ok(s3Url);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed ㅠㅠ");
        }
    }

    @PostMapping("/make")
    public ResponseEntity<String> makeFile(@RequestParam("file") MultipartFile file) {
        try {
            File tempFile = File.createTempFile("source",".png");
            file.transferTo(tempFile);
            String s3Url = fontImageService.getS3Url(tempFile);
            if(s3Url.length()==0){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AI response의 파일 타입이 올바르지 않습니다.");
            }

            return ResponseEntity.ok(s3Url);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}

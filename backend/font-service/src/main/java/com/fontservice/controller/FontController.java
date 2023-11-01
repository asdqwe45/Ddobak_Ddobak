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
            String font_sort_url,
            Boolean openStatus,
            Boolean freeStatus,
            Integer price,
            Boolean commerceStatus,
            String introduceText

    ){}


    @Autowired
    private final FontImageService fontImageService;
    @Autowired
    private final FontService fontService;


    @PostMapping("/test")
    public String test(@RequestPart(value = "data") FontWebRequest req){
        return "test";
    }


    @PostMapping("/sort")
    public ResponseEntity<String> sort(@RequestParam("file") MultipartFile[] files, @RequestParam Long producer_id){
        System.out.println("0");
        try {
            String s3Url = new String();

            for (MultipartFile file : files) {
                File tempOutputFile = fontImageService.convertToPng(file);
                if (tempOutputFile.length() == 0) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일 형식이 올바르지 않습니다.");
                }

                // AI에 넘겨주고 받기
                s3Url = s3Url + fontImageService.getS3Url(tempOutputFile);
                s3Url = s3Url + "$";
            }
            if(s3Url == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AI response의 파일 타입이 올바르지 않습니다.");
            }

            fontService.addFont(producer_id, s3Url);
            return ResponseEntity.ok(String.join(", ", s3Url));  // 모든 S3 URL을 반환합니다.
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed ㅠㅠ");
        }
    }


    @PostMapping("/make")
    public ResponseEntity<String> makeFile(@RequestPart("file") MultipartFile file, @RequestPart(value = "data") FontWebRequest req) {
        try {
            System.out.println("1");
            File tempFile = File.createTempFile("source",".png");
            System.out.println("2");

            file.transferTo(tempFile);
            System.out.println("3");

            String s3Url = fontImageService.getS3Url(tempFile);
            System.out.println("4");

            if(s3Url.length()==0){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AI response의 파일 타입이 올바르지 않습니다.");
            }
            //fontService.makeFont(s3Url,req);

            return ResponseEntity.ok(s3Url);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}

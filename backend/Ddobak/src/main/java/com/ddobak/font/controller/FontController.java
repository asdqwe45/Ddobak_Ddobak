package com.ddobak.font.controller;

import com.ddobak.font.service.FontImageService;
import com.ddobak.font.service.FontService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
    public String test(){
        return "test";
    }
//    @GetMapping("/list")
//    public List<FontQueryRepository.FontListWebResponse> getFontAll(){
//        return fontService.getFontAll();
//    }

    @PostMapping("/sort")
    public ResponseEntity<String> sort(@RequestParam("file") MultipartFile[] files){
        System.out.println("0");
        try {
            String s3Url = new String();

            for (MultipartFile file : files) {
                File tempOutputFile = fontImageService.convertToPng(file);
                if (tempOutputFile.length() == 0) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("파일 형식이 올바르지 않습니다.");
                }
                System.out.println("2");
                // AI에 넘겨주고 받기
                s3Url = s3Url + fontImageService.getS3SortUrl(tempOutputFile);
                s3Url = s3Url + "$";
            }
            if(s3Url == null){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AI response의 파일 타입이 올바르지 않습니다.");
            }


            return ResponseEntity.ok(String.join(", ", s3Url));  // 모든 S3 URL을 반환합니다.
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed ㅠㅠ");
        }
    }


    @PostMapping("/make")
    public ResponseEntity<String> makeFile(@RequestPart("file") MultipartFile[] files, @RequestParam("producer_id") Long producer_id, @RequestParam("font_sort_url") String font_sort_url) {
        try {
            System.out.println("1");
            File tempFile1 = File.createTempFile("source",".png");
            File tempFile2 = File.createTempFile("source",".png");

            System.out.println("2");

            files[0].transferTo(tempFile1);
            System.out.println("3");

            files[1].transferTo(tempFile2);

            List<File> tempFile = new ArrayList<>();
            System.out.println("3");

            tempFile.add(tempFile1);
            System.out.println("3");

            tempFile.add(tempFile2);
            System.out.println("3");

            String s3Url = fontImageService.getS3MakeUrl(tempFile);
            System.out.println("4");

            if(s3Url.length()==0){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AI response의 파일 타입이 올바르지 않습니다.");
            }
            fontService.addFont(producer_id,font_sort_url, s3Url);

            return ResponseEntity.ok(s3Url);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}


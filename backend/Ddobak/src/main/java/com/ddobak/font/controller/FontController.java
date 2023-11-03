package com.ddobak.font.controller;

import com.ddobak.font.dto.request.CreateFontRequest;
import com.ddobak.font.service.FontImageService;
import com.ddobak.font.service.FontService;
import com.ddobak.security.util.LoginInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

@RestController
@RequestMapping("/api/v1/font")
@RequiredArgsConstructor
@Slf4j
public class FontController {

    private final FontImageService fontImageService;
    private final FontService fontService;


    @GetMapping("/test")
    public String test(@AuthenticationPrincipal LoginInfo loginInfo){
        return "test";
    }
//    @GetMapping("/list")
//    public List<FontQueryRepository.FontListWebResponse> getFontAll(){
//        return fontService.getFontAll();
//    }

    @PostMapping("/sort")
    public ResponseEntity<String> sort(@RequestParam("file") MultipartFile[] files,
                                       @AuthenticationPrincipal LoginInfo loginInfo){
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
    @CrossOrigin(origins = "http://localhost:3000") // React 앱의 URL을 허용합니다.
    @PostMapping("/watch")
    public ResponseEntity<byte[]> watchImage(@RequestBody String reqUrl,
                                             @AuthenticationPrincipal LoginInfo loginInfo){
        try {
            List<File> tempFile = fontImageService.urlToFile(reqUrl);

            ResponseEntity<byte[]> zip = fontImageService.downloadZip(tempFile);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "files.zip");

           return new ResponseEntity<>(zip.getBody(), headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/goSetting")
    public ResponseEntity<String> createFont(@RequestBody String font_sort_url,
                                           @AuthenticationPrincipal LoginInfo loginInfo) {
        fontService.createFont(font_sort_url,loginInfo);
        return ResponseEntity.ok("success");
    }
}


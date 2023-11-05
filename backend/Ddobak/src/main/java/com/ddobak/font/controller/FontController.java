package com.ddobak.font.controller;

import com.ddobak.font.dto.request.MakeFontRequest;
import com.ddobak.font.dto.response.FontListResponse;
import com.ddobak.font.service.FontImageService;
import com.ddobak.font.service.FontService;
import com.ddobak.global.exception.ErrorCode;
import com.ddobak.member.exception.EmailException;
import com.ddobak.security.util.LoginInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/font")
@RequiredArgsConstructor
@Slf4j
public class FontController {

    private final FontImageService fontImageService;
    private final FontService fontService;

    @GetMapping(value="/test")
    @Operation(summary = "테스트", description = "테스트하는 api 입니다.")
    @ApiResponse(responseCode = "200", description = "리턴 값으로 test를 반환합니다.")
    public ResponseEntity<String> test(@AuthenticationPrincipal LoginInfo loginInfo){
        return ResponseEntity.ok("test");
    }

    @PostMapping(value = "/sort",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "정렬api", description = "이미지정렬 api 입니다.")
    @ApiResponse(responseCode = "200", description = "리턴 값으로 s3Url을 반환합니다.")
    public ResponseEntity<String> sort(
            @Parameter(description = "multipart/form-data 형식의 이미지 리스트를 input으로 받습니다. 이때 key 값은 multipartFile 입니다.")
            @RequestPart("kor_file") MultipartFile kor_file,
            @RequestPart("eng_file") MultipartFile eng_file){

        try {
            String s3Url = new String();
            List<MultipartFile> files = new ArrayList<>();
            files.add(kor_file);
            files.add(eng_file);

            for (MultipartFile file : files) {
                File tempOutputFile = fontImageService.convertToPng(file);
                if (tempOutputFile.length() == 0) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("변환할 파일 형식이 올바르지 않습니다.");
                }
                // AI에 넘겨주고 받기
                s3Url = s3Url + fontImageService.getS3SortUrl(tempOutputFile);
                System.out.println("#############" + s3Url);
                if(s3Url == null){
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("AI response의 파일 타입이 올바르지 않습니다.");
                }
                s3Url = s3Url + "$";
            }
            String temp =String.join(",", s3Url);
            System.out.println("@@@@@@@@@@@@@@" + temp);
            return ResponseEntity.ok(String.join(",", s3Url));  // 모든 S3 URL을 반환합니다.
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed ㅠㅠ");
        }
    }
//    @CrossOrigin(origins = "http://localhost:3000") // React 앱의 URL을 허용합니다.
    @PostMapping(value = "/watch")
    @Operation(summary = "미리보기", description = "미리보기 api 입니다.")
    @ApiResponse(responseCode = "200", description = "리턴 값으로 zip파일을 반환합니다.")
    public ResponseEntity<byte[]> watchImage(@RequestParam(value = "sortUrl") String reqUrl,
                                             @AuthenticationPrincipal LoginInfo loginInfo){
        try {
            System.out.println("1");
            List<File> tempFile = fontImageService.urlToFile(reqUrl);
            System.out.println("1");

            ResponseEntity<byte[]> zip = fontImageService.downloadZip(tempFile);
            System.out.println("1");

            HttpHeaders headers = new HttpHeaders();
            System.out.println("1");

            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            System.out.println("1");

            headers.setContentDispositionFormData("attachment", "files.zip");
            System.out.println("1");


           return new ResponseEntity<>(zip.getBody(), headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(value = "/goSetting")
    @Operation(summary = "폰트 세팅으로 이동", description = "초기 세팅하는 api 입니다.")
    @ApiResponse(responseCode = "200", description = "리턴 값으로 success를 반환합니다.")
    public ResponseEntity<String> createFont(@RequestParam("sortUrl") String font_sort_url,
                                           @AuthenticationPrincipal LoginInfo loginInfo) {
        fontService.createFont(font_sort_url,loginInfo);
        return ResponseEntity.ok("success");
    }

    @PostMapping(value = "/make")
    @Operation(summary = "폰트 제작", description = "폰트 제작하는 api 입니다.")
    @ApiResponse(responseCode = "200", description = "리턴 값으로 success를 반환합니다.")
    public ResponseEntity<String> makeFont(@RequestBody MakeFontRequest req,
                                           @AuthenticationPrincipal LoginInfo loginInfo) throws IOException {
            // 포인트 로직

            List<File> tempFile = fontImageService.urlToFile(req.font_sort_url());
            String fontUrl = fontImageService.getS3FontUrl(tempFile);
            fontService.makeFont(req, loginInfo, fontUrl);

            return ResponseEntity.ok("success");
    }

//    @GetMapping(value = "/list")
//    @Operation(summary = "폰트 목록", description = "폰트 목록 조회하는 api입니다.")
//    @ApiResponse(responseCode = "200", description = "리턴값으로 폰트목록에 필요한 값 리턴합니다.")
//    public ResponseEntity<FontListResponse> getFontList(@AuthenticationPrincipal LoginInfo loginInfo){
//        return fontService.getFontList();
//    }
}
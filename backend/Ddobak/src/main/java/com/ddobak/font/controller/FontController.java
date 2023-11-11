package com.ddobak.font.controller;

import com.ddobak.font.dto.request.MakeFontRequest;
import com.ddobak.font.dto.response.FontDetailResponse;
import com.ddobak.font.dto.response.FontIdResponse;
import com.ddobak.font.dto.response.FontListResponse;
import com.ddobak.font.entity.Font;
import com.ddobak.font.exception.InvalidFileFormatException;
import com.ddobak.font.service.FontImageService;
import com.ddobak.font.service.FontService;
import com.ddobak.security.util.LoginInfo;
import com.ddobak.transaction.service.TransactionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.*;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/v1/font")
@RequiredArgsConstructor
@Slf4j
public class FontController {

    private final FontImageService fontImageService;
    private final FontService fontService;
    private final TransactionService transactionService;

    @GetMapping(value="/test")
    public ResponseEntity<String> test(@AuthenticationPrincipal LoginInfo loginInfo){
        return ResponseEntity.ok("test");
    }

    @PostMapping(value = "/sort",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> sort(
            @RequestPart("kor_file") MultipartFile kor_file,
            @RequestPart("eng_file") MultipartFile eng_file) {
        try {
            List<MultipartFile> files = Arrays.asList(kor_file, eng_file);
            String s3Urls = fontImageService.processAndUploadImages(files);

            return ResponseEntity.ok(s3Urls);
        } catch (InvalidFileFormatException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed ㅠㅠ");
        }
    }

    @PostMapping(value = "/watch")
    public ResponseEntity<byte[]> watchImage(@RequestParam(value = "sortUrl") String reqUrl,
                                             @AuthenticationPrincipal LoginInfo loginInfo){
        try {
            byte[] zipBytes = fontImageService.createZipFromUrls(reqUrl);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "files.zip");

            return new ResponseEntity<>(zipBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping(value = "/goSetting")
    public ResponseEntity<FontIdResponse> createFont(@RequestParam("sortUrl") String font_sort_url,
        @AuthenticationPrincipal LoginInfo loginInfo) {
        FontIdResponse fontIdResponse = fontService.createFont(font_sort_url,loginInfo);
        return ResponseEntity.ok(fontIdResponse);
    }

    @PutMapping(value = "/make/request")
    public ResponseEntity<String> makeFont(@RequestBody MakeFontRequest req,
        @AuthenticationPrincipal LoginInfo loginInfo) throws IOException {
        try {
            Font makedFont = fontService.makeFont(req,loginInfo);
            fontImageService.createFont(req);
            transactionService.requestFontTransaction(makedFont, loginInfo.id(),makedFont.getPrice());
            return ResponseEntity.ok("success");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Font creation failed due to an internal error.");
        }
    }
//    @PutMapping(value = "/make/final")
//    public ResponseEntity<?> makeFinalFont(@Re)
    @GetMapping(value = "/list")
    public ResponseEntity<FontListResponse> getFontList(@AuthenticationPrincipal LoginInfo loginInfo,@PageableDefault(size=12) Pageable pageable,@RequestParam(required = false) String search, @RequestParam(required = false) List<String> keywords, @RequestParam(required = false) String freeCheck){

        Boolean free = null;
        if(freeCheck != null){
            if(freeCheck.equals("true")) {
                free = true;
            }
            else{
                free = false;
            }
        }

        FontListResponse result = fontService.getFontList(loginInfo,pageable,search,keywords,free);

        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/list/NoAuth")
    public ResponseEntity<FontListResponse> getFontList(@PageableDefault(size=12) Pageable pageable,@RequestParam(required = false) String search, @RequestParam(required = false) List<String> keywords, @RequestParam(required = false) String freeCheck){

        Boolean free = null;
        if(freeCheck != null){
            if(freeCheck.equals("true")) {
                free = true;
            }
            else{
                free = false;
            }
        }
        FontListResponse result = fontService.getFontListNoAuth(pageable,search,keywords,free);
        return ResponseEntity.ok(result);
    }

    @GetMapping(value = "/detail/{fontId}")
    public ResponseEntity<FontDetailResponse> getFontDetail(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long fontId){
        FontDetailResponse result = fontService.getFontDetail(fontId, loginInfo);
        return ResponseEntity.ok(result);
    }
    @GetMapping(value = "/name/check")
    public ResponseEntity<Boolean> checkFontName(@RequestParam(required = false) String korFontName, @RequestParam(required = false) String engFontName ,@AuthenticationPrincipal LoginInfo loginInfo){
        Boolean result = fontService.checkNameDuplicate(korFontName, engFontName);
        return ResponseEntity.ok(result);
    }
}

package com.ddobak.dib.controller;

import com.ddobak.dib.entity.Dib;
import com.ddobak.dib.repository.DibRepository;
import com.ddobak.dib.service.DibService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/dib")
public class DibController {

    private final DibService dibService;
    private final DibRepository dibRepository;

    // 찜 조회하기
    @GetMapping("/{memberId}/{fontId}")
    public boolean getDib(@PathVariable("memberId") Long memberId, @PathVariable("fontId") Long fontId){
        return dibRepository.existsByMemberIdAndFontId(memberId, fontId);
    }

    // 폰트 찜하기
    @PostMapping("/add/{memberId}/{fontId}")
    public String makeDib(@PathVariable("memberId") Long memberId, @PathVariable("fontId") Long fontId) {
        String result = dibService.makeDib(memberId, fontId);
        if (result.equalsIgnoreCase("success")) {
            return "success";
        } else {
            return "error";
        }
    }

    // 찜 삭제하기
    @DeleteMapping("/remove/{memberId}/{fontId}")
    public ResponseEntity<String> deleteDib(@PathVariable Long memberId, @PathVariable Long fontId){
        dibService.removeDib(memberId, fontId);
        return ResponseEntity.noContent().build();
    }

    // 폰트 찜한 사용자 수
    @GetMapping("/count/{fontId}")
    public Long getCountByFontId(@PathVariable Long fontId) {
        return dibService.countByFontId(fontId);
    }

    // 사용자 찜 목록 가져오기
    @GetMapping("/{memberId}/")
    public ResponseEntity<List<Dib>> getDibsByMemberId(@PathVariable Long memberId) {
        List<Dib> dibs = dibService.findByMemberId(memberId);
        return ResponseEntity.ok(dibs);
    }
}

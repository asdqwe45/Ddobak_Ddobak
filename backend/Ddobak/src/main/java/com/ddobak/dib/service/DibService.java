package com.ddobak.dib.service;

import com.ddobak.dib.entity.Dib;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface DibService {

    String makeDib(Long memberId, Long fontId);

    List<Dib> findByMemberId(Long memberId);

    Long countByFontId(Long fontId);

    void removeDib(Long memberId, Long fontId);

}

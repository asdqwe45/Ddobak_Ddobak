package com.ddobak.dib.repository;

import com.ddobak.dib.entity.Dib;
import com.ddobak.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

import javax.persistence.Entity;
import java.util.List;


public interface DibRepository extends JpaRepository<Dib, Long> {

    boolean existsByMemberIdAndFontId(Long memberId, Long fontId);
    List<Dib> findByMemberId(Long memberId);
    Long countByFontId(Long fontId);
    void deleteByMemberIdAndFontId(Long memberId, Long fontId);

}

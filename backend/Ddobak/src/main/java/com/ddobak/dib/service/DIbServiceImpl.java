package com.ddobak.dib.service;

import com.ddobak.dib.entity.Dib;
import com.ddobak.dib.repository.DibRepository;
import com.ddobak.font.entity.Font;
import com.ddobak.font.repository.FontRepository;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DIbServiceImpl implements DibService {

    private final DibRepository dibRepository;

    private final MemberRepository memberRepository;
    private final FontRepository fontRepository;

    @Override
    public String makeDib(Long memberId, Long fontId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member Not Found"));

        Font font = fontRepository.findById(fontId)
                .orElseThrow(() -> new RuntimeException("Font Not Found"));

        if (dibRepository.existsByMemberIdAndFontId(memberId, fontId)){
            throw new EntityExistsException(memberId + "member already make dib on fontId" + fontId);
        } else {
            Dib dib = Dib.builder().member(member).font(font).build();
            dibRepository.save(dib);

            return "success";
        }
    }

    @Override
    public List<Dib> findByMemberId(Long memberId) {
        return dibRepository.findByMemberId(memberId);
    }

    @Override
    public Long countByFontId(Long fontId) {
        return dibRepository.countByFontId(fontId);
    }

    @Override
    public void removeDib(Long memberId, Long fontId) {
        if (dibRepository.existsByMemberIdAndFontId(memberId, fontId)){
            dibRepository.deleteByMemberIdAndFontId(memberId, fontId);
        } else {
            throw new EntityExistsException(memberId + "member didn't make dib on fontId" + fontId);
        }
    }
}

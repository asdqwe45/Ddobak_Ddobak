package com.ddobak.favorite.service;

import com.ddobak.favorite.entity.Favorite;
import com.ddobak.favorite.repository.FavoriteRepository;
import com.ddobak.font.entity.Font;
import com.ddobak.font.repository.FontRepository;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final MemberRepository memberRepository;
    private final FontRepository fontRepository;

    @Override
    public void makeDib(Long memberId, Long fontId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("Member Not Found"));

        Font font = fontRepository.findById(fontId)
                .orElseThrow(() -> new EntityNotFoundException("Font Not Found"));

        if (favoriteRepository.existsByMemberIdAndFontId(memberId, fontId)){
            throw new EntityExistsException(String.format("Member with ID %d already made a dib on font with ID %d", memberId, fontId));
        } else {
            Favorite favorite = Favorite.builder().member(member).font(font).build();
            favoriteRepository.save(favorite);
        }
    }

    @Override
    public List<Favorite> findByMemberId(Long memberId) {
        return favoriteRepository.findByMemberId(memberId);
    }

    @Override
    public Long countByFontId(Long fontId) {
        return favoriteRepository.countByFontId(fontId);
    }

    @Override
    public void removeDib(Long memberId, Long fontId) {
        if (favoriteRepository.existsByMemberIdAndFontId(memberId, fontId)){
            favoriteRepository.deleteByMemberIdAndFontId(memberId, fontId);
        } else {
            throw new EntityExistsException(String.format("Favorite by Member with ID %d on font with ID %d does not exist", memberId, fontId));
        }
    }

    @Override
    public boolean existsByMemberIDAndFontID(Long memberId, Long fontId) {
        return favoriteRepository.existsByMemberIdAndFontId(memberId, fontId);
    }
}

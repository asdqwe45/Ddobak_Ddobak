package com.ddobak.font.service;

import com.ddobak.favorite.repository.FavoriteRepository;
import com.ddobak.font.dto.request.MakeFontRequest;
import com.ddobak.font.dto.response.FontDetailResponse;
import com.ddobak.font.dto.response.FontResponse;
import com.ddobak.font.entity.Font;
import com.ddobak.font.entity.Keyword;
import com.ddobak.font.repository.FontQueryRepository;
import com.ddobak.font.repository.FontRepository;
import com.ddobak.font.repository.KeywordRepository;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.security.util.LoginInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class FontServiceImpl implements FontService {

    private final FontRepository fontRepository;
    private final MemberRepository memberRepository;
    private final KeywordRepository keywordRepository;
    private final FontQueryRepository fontQueryRepository;
    private final FavoriteRepository favoriteRepository;

    @Override
    public void createFont(String font_sort_url, LoginInfo loginInfo){
        String email = loginInfo.email();

        Member member = memberRepository.findByEmail(email).orElseThrow(
                () -> new EntityNotFoundException("Member not found with email: " + email)
        );
        Font newFont = Font.from(font_sort_url,member);
        System.out.println("############");
        System.out.println(newFont.getFont_sort_url());
        System.out.println("############");

        fontRepository.save(newFont);
    }

    @Override
    public void makeFont(MakeFontRequest req, LoginInfo loginInfo, String fontUrl) {
        String email = loginInfo.email();
        Member member = memberRepository.findById(loginInfo.id())
                .orElseThrow(() -> new EntityNotFoundException("Member not found with email: " + loginInfo.id()));

        Font font = fontRepository.findByFontSortUrl(req.fontSortUrl())
                .orElseThrow(() -> new EntityNotFoundException("Font not found with URL: " + req.fontSortUrl()));

        font.makeDetail(req, fontUrl);

        addKeywordToFont(req.keyword1(), font);
        Optional.ofNullable(req.keyword2()).ifPresent(keyword -> addKeywordToFont(keyword, font));
        Optional.ofNullable(req.keyword3()).ifPresent(keyword -> addKeywordToFont(keyword, font));

        fontRepository.save(font);
    }

    private void addKeywordToFont(String keyword, Font font) {
        if (keyword != null && !keyword.trim().isEmpty()) {
            Keyword keywordEntity = keywordRepository.findByKeyword(keyword)
                    .orElseGet(() -> {
                        Keyword newKeyword = new Keyword(keyword, font);
                        keywordRepository.save(newKeyword);
                        return newKeyword;
                    });
            font.getKeywords().add(keywordEntity);
        }
    }
    @Override
    public List<FontResponse> getFontList(LoginInfo loginInfo,Pageable pageable,String search, List<String> keywords, Boolean free) {
        //Integer fontCount = fontRepository.countAll();
        Optional<Member> member = memberRepository.findByEmail(loginInfo.email());
        Long member_id = member.get().getId();
        List<FontResponse> resultList = fontQueryRepository.getFontList(member_id,pageable,search, keywords,free);

        return resultList;
    }

    @Override
    public List<FontResponse> getFontListNoAuth(Pageable pageable,String search, List<String> keywords, Boolean free){
        //Integer fontCount = fontRepository.countAll();
        List<FontResponse> resultList = fontQueryRepository.getFontListNoAuth(pageable,search, keywords,free);

        return resultList;
    }

    @Async
    protected void plusViewCount(Font font){
        font.plusViewCount();
    }

    @Override
    public FontDetailResponse getFontDetail(Long fontId, LoginInfo loginInfo){
        Font font = fontQueryRepository.getFontWithKeywords(fontId);
        plusViewCount(font);
//        Boolean dibCheck = dibRepository.existsByMemberIdAndFontId(loginInfo.id(), fontId);
        Boolean dibCheck =true;
        List<String> fontKeywords = new ArrayList<>();
        for(Keyword k : font.getKeywords()){
            fontKeywords.add(k.getKeyword());
        }
        Long dibCount = favoriteRepository.countByFontId(fontId);
        FontDetailResponse result = new FontDetailResponse(fontId,dibCheck,"producer", font.getViewCount(),fontKeywords,font.getIntroduce_text(),font.getFont_file_url(),dibCount);

        return result;
    }

}


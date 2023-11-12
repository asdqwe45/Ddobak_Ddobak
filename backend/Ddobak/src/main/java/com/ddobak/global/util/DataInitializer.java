package com.ddobak.global.util;

import static java.time.LocalDateTime.now;

import com.ddobak.font.dto.request.FinalMakeRequest;
import com.ddobak.font.dto.request.MakeFontRequest;
import com.ddobak.font.entity.Font;
import com.ddobak.font.entity.FontStatusType;
import com.ddobak.font.entity.Keyword;
import com.ddobak.font.repository.FontRepository;
import com.ddobak.font.repository.KeywordRepository;
import com.ddobak.font.service.FontService;
import com.ddobak.member.entity.Member;
import com.ddobak.member.entity.SignUpType;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.security.util.LoginInfo;
import com.ddobak.transaction.dto.request.ChargeRequest;
import com.ddobak.transaction.dto.request.WithdrawRequest;
import com.ddobak.transaction.service.TransactionService;
import java.security.Key;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Profile({"prod"})
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final KeywordRepository keywordRepository;

    private final FontService fontService;
    private final TransactionService transactionService;

    @Override
    public void run(String... args) throws Exception {

//        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//
//        // 폰트 키워드 생성
//        List<String> keywords = new ArrayList<>();
//        keywords.add("단정한");
//        keywords.add("가지런한");
//        keywords.add("둥글둥글");
//        keywords.add("네모네모");
//        keywords.add("삐뚤빼뚤");
//        keywords.add("귀여운");
//        keywords.add("문서체");
//        keywords.add("어른같은");
//        keywords.add("아이같은");
//        keywords.add("자유로운");
//        Random rand = new Random();
//
//        Long fontId = 1L;
//
//        // 회원 생성
//        for(int i=1;i<7;i++) {
//            Member member = Member.builder()
//                .email("test" + i)
//                .nickname("또박 테스트계정" + i)
//                .signUpType(SignUpType.GENERAL)
//                .profileImg("https://ddobak-profile-image.s3.ap-northeast-2.amazonaws.com/profile-img/keroro2.png")
//                .introduceText("안녕하세요! 또박 테스트계정" + i)
//                .productionStatus(false)
//                .point(0)
//                .build();
//            member.encodePassword(bCryptPasswordEncoder.encode("1234"));
//            memberRepository.save(member);
//            LoginInfo loginInfo = new LoginInfo(member.getEmail(), member.getId());
//            transactionService.chargePoint(loginInfo, new ChargeRequest(50000));
//            transactionService.chargePoint(loginInfo, new ChargeRequest(5000000));
//            transactionService.withdrawPoint(loginInfo, new WithdrawRequest(100000));
//            transactionService.chargePoint(loginInfo, new ChargeRequest(100000));
//            transactionService.withdrawPoint(loginInfo, new WithdrawRequest(50000));
//            transactionService.chargePoint(loginInfo, new ChargeRequest(200000));
//
//            for(int j=1 ;j<6;j++) {
//                String fontSortUrl = "FontSortUrl" + i + " " + j;
//                String fontKorName = "FontKorName" + i + " " + j;
//                String fontEngName = "FontEngName" + i + " " + j;
//                fontService.createFont(fontSortUrl, loginInfo);
//                // OpensStatus, FreeStatus, 키워드 랜덤 리스트 생성
//                boolean openStatus = rand.nextBoolean();
//                boolean freeStatus = rand.nextBoolean();
//                List<String> keywordList = new ArrayList<>();
//                for(int k=0;k< rand.nextInt(3)+1;k++) {
//                    keywordList.add(keywords.get(rand.nextInt(10)));
//                }
//
//                MakeFontRequest makeFontRequest = new MakeFontRequest(fontId, fontSortUrl, fontKorName, fontEngName, openStatus, freeStatus,((rand.nextInt(10) + 1)* 10000), member.getNickname() + "이 만든 폰트 입니당!", keywordList);
//                fontService.makeFont(makeFontRequest, loginInfo);
//                Font font = fontService.findByFontId(fontId);
//                transactionService.requestFontTransaction(font, member.getId(), font.getPrice());
//                String fontFileUrl = "FontFileUrl" + i + " " + j;
//                FinalMakeRequest finalMakeRequest = new FinalMakeRequest(fontId, fontFileUrl);
//                fontService.finalMakeFont(finalMakeRequest, loginInfo);
//                fontId++;
//            }
//
//        }


    }
}

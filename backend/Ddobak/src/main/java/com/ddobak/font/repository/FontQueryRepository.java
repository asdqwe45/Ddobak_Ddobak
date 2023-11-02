package com.ddobak.font.repository;

import com.ddobak.font.controller.FontController;
import com.ddobak.font.dto.request.CreateFontRequest;
import com.ddobak.font.entity.Font;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FontQueryRepository {

//    @PersistenceContext
//    private EntityManager em;
//
//    @Autowired
//    private final JPAQueryFactory jpaQueryFactory;
//
//    @Autowired
//    public FontQueryRepository(EntityManager em){
//        this.jpaQueryFactory = new JPAQueryFactory(em);
//    }

    public record FontListWebResponse(
        String font_file_url,
        String producer_name,
        String font_name,
        Boolean favorite
    ){
        public FontListWebResponse(String font_file_url, String producer_name, String font_name, Boolean favorite){
            this.font_file_url=font_file_url;
            this.producer_name = producer_name;
            this.font_name = font_name;
            this.favorite = favorite;
        }
    }


//    public void findFonts(List<String> keywords, Boolean isFree){
//        JPAQuery<Font> query = new JPAQuery<>(em);
//
//        QFont font = QFont.font;
//
//        query.select(font)
//             .from(font)
//             .where(buildPredicate(keywords,isFree));
//
////        return query.fetch();
//
//    }
//
//    public Predicate buildPredicate(List<String> keywords, Boolean isFree) {
//        QFont font = QFont.font;
//
//        BooleanBuilder builder = new BooleanBuilder();
//
//        if (keywords != null && !keywords.isEmpty()) {
//            BooleanBuilder keywordBuilder = new BooleanBuilder();
//            for (String keyword : keywords) {
//                keywordBuilder.or(font.ko_font_name.contains(keyword)
//                                                   .or(font.en_font_name.contains(keyword)));
//            }
//            builder.and(keywordBuilder);
//        }
//
//        if (isFree != null) {
//            builder.and(font.freeStatus.eq(isFree));
//        }
//
//        return builder;
//    }


}


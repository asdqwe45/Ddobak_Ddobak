package com.ddobak.font.repository;

import com.ddobak.favorite.entity.QFavorite;
import com.ddobak.favorite.repository.FavoriteRepository;
import com.ddobak.font.dto.response.FontListResponse;
import com.ddobak.font.entity.Font;
import com.ddobak.font.entity.QFont;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import static com.querydsl.core.types.Projections.constructor;
import static com.querydsl.jpa.JPAExpressions.select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FontQueryRepository {


    @PersistenceContext
    private EntityManager em;

    @Autowired
    private final JPAQueryFactory jpaQueryFactory;

    @Autowired
    private final FavoriteRepository favoriteRepository;

    @Autowired
    public FontQueryRepository(EntityManager em, FavoriteRepository favoriteRepository){
        this.jpaQueryFactory = new JPAQueryFactory(em);
        this.favoriteRepository = favoriteRepository;
    }


    public List<FontListResponse> getFontList(Long member_id,Pageable pageable,String search, List<String> keywords, Boolean free) {
        QFont font = QFont.font; // 이는 생성된 Querydsl 메타 모델을 가정합니다.
        QFavorite favorite = QFavorite.favorite;
        BooleanBuilder whereClause = new BooleanBuilder();

        whereClause.and(font.open_status.isTrue());

        if (search != null && !search.isEmpty()) {
            whereClause.and(font.producer.nickname.eq(search)
                    .or(font.kor_font_name.eq(search)));
        }


        if (free != null) {
            whereClause.and(font.free_status.eq(free));
        }

        if (keywords != null && !keywords.isEmpty()) {
            for (String keywordStr : keywords) {
                whereClause.and(font.keywords.any().keyword.eq(keywordStr));
            }
        }

        // 쿼리 생성 및 실행
        List<FontListResponse> fonts = jpaQueryFactory
                .select(constructor(FontListResponse.class,
                        font.id,
                        font.kor_font_name,
                        font.producer.nickname,
                        font.font_file_url,
                        select(favorite.id.count())
                                .from(favorite)
                                .where(favorite.member.id.eq(member_id))
                                .gt(0L)
                ))
                .from(font)
                .where(whereClause)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(font.id.desc())
                .fetch();

        return fonts;
    }
    public List<FontListResponse> getFontListNoAuth(Pageable pageable,String search, List<String> keywords, Boolean free) {
        QFont font = QFont.font; // 이는 생성된 Querydsl 메타 모델을 가정합니다.
        QFavorite favorite = QFavorite.favorite;
        BooleanBuilder whereClause = new BooleanBuilder();

        whereClause.and(font.open_status.isTrue());

        if (search != null && !search.isEmpty()) {
            whereClause.and(font.producer.nickname.eq(search)
                    .or(font.kor_font_name.eq(search)));
        }


        if (free != null) {
            whereClause.and(font.free_status.eq(free));
        }

        if (keywords != null && !keywords.isEmpty()) {
            for (String keywordStr : keywords) {
                whereClause.and(font.keywords.any().keyword.eq(keywordStr));
            }
        }

        // 쿼리 생성 및 실행
        List<FontListResponse> fonts = jpaQueryFactory
                .select(constructor(FontListResponse.class,
                        font.id,
                        font.kor_font_name,
                        font.producer.nickname,
                        font.font_file_url,
                        Expressions.as(Expressions.constant(false), "favoriteCheck")
                ))
                .from(font)
                .where(whereClause)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(font.id.desc())
                .fetch();

        //List<FontListResponse> fonts = new ArrayList<>();
        return fonts;
    }
    public Font getFontWithKeywords(Long fontId) {
        return em.createQuery(
                        "SELECT f FROM Font f JOIN FETCH f.keywords WHERE f.id = :fontId", Font.class)
                .setParameter("fontId", fontId)
                .getSingleResult();
    }

}


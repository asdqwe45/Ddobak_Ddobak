package com.ddobak.font.repository;

import com.ddobak.favorite.entity.QFavorite;
import com.ddobak.favorite.repository.FavoriteRepository;
import com.ddobak.font.dto.response.FontListResponse;
import com.ddobak.font.dto.response.FontResponse;
import com.ddobak.font.entity.Font;
import com.ddobak.font.entity.QFont;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
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


    public FontListResponse getFontList(Long member_id, Pageable pageable, String search, List<String> keywords, Boolean free) {
        QFont font = QFont.font;
        QFavorite favorite = QFavorite.favorite;
        BooleanBuilder whereClause = new BooleanBuilder();

        whereClause.and(font.open_status.isTrue());

        if (search != null && !search.isEmpty()) {
            whereClause.and(font.producer.nickname.contains(search)
                    .or(font.kor_font_name.contains(search)));
        }


        if (free != null) {
            whereClause.and(font.free_status.eq(free));
        }

        if (keywords != null && !keywords.isEmpty()) {
            BooleanExpression keywordExpressions = null;
            for (String keywordStr : keywords) {
                BooleanExpression keywordExpression = font.keywords.any().keyword.eq(keywordStr);
                if (keywordExpressions == null) {
                    keywordExpressions = keywordExpression;
                } else {
                    keywordExpressions = keywordExpressions.or(keywordExpression);
                }
            }
            whereClause.and(keywordExpressions);
        }

        long fontCount = jpaQueryFactory
                .select(font.count())
                .from(font)
                .where(whereClause)
                .fetchOne();

        List<FontResponse> fontList = jpaQueryFactory
                .select(constructor(FontResponse.class,
                        font.id,
                        font.kor_font_name,
                        font.producer.nickname,
                        font.font_file_url,
                        select(favorite.id.count())
                                .from(favorite)
                                .where(favorite.member.id.eq(member_id),
                                        favorite.font.id.eq(font.id))
                                .gt(0L)
                ))
                .from(font)
                .where(whereClause)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(font.id.desc())
                .fetch();

        FontListResponse response = new FontListResponse(fontCount,fontList);

        return response;
    }

    public FontListResponse getFontListNoAuth(Pageable pageable,String search, List<String> keywords, Boolean free) {
        QFont font = QFont.font;
        BooleanBuilder whereClause = new BooleanBuilder();

        whereClause.and(font.open_status.isTrue());

        if (search != null && !search.isEmpty()) {
            whereClause.and(font.producer.nickname.contains(search)
                    .or(font.kor_font_name.contains(search)));
        }


        if (free != null) {
            whereClause.and(font.free_status.eq(free));
        }

        if (keywords != null && !keywords.isEmpty()) {
            BooleanExpression keywordExpressions = null;
            for (String keywordStr : keywords) {
                BooleanExpression keywordExpression = font.keywords.any().keyword.eq(keywordStr);
                if (keywordExpressions == null) {
                    keywordExpressions = keywordExpression;
                } else {
                    keywordExpressions = keywordExpressions.or(keywordExpression);
                }
            }
            whereClause.and(keywordExpressions);
        }
        long fontCount = jpaQueryFactory
                .select(font.count())
                .from(font)
                .where(whereClause)
                .fetchOne();


        List<FontResponse> fontList = jpaQueryFactory
                .select(constructor(FontResponse.class,
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
        FontListResponse response = new FontListResponse(fontCount,fontList);

        return response;
    }
    public Font getFontWithKeywords(Long fontId) {
        return em.createQuery(
                        "SELECT f FROM Font f JOIN FETCH f.keywords WHERE f.id = :fontId", Font.class)
                .setParameter("fontId", fontId)
                .getSingleResult();
    }

}


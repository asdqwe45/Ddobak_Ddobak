package com.ddobak.font.repository;

import com.ddobak.font.dto.request.MakeFontRequest;
import com.ddobak.font.entity.Font;
import com.ddobak.member.entity.Member;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@RequiredArgsConstructor
public class FontQueryRepository {

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private final JPAQueryFactory jpaQueryFactory;

    @Autowired
    public FontQueryRepository(EntityManager em){
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }
}


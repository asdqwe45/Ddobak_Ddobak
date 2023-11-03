package com.ddobak.font.entity;

import com.ddobak.font.controller.FontController;
import com.ddobak.font.dto.request.CreateFontRequest;
import com.ddobak.global.entity.BaseEntity;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;

import com.ddobak.member.dto.request.SignUpRequest;
import com.ddobak.member.entity.Member;
import com.ddobak.member.entity.SignUpType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Font extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="producer", nullable = false)
    private Member member;

    @Column(nullable = false)
    private String font_sort_url;

    @Column(columnDefinition = "varchar(255) default 'urlDefault'")
    private String font_file_url;

    @Column(columnDefinition = "varchar(255) default 'koNameDefault'")
    private String kor_font_name;

    @Column(columnDefinition = "varchar(255) default 'enNameDefault'")
    private String eng_font_name;

    @Column(columnDefinition = "BOOLEAN default false")
    private Boolean openStatus;

    @Column(columnDefinition = "BOOLEAN default false")
    private Boolean freeStatus;

    @Column(columnDefinition = "int default 0")
    private Integer price;

    @Column(columnDefinition = "BOOLEAN default false")
    private Boolean commerceStatus;

    @Column(columnDefinition = "varchar(255) default 'IntroduceDefault'")
    private String introduceText;

    @Column
    private LocalDate create_date;

    public static Font from(CreateFontRequest createFontRequest, String font_file_url, Member producer) {
        return Font.builder()
                .member(producer)
                .font_file_url(font_file_url)
                .font_sort_url(createFontRequest.font_sort_url())
                .kor_font_name(createFontRequest.kor_file_name())
                .eng_font_name(createFontRequest.eng_file_name())
                .build();
    }
}

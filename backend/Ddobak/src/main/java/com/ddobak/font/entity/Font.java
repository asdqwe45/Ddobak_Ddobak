package com.ddobak.font.entity;

import com.ddobak.font.dto.request.MakeFontRequest;
import com.ddobak.global.entity.BaseEntity;

import com.ddobak.transaction.entity.Creation;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import com.ddobak.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import javax.persistence.*;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Font extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="producer", nullable = false)
    private Member producer;

    @Column(nullable = false)
    private String font_sort_url;

    @Column(columnDefinition = "varchar(255) default 'urlDefault'")
    private String font_file_url;

    @Column(columnDefinition = "varchar(255) default 'koNameDefault'")
    private String kor_font_name;

    @Column(columnDefinition = "varchar(255) default 'enNameDefault'")
    private String eng_font_name;

    @Column(columnDefinition = "BOOLEAN default false")
    private Boolean open_status;

    @Column(columnDefinition = "BOOLEAN default false")
    private Boolean free_status;

    @Column(columnDefinition = "int default 0")
    private Integer price;

    @Column(columnDefinition = "BOOLEAN default false")
    private Boolean commerce_status;

    @Column(columnDefinition = "varchar(255) default 'IntroduceDefault'")
    private String introduce_text;

    @Column
    private LocalDateTime create_datetime;

    @Column
    private Boolean copyright_notice;

    @Column
    private Boolean same_person_check;

    @Column
    private String copyrigher;

    @Column
    private Integer viewCount;

    @OneToOne(mappedBy = "createdFont")
    private Creation creation;

    @ManyToMany
    @JoinTable(
            name = "font_keyword",
            joinColumns = @JoinColumn(name = "font_id"),
            inverseJoinColumns = @JoinColumn(name = "keyword_id")
    )
    private List<Keyword> keywords;


    public static Font from(String font_sort_url, Member producer) {
        return Font.builder()
                .producer(producer)
                .font_sort_url(font_sort_url)
                .build();
    }
    public void makeDetail(MakeFontRequest req, String fontUrl){
        this.font_file_url=fontUrl;
        this.kor_font_name = req.korFontName();
        this.eng_font_name = req.engFontName();
        this.open_status = req.openStatus();
        this.free_status = req.freeStatus();
        this.price=req.price();
        this.commerce_status = req.commerceStatus();
        this.introduce_text = req.introduceText();
        this.copyright_notice=req.copyrightNotice();
        this.same_person_check = req.samePersonCheck();
        this.copyrigher=req.copyrighter();
        this.create_datetime= LocalDateTime.now();
        this.viewCount=0;
    }
    public void plusViewCount() {
        this.viewCount = this.viewCount + 1;

    }
}

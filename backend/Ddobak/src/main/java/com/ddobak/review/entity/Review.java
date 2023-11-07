package com.ddobak.review.entity;

import com.ddobak.font.entity.Font;
import com.ddobak.global.entity.BaseEntity;
import com.ddobak.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class Review extends BaseEntity {

    @Column
    private String image_url;

    public Review( String imageUrl, String context, Member member, Font font) {
        this.image_url = imageUrl;
        this.context = context;
        this.member = member;
        this.font = font;
    }

    @Column
    private String context;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mamber_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "font_id")
    private Font font;


}

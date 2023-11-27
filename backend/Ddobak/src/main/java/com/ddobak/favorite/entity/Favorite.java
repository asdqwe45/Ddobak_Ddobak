package com.ddobak.favorite.entity;

import com.ddobak.font.entity.Font;
import com.ddobak.global.entity.BaseEntity;
import com.ddobak.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "favorite")
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Favorite extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "font_id", nullable = false)
    private Font font;

}

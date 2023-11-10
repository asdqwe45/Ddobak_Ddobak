package com.ddobak.cart.entity;

import com.ddobak.font.entity.Font;
import com.ddobak.global.entity.BaseEntity;
import com.ddobak.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor
public class Cart extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fontId")
    private Font font;

    public Cart(Member member, Font font) {
        this.member = member;
        this.font = font;
    }
}

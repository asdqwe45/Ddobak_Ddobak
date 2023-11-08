package com.ddobak.basket.entity;

import com.ddobak.font.entity.Font;
import com.ddobak.global.entity.BaseEntity;
import com.ddobak.member.entity.Member;

import javax.persistence.*;
import java.util.List;

public class Basket extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @OneToMany(mappedBy = "basket")
    private List<Font> fontList;

}

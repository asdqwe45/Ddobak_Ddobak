package com.ddobak.basket.entity;

import com.ddobak.font.entity.Font;
import com.ddobak.global.entity.BaseEntity;
import com.ddobak.member.entity.Member;
import com.ddobak.security.util.LoginInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Basket extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @OneToMany(mappedBy = "basket")
    private List<Font> fontList = new ArrayList<>();

}

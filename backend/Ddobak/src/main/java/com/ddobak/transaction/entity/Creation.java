package com.ddobak.transaction.entity;

import com.ddobak.font.entity.Font;
import com.ddobak.member.entity.Member;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Creation extends TransactionInfo{

    @OneToOne
    @JoinColumn(name = "font_id")
    private Font createdFont; // 제작 폰트

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member creator; // 충전한 사람

}

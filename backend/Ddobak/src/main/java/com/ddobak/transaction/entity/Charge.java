package com.ddobak.transaction.entity;

import com.ddobak.member.dto.request.SignUpRequest;
import com.ddobak.member.entity.Member;
import com.ddobak.member.entity.SignUpType;
import com.ddobak.transaction.dto.request.ChargeRequest;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SuperBuilder
public class Charge extends TransactionInfo{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member charger; // 충전한 사람

}

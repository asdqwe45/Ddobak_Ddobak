package com.ddobak.transaction.entity;

import com.ddobak.global.entity.BaseEntity;
import com.ddobak.member.entity.Member;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseOrder extends BaseEntity {

    // 구매자 ID
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private Member buyer;

    // 대표 메뉴
    private String mainFont;
    private Long fontId;

    // 주문한 개수
    private int orderCount;

    // 주문 총액
    private int totalAmount;

    // 주문 후 금액
    private int totalAfterAmount;

    // 주문 날짜
    private LocalDateTime orderDate;

    public void calcAfterAmount(int totalAfterAmount) {
        this.totalAfterAmount = totalAfterAmount;
    }
}

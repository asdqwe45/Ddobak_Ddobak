package com.ddobak.transaction.entity;

import com.ddobak.global.entity.BaseEntity;
import java.time.LocalDateTime;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.CustomLog;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@MappedSuperclass
public abstract class TransactionInfo extends BaseEntity {

    @Column(nullable = false)
    private int transactionAmount; // 거래 금액

    @Column(nullable = false)
    private int transactionAfterAmount; // 거래 후 금액

    @Column(nullable = false)
    private LocalDateTime transactionDate; // 거래 날짜
}

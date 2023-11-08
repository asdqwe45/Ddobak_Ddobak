package com.ddobak.transaction.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QWithdrawal is a Querydsl query type for Withdrawal
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWithdrawal extends EntityPathBase<Withdrawal> {

    private static final long serialVersionUID = 2040776844L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QWithdrawal withdrawal = new QWithdrawal("withdrawal");

    public final QTransactionInfo _super = new QTransactionInfo(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    //inherited
    public final NumberPath<Integer> transactionAfterAmount = _super.transactionAfterAmount;

    //inherited
    public final NumberPath<Integer> transactionAmount = _super.transactionAmount;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> transactionDate = _super.transactionDate;

    public final com.ddobak.member.entity.QMember withdrawer;

    public QWithdrawal(String variable) {
        this(Withdrawal.class, forVariable(variable), INITS);
    }

    public QWithdrawal(Path<? extends Withdrawal> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QWithdrawal(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QWithdrawal(PathMetadata metadata, PathInits inits) {
        this(Withdrawal.class, metadata, inits);
    }

    public QWithdrawal(Class<? extends Withdrawal> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.withdrawer = inits.isInitialized("withdrawer") ? new com.ddobak.member.entity.QMember(forProperty("withdrawer")) : null;
    }

}


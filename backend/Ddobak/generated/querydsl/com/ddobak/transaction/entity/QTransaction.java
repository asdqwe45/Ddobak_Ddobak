package com.ddobak.transaction.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTransaction is a Querydsl query type for Transaction
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTransaction extends EntityPathBase<Transaction> {

    private static final long serialVersionUID = -41614873L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTransaction transaction = new QTransaction("transaction");

    public final QTransactionInfo _super = new QTransactionInfo(this);

    public final com.ddobak.member.entity.QMember buyer;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final com.ddobak.member.entity.QMember seller;

    //inherited
    public final NumberPath<Integer> transactionAfterAmount = _super.transactionAfterAmount;

    //inherited
    public final NumberPath<Integer> transactionAmount = _super.transactionAmount;

    //inherited
    public final DateTimePath<java.util.Date> transactionDate = _super.transactionDate;

    public final com.ddobak.font.entity.QFont transactionFont;

    public QTransaction(String variable) {
        this(Transaction.class, forVariable(variable), INITS);
    }

    public QTransaction(Path<? extends Transaction> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTransaction(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTransaction(PathMetadata metadata, PathInits inits) {
        this(Transaction.class, metadata, inits);
    }

    public QTransaction(Class<? extends Transaction> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.buyer = inits.isInitialized("buyer") ? new com.ddobak.member.entity.QMember(forProperty("buyer")) : null;
        this.seller = inits.isInitialized("seller") ? new com.ddobak.member.entity.QMember(forProperty("seller")) : null;
        this.transactionFont = inits.isInitialized("transactionFont") ? new com.ddobak.font.entity.QFont(forProperty("transactionFont"), inits.get("transactionFont")) : null;
    }

}


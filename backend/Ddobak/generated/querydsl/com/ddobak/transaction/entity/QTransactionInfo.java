package com.ddobak.transaction.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTransactionInfo is a Querydsl query type for TransactionInfo
 */
@Generated("com.querydsl.codegen.DefaultSupertypeSerializer")
public class QTransactionInfo extends EntityPathBase<TransactionInfo> {

    private static final long serialVersionUID = -839479499L;

    public static final QTransactionInfo transactionInfo = new QTransactionInfo("transactionInfo");

    public final com.ddobak.global.entity.QBaseEntity _super = new com.ddobak.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final NumberPath<Integer> transactionAfterAmount = createNumber("transactionAfterAmount", Integer.class);

    public final NumberPath<Integer> transactionAmount = createNumber("transactionAmount", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> transactionDate = createDateTime("transactionDate", java.time.LocalDateTime.class);

    public QTransactionInfo(String variable) {
        super(TransactionInfo.class, forVariable(variable));
    }

    public QTransactionInfo(Path<? extends TransactionInfo> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTransactionInfo(PathMetadata metadata) {
        super(TransactionInfo.class, metadata);
    }

}


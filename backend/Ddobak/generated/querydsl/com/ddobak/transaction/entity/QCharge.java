package com.ddobak.transaction.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCharge is a Querydsl query type for Charge
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCharge extends EntityPathBase<Charge> {

    private static final long serialVersionUID = -1395527157L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCharge charge = new QCharge("charge");

    public final QTransactionInfo _super = new QTransactionInfo(this);

    public final com.ddobak.member.entity.QMember charger;

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

    public QCharge(String variable) {
        this(Charge.class, forVariable(variable), INITS);
    }

    public QCharge(Path<? extends Charge> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCharge(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCharge(PathMetadata metadata, PathInits inits) {
        this(Charge.class, metadata, inits);
    }

    public QCharge(Class<? extends Charge> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.charger = inits.isInitialized("charger") ? new com.ddobak.member.entity.QMember(forProperty("charger")) : null;
    }

}


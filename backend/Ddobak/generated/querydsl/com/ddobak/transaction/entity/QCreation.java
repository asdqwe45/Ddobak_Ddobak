package com.ddobak.transaction.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCreation is a Querydsl query type for Creation
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCreation extends EntityPathBase<Creation> {

    private static final long serialVersionUID = -687487882L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCreation creation = new QCreation("creation");

    public final QTransactionInfo _super = new QTransactionInfo(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final com.ddobak.font.entity.QFont createFont;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    //inherited
    public final NumberPath<Integer> transactionAfterAmount = _super.transactionAfterAmount;

    //inherited
    public final NumberPath<Integer> transactionAmount = _super.transactionAmount;

    //inherited
    public final DateTimePath<java.util.Date> transactionDate = _super.transactionDate;

    public QCreation(String variable) {
        this(Creation.class, forVariable(variable), INITS);
    }

    public QCreation(Path<? extends Creation> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCreation(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCreation(PathMetadata metadata, PathInits inits) {
        this(Creation.class, metadata, inits);
    }

    public QCreation(Class<? extends Creation> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.createFont = inits.isInitialized("createFont") ? new com.ddobak.font.entity.QFont(forProperty("createFont"), inits.get("createFont")) : null;
    }

}


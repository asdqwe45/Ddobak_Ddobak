package com.ddobak.dib.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDib is a Querydsl query type for Dib
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDib extends EntityPathBase<Dib> {

    private static final long serialVersionUID = 1626740103L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDib dib = new QDib("dib");

    public final com.ddobak.global.entity.QBaseEntity _super = new com.ddobak.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final com.ddobak.font.entity.QFont font;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final com.ddobak.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public QDib(String variable) {
        this(Dib.class, forVariable(variable), INITS);
    }

    public QDib(Path<? extends Dib> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDib(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDib(PathMetadata metadata, PathInits inits) {
        this(Dib.class, metadata, inits);
    }

    public QDib(Class<? extends Dib> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.font = inits.isInitialized("font") ? new com.ddobak.font.entity.QFont(forProperty("font"), inits.get("font")) : null;
        this.member = inits.isInitialized("member") ? new com.ddobak.member.entity.QMember(forProperty("member")) : null;
    }

}


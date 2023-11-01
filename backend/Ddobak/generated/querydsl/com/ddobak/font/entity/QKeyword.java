package com.ddobak.font.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QKeyword is a Querydsl query type for Keyword
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QKeyword extends EntityPathBase<Keyword> {

    private static final long serialVersionUID = -526732007L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QKeyword keyword = new QKeyword("keyword");

    public final QFont Font;

    public final StringPath Keyword1 = createString("Keyword1");

    public final StringPath Keyword2 = createString("Keyword2");

    public final StringPath Keyword3 = createString("Keyword3");

    public final NumberPath<Long> keyword_id = createNumber("keyword_id", Long.class);

    public QKeyword(String variable) {
        this(Keyword.class, forVariable(variable), INITS);
    }

    public QKeyword(Path<? extends Keyword> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QKeyword(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QKeyword(PathMetadata metadata, PathInits inits) {
        this(Keyword.class, metadata, inits);
    }

    public QKeyword(Class<? extends Keyword> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.Font = inits.isInitialized("Font") ? new QFont(forProperty("Font")) : null;
    }

}


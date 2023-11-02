package com.ddobak.font.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFont is a Querydsl query type for Font
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFont extends EntityPathBase<Font> {

    private static final long serialVersionUID = 1775584031L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFont font = new QFont("font");

    public final com.ddobak.global.entity.QBaseEntity _super = new com.ddobak.global.entity.QBaseEntity(this);

    public final BooleanPath commerceStatus = createBoolean("commerceStatus");

    public final DatePath<java.time.LocalDate> create_date = createDate("create_date", java.time.LocalDate.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath eng_font_name = createString("eng_font_name");

    public final StringPath font_file_url = createString("font_file_url");

    public final StringPath font_sort_url = createString("font_sort_url");

    public final BooleanPath freeStatus = createBoolean("freeStatus");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath introduceText = createString("introduceText");

    public final StringPath kor_font_name = createString("kor_font_name");

    public final com.ddobak.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final BooleanPath openStatus = createBoolean("openStatus");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public QFont(String variable) {
        this(Font.class, forVariable(variable), INITS);
    }

    public QFont(Path<? extends Font> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFont(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFont(PathMetadata metadata, PathInits inits) {
        this(Font.class, metadata, inits);
    }

    public QFont(Class<? extends Font> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.ddobak.member.entity.QMember(forProperty("member")) : null;
    }

}


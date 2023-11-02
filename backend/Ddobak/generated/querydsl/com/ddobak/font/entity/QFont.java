package com.ddobak.font.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QFont is a Querydsl query type for Font
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFont extends EntityPathBase<Font> {

    private static final long serialVersionUID = 1775584031L;

    public static final QFont font = new QFont("font");

    public final com.ddobak.global.entity.QBaseEntity _super = new com.ddobak.global.entity.QBaseEntity(this);

    public final BooleanPath commerceStatus = createBoolean("commerceStatus");

    public final DatePath<java.time.LocalDate> create_date = createDate("create_date", java.time.LocalDate.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final StringPath en_font_name = createString("en_font_name");

    public final StringPath font_file_url = createString("font_file_url");

    public final StringPath font_sort_url = createString("font_sort_url");

    public final BooleanPath freeStatus = createBoolean("freeStatus");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath introduceText = createString("introduceText");

    public final StringPath ko_font_name = createString("ko_font_name");

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final BooleanPath openStatus = createBoolean("openStatus");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public QFont(String variable) {
        super(Font.class, forVariable(variable));
    }

    public QFont(Path<? extends Font> path) {
        super(path.getType(), path.getMetadata());
    }

    public QFont(PathMetadata metadata) {
        super(Font.class, metadata);
    }

}


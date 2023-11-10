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

    public final ListPath<com.ddobak.cart.entity.Cart, com.ddobak.cart.entity.QCart> carts = this.<com.ddobak.cart.entity.Cart, com.ddobak.cart.entity.QCart>createList("carts", com.ddobak.cart.entity.Cart.class, com.ddobak.cart.entity.QCart.class, PathInits.DIRECT2);

    public final BooleanPath commerce_status = createBoolean("commerce_status");

    public final BooleanPath copyright_notice = createBoolean("copyright_notice");

    public final StringPath copyrighter = createString("copyrighter");

    public final DateTimePath<java.time.LocalDateTime> create_datetime = createDateTime("create_datetime", java.time.LocalDateTime.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final com.ddobak.transaction.entity.QCreation creation;

    public final StringPath eng_font_name = createString("eng_font_name");

    public final ListPath<com.ddobak.favorite.entity.Favorite, com.ddobak.favorite.entity.QFavorite> favorite = this.<com.ddobak.favorite.entity.Favorite, com.ddobak.favorite.entity.QFavorite>createList("favorite", com.ddobak.favorite.entity.Favorite.class, com.ddobak.favorite.entity.QFavorite.class, PathInits.DIRECT2);

    public final StringPath font_file_url = createString("font_file_url");

    public final StringPath font_sort_url = createString("font_sort_url");

    public final BooleanPath free_status = createBoolean("free_status");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath introduce_text = createString("introduce_text");

    public final ListPath<Keyword, QKeyword> keywords = this.<Keyword, QKeyword>createList("keywords", Keyword.class, QKeyword.class, PathInits.DIRECT2);

    public final StringPath kor_font_name = createString("kor_font_name");

    public final EnumPath<FontStatusType> makeStatus = createEnum("makeStatus", FontStatusType.class);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final BooleanPath open_status = createBoolean("open_status");

    public final NumberPath<Integer> price = createNumber("price", Integer.class);

    public final com.ddobak.member.entity.QMember producer;

    public final BooleanPath same_person_check = createBoolean("same_person_check");

    public final NumberPath<Integer> viewCount = createNumber("viewCount", Integer.class);

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
        this.creation = inits.isInitialized("creation") ? new com.ddobak.transaction.entity.QCreation(forProperty("creation"), inits.get("creation")) : null;
        this.producer = inits.isInitialized("producer") ? new com.ddobak.member.entity.QMember(forProperty("producer")) : null;
    }

}


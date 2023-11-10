package com.ddobak.cart.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCart is a Querydsl query type for Cart
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCart extends EntityPathBase<Cart> {

    private static final long serialVersionUID = 1653960513L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCart cart = new QCart("cart");

    public final com.ddobak.global.entity.QBaseEntity _super = new com.ddobak.global.entity.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final com.ddobak.font.entity.QFont font;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final com.ddobak.member.entity.QMember member;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public QCart(String variable) {
        this(Cart.class, forVariable(variable), INITS);
    }

    public QCart(Path<? extends Cart> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCart(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCart(PathMetadata metadata, PathInits inits) {
        this(Cart.class, metadata, inits);
    }

    public QCart(Class<? extends Cart> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.font = inits.isInitialized("font") ? new com.ddobak.font.entity.QFont(forProperty("font"), inits.get("font")) : null;
        this.member = inits.isInitialized("member") ? new com.ddobak.member.entity.QMember(forProperty("member")) : null;
    }

}


package com.ddobak.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = 299602805L;

    public static final QMember member = new QMember("member1");

    public final com.ddobak.global.entity.QUserInfo _super = new com.ddobak.global.entity.QUserInfo(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final StringPath email = _super.email;

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath introduceText = createString("introduceText");

    //inherited
    public final StringPath loginPassword = _super.loginPassword;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> modifiedAt = _super.modifiedAt;

    public final StringPath nickname = createString("nickname");

    public final NumberPath<Integer> point = createNumber("point", Integer.class);

    public final BooleanPath productionStatus = createBoolean("productionStatus");

    public final StringPath profileImg = createString("profileImg");

    public final EnumPath<SignUpType> signUpType = createEnum("signUpType", SignUpType.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}


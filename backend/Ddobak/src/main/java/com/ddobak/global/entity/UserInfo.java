package com.ddobak.global.entity;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicUpdate
@MappedSuperclass
public abstract class UserInfo extends BaseEntity implements UserDetails {

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String loginPassword;

    public void encodePassword(String encodedPassword) {
        this.loginPassword = encodedPassword;
    }
}

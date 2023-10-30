package com.example.memberservice.member.entity;

import com.example.memberservice.global.entity.UserInfo;
import java.util.Collection;
import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;

@Getter
@SuperBuilder
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member extends UserInfo {

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private SignUpType signUpType;

    @Column(nullable = false)
    private String profileImg;

    @Column(nullable = false)
    private String  introduceText;

    @Column(nullable = false)
    private boolean productionStatus;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}

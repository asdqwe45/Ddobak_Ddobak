package com.example.memberservice.member.entity;

import com.example.memberservice.global.entity.UserInfo;
import com.example.memberservice.member.dto.request.SignUpRequest;
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

    @Column
    private String profileImg;

    @Column(nullable = false)
    private String  introduceText;

    @Column(nullable = false)
    private boolean productionStatus;

    public static Member from(SignUpRequest signUpRequest) {
        return Member.builder()
            .email(signUpRequest.email())
            .loginPassword(signUpRequest.loginPassword())
            .signUpType(SignUpType.GENERAL)
            .nickname(signUpRequest.nickname())
            .introduceText("안녕하세요! "+signUpRequest.nickname()+"입니다.")
            .productionStatus(false)
            .build();

    }

    public void registerProfileImg(String profileImgAddress) {
        this.profileImg = profileImgAddress;
    }


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

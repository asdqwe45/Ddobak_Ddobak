package com.ddobak.member.entity;

import com.ddobak.global.entity.UserInfo;
import com.ddobak.member.dto.request.SignUpRequest;
import java.util.Collection;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Entity
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends UserInfo {

    @Column(nullable = false)
    private String nickname;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SignUpType signUpType;

    @Column
    private String profileImg;

    @Column(nullable = false)
    private String introduceText;

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

    public void modifyInfoText(String infoText) {
        this.introduceText = infoText;
    }

    public void modifyNickname(String nickname) { this.nickname = nickname; }

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

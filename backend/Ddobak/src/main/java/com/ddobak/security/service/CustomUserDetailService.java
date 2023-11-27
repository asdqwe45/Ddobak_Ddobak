package com.ddobak.security.service;

import com.ddobak.global.exception.ErrorCode;
import com.ddobak.member.entity.SignUpType;
import com.ddobak.member.exception.MemberException;
import com.ddobak.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return memberRepository.findByEmail(email)
                               .orElseThrow(() -> new MemberException(ErrorCode.USER_NOT_FOUND));
    }
}

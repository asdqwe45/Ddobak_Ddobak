package com.ddobak.member.repository;

import com.ddobak.member.entity.Member;
import com.ddobak.member.entity.SignUpType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByEmailAndSignUpType(String email, SignUpType signUpType);

    boolean existsByNickname(String nickname);
}

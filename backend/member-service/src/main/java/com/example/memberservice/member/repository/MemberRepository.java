package com.example.memberservice.member.repository;

import com.example.memberservice.member.entity.Member;
import com.example.memberservice.member.entity.SignUpType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findByEmailAndSignUpType(String email, SignUpType signUpType);
}

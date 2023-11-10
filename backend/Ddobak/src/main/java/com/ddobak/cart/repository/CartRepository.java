package com.ddobak.cart.repository;


import com.ddobak.cart.entity.Cart;
import com.ddobak.font.entity.Font;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Boolean existsByMemberIdAndFontId(Long memberId,Long fontId);

    List<Cart> findAllByMemberIdOrderByCreatedAtDesc(Long memberId);

    @Transactional
    @Modifying
    @Query("delete from Cart c where c.font.id in :fontList and c.member.id = :memberId")
    void deleteFontsFromCart(@Param("memberId") Long memberId, @Param("fontList") List<Long> fontList);
}

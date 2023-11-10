package com.ddobak.cart.repository;


import com.ddobak.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart,Long> {
    Boolean existsByMemberIdAndFontId(Long memberId,Long fontId);

    List<Cart> findAllByMemberIdOrderByCreatedAtDesc(Long memberId);
}

package com.ddobak.basket.repository;

import com.ddobak.basket.entity.Basket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BasketRepository extends JpaRepository<Basket,Long> {
    Basket findByMemberId(Long memberId);
}

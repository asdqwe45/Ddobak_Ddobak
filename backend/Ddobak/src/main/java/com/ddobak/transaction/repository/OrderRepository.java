package com.ddobak.transaction.repository;

import com.ddobak.transaction.entity.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query("SELECT o FROM Order o where o.buyer.id = :memberId")
    List<Order> findOrdersByBuyer(@Param("memberId") Long memberId);

}

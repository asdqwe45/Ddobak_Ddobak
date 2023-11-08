package com.ddobak.transaction.repository;

import com.ddobak.transaction.entity.PurchaseOrder;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<PurchaseOrder, Long> {

    @Query("SELECT o FROM PurchaseOrder o where o.buyer.id = :memberId")
    List<PurchaseOrder> findOrdersByBuyer(@Param("memberId") Long memberId);

}

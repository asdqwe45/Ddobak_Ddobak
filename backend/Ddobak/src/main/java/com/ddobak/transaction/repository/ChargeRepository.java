package com.ddobak.transaction.repository;

import com.ddobak.transaction.entity.Charge;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChargeRepository extends JpaRepository<Charge, Long> {

    @Query("SELECT c FROM Charge c WHERE c.charger.id = :memberId")
    List<Charge> findChargesByCharger(@Param("memberId") Long memberId);
}

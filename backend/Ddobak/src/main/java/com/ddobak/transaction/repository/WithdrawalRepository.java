package com.ddobak.transaction.repository;

import com.ddobak.transaction.entity.Charge;
import com.ddobak.transaction.entity.Withdrawal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long> {

    @Query("SELECT w FROM Withdrawal w WHERE w.withdrawer.id = :memberId")
    List<Withdrawal> findWithdrawalByWithdrawer(@Param("memberId") Long memberId);
}

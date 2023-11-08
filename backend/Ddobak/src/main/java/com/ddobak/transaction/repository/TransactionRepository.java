package com.ddobak.transaction.repository;

import com.ddobak.transaction.entity.Transaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    @Query("SELECT t FROM Transaction t WHERE t.buyer.id =:memberId")
    List<Transaction> findTransactionBuyer(@Param("memberId") Long memberId);
}

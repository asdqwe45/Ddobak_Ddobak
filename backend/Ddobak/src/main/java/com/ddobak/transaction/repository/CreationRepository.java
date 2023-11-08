package com.ddobak.transaction.repository;

import com.ddobak.transaction.entity.Creation;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CreationRepository extends JpaRepository<Creation, Long> {

    @Query("SELECT c FROM Creation c where c.creator.id = :memberId")
    List<Creation> findCreationsByCreator(@Param("memberId") Long memberId);
}

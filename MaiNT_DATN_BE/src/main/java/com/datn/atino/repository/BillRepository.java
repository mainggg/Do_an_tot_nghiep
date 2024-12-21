package com.datn.atino.repository;

import com.datn.atino.domain.BillEntity;
import com.datn.atino.repository.custom.BillCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BillRepository extends JpaRepository<BillEntity, Integer>, BillCustomRepository {

    @Query("select b from BillEntity b where b.id = :id")
    BillEntity findByBillId(@Param("id") Integer id);

    @Query("select max(b.billCode) from BillEntity b")
    String findMaxCode();

    Boolean existsByIdAndStatus(Integer id, Integer status);
}

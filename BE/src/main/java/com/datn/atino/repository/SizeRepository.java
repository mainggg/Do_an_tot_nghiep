package com.datn.atino.repository;

import com.datn.atino.domain.SizeEntity;
import com.datn.atino.repository.custom.SizeRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SizeRepository extends JpaRepository<SizeEntity, Integer>, SizeRepositoryCustom {

    SizeEntity findByIdAndIsActiveTrue(Integer id);

}

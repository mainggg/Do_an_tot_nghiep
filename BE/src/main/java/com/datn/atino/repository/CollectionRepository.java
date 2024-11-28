package com.datn.atino.repository;

import com.datn.atino.domain.CollectionEntity;
import com.datn.atino.repository.custom.CollectionCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CollectionRepository extends JpaRepository<CollectionEntity, Integer>, CollectionCustomRepository {

    CollectionEntity findByIdAndIsActiveTrue(Integer id);

}

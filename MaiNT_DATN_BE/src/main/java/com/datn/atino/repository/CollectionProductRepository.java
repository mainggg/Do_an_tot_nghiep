package com.datn.atino.repository;

import com.datn.atino.domain.CollectionProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CollectionProductRepository extends JpaRepository<CollectionProductEntity, Integer> {

    List<CollectionProductEntity> findByIdCollection(Integer idCollection);

}

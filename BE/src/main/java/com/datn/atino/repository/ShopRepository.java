package com.datn.atino.repository;

import com.datn.atino.domain.ShopEntity;
import com.datn.atino.repository.custom.ShopRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopRepository extends JpaRepository<ShopEntity, Integer>, ShopRepositoryCustom {

    ShopEntity findByIdAndIsActiveTrue(Integer id);

}

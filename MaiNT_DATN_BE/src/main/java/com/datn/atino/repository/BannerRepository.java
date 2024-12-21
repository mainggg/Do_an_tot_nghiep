package com.datn.atino.repository;

import com.datn.atino.domain.BannerEntity;
import com.datn.atino.repository.custom.BannerRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BannerRepository extends JpaRepository<BannerEntity, Integer>, BannerRepositoryCustom {

    BannerEntity findByIdAndIsActiveTrue(Integer id);

}

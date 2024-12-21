package com.datn.atino.repository;

import com.datn.atino.domain.ColorEntity;
import com.datn.atino.repository.custom.ColorRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColorRepository extends JpaRepository<ColorEntity, Integer>, ColorRepositoryCustom {

    ColorEntity findByIdAndIsActiveTrue(Integer id);

}

package com.datn.atino.repository.custom;

import com.datn.atino.domain.CategoryEntity;
import com.datn.atino.domain.ColorEntity;
import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ColorRepositoryCustom {

    Page<ColorEntity> getAll(PageFilterInput<ColorEntity> input, Pageable pageable);

}

package com.datn.atino.repository.custom;

import com.datn.atino.domain.CategoryEntity;
import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryCustomRepository {

    Page<CategoryEntity> getAll(PageFilterInput<CategoryEntity> input, Pageable pageable, boolean isParent);

}

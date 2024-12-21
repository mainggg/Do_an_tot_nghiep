package com.datn.atino.repository.custom;

import com.datn.atino.domain.ColorEntity;
import com.datn.atino.domain.SizeEntity;
import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SizeRepositoryCustom {

    Page<SizeEntity> getAll(PageFilterInput<SizeEntity> input, Pageable pageable);
}

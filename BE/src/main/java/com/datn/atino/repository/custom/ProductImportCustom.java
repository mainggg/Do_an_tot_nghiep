package com.datn.atino.repository.custom;

import com.datn.atino.domain.ProductImportEntity;
import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductImportCustom {

    Page<ProductImportEntity> getAll(PageFilterInput<ProductImportEntity> input, Pageable pageable);

}

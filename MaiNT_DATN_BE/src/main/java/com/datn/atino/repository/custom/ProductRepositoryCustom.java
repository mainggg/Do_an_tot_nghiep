package com.datn.atino.repository.custom;

import com.datn.atino.domain.ProductEntity;
import com.datn.atino.service.dto.ProductDTO;
import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepositoryCustom {

    Page<ProductEntity> getAll(PageFilterInput<ProductDTO> input, Pageable pageable);

}

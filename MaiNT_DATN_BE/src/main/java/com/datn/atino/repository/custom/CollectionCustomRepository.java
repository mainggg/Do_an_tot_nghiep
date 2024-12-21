package com.datn.atino.repository.custom;

import com.datn.atino.domain.CollectionEntity;
import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CollectionCustomRepository {

    Page<CollectionEntity> getAll(PageFilterInput<CollectionEntity> input, Pageable pageable);

}

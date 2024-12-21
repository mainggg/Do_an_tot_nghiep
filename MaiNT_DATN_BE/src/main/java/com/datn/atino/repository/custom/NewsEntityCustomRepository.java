package com.datn.atino.repository.custom;

import com.datn.atino.domain.NewsEntity;
import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NewsEntityCustomRepository {

    Page<NewsEntity> getAll(PageFilterInput<NewsEntity> input, Pageable pageable);

}

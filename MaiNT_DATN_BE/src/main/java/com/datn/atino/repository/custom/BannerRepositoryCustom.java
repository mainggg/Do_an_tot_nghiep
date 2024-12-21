package com.datn.atino.repository.custom;

import com.datn.atino.domain.BannerEntity;
import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BannerRepositoryCustom {

    Page<BannerEntity> getAll(PageFilterInput<BannerEntity> input, Pageable pageable, boolean isUser);

}

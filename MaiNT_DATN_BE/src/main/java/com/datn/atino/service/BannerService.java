package com.datn.atino.service;


import com.datn.atino.domain.BannerEntity;
import com.datn.atino.repository.BannerRepository;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import com.datn.atino.service.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BannerService {

    private final BannerRepository bannerRepository;

    public BannerService(BannerRepository bannerRepository) {
        this.bannerRepository = bannerRepository;
    }

    public PageResponse<List<BannerEntity>> getAll(PageFilterInput<BannerEntity> input, boolean isUser){
        Pageable pageable = Constants.getPageable(input);
        Page<BannerEntity> bannerEntities = bannerRepository.getAll(input, pageable, isUser);
        return new PageResponse<List<BannerEntity>>().success().data(bannerEntities.getContent()).dataCount(bannerEntities.getTotalElements());
    }

    public void saveUpdateBanner(BannerEntity bannerEntity){
        bannerRepository.save(bannerEntity);
    }

    public void changeVisible(Integer id){
        BannerEntity bannerEntity = bannerRepository.findByIdAndIsActiveTrue(id);
        bannerEntity.setVisible(!bannerEntity.getVisible());
        bannerRepository.save(bannerEntity);
    }

    public void deleteBanner(Integer id){
        BannerEntity bannerEntity = bannerRepository.findByIdAndIsActiveTrue(id);
        bannerEntity.setActive(false);
        bannerRepository.save(bannerEntity);
    }


}

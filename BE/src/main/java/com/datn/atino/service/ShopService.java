package com.datn.atino.service;


import com.datn.atino.domain.ShopEntity;
import com.datn.atino.repository.ShopRepository;
import com.datn.atino.service.exception.CustomException;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.PageResponse;
import com.datn.atino.service.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShopService {

    private final ShopRepository shopRepository;

    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public PageResponse<List<ShopEntity>> getAll(PageFilterInput<ShopEntity> input){
        Pageable pageable = Constants.getPageable(input);
        Page<ShopEntity> shopEntities = shopRepository.getAll(input, pageable);
        return new PageResponse<List<ShopEntity>>().success().data(shopEntities.getContent()).dataCount(shopEntities.getTotalElements());
    }

    @Transactional
    public void saveShop(ShopEntity shopEntity){
        shopRepository.save(shopEntity);
    }

    @Transactional
    public void updateShop(ShopEntity shopEntity){
        shopRepository.save(shopEntity);
    }
    @Transactional
    public void deleteShop(Integer id){
        ShopEntity shopEntity = shopRepository.findByIdAndIsActiveTrue(id);
        if(shopEntity == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tìm thấy bản ghi");
        shopEntity.setActive(false);
        shopRepository.save(shopEntity);
    }


}

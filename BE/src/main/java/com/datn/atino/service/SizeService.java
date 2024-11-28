package com.datn.atino.service;

import com.datn.atino.domain.SizeEntity;
import com.datn.atino.repository.SizeRepository;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.PageResponse;
import com.datn.atino.service.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeService {

    private final SizeRepository sizeRepository;

    public SizeService(SizeRepository sizeRepository) {
        this.sizeRepository = sizeRepository;
    }

    public PageResponse<List<SizeEntity>> getAll(PageFilterInput<SizeEntity> input){
        Pageable pageable = Constants.getPageable(input);
        Page<SizeEntity> sizeEntities = sizeRepository.getAll(input, pageable);
        return new PageResponse<List<SizeEntity>>().success().dataCount(sizeEntities.getTotalElements()).data(sizeEntities.getContent());
    }

    public void saveSize(SizeEntity input){
        sizeRepository.save(input);
    }

    public void updateSize(SizeEntity input){
        sizeRepository.save(input);
    }

    public void delete(Integer id){
        SizeEntity sizeEntity = sizeRepository.findByIdAndIsActiveTrue(id);
        sizeEntity.setActive(false);
        sizeRepository.save(sizeEntity);
    }

}

package com.datn.atino.service;


import com.datn.atino.domain.ColorEntity;
import com.datn.atino.domain.SizeEntity;
import com.datn.atino.repository.ColorRepository;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.PageResponse;
import com.datn.atino.service.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorService {

    private final ColorRepository colorRepository;

    public ColorService(ColorRepository colorRepository) {
        this.colorRepository = colorRepository;
    }

    public PageResponse<List<ColorEntity>> getAll(PageFilterInput<ColorEntity> input){
        Pageable pageable = Constants.getPageable(input);
        Page<ColorEntity> sizeEntities = colorRepository.getAll(input, pageable);
        return new PageResponse<List<ColorEntity>>().success().dataCount(sizeEntities.getTotalElements()).data(sizeEntities.getContent());
    }

    public void saveColor(ColorEntity input){
        colorRepository.save(input);
    }

    public void updateColor(ColorEntity input){
        colorRepository.save(input);
    }

    public void delete(Integer id){
        ColorEntity colorEntity = colorRepository.findByIdAndIsActiveTrue(id);
        colorEntity.setActive(false);
        colorRepository.save(colorEntity);
    }
}

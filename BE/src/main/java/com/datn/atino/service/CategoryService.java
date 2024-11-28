package com.datn.atino.service;


import com.datn.atino.domain.CategoryEntity;
import com.datn.atino.repository.CategoryRepository;
import com.datn.atino.service.exception.CustomException;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import com.datn.atino.service.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryEntity> getAllUser(){
        List<CategoryEntity> result = categoryRepository.findAll();
        for (CategoryEntity category : result){
            category.setCategoryChild(categoryRepository.findByParent(category.getId()));
        }
        return result;
    }

    public PageResponse<List<CategoryEntity>> getAll(PageFilterInput<CategoryEntity> input){
        Page<CategoryEntity> categoryEntities = categoryRepository.getAll(input, Constants.getPageable(input), false);
        return new PageResponse<List<CategoryEntity>>().success().data(categoryEntities.getContent()).dataCount(categoryEntities.getTotalElements());
    }

    public PageResponse<List<CategoryEntity>> getAllParent(PageFilterInput<CategoryEntity> input){
        Page<CategoryEntity> categoryEntities = categoryRepository.getAll(input, Constants.getPageable(input), true);
        return new PageResponse<List<CategoryEntity>>().success().data(categoryEntities.getContent()).dataCount(categoryEntities.getTotalElements());
    }


    public CommonResponse saveCategory(CategoryEntity categoryEntity){
        CategoryEntity category = categoryRepository.findByCategoryNameAndIsActiveTrue(categoryEntity.getCategoryName());
        if(category != null) throw new CustomException(HttpStatus.CONFLICT, "Đã tồn tại sản phẩm có tên: " + categoryEntity.getCategoryName());
        categoryRepository.save(categoryEntity);
        return new CommonResponse().success();
    }

    public CommonResponse updateCategory(Integer id, CategoryEntity categoryEntity){
        CategoryEntity category = categoryRepository.findByCategoryNameAndIsActiveTrue(categoryEntity.getCategoryName());
        if(category != null && !category.getId().equals(id)) throw new CustomException(HttpStatus.CONFLICT, "Đã tồn tại sản phẩm có tên: " + categoryEntity.getCategoryName());
        categoryRepository.save(categoryEntity);
        return new CommonResponse().success();
    }

    public CommonResponse deleteCategory(Integer id){
        CategoryEntity category = categoryRepository.findByIdAndIsActiveTrue(id);
        category.setActive(false);
        categoryRepository.save(category);
        return new CommonResponse().success();
    }


}

package com.datn.atino.web;


import com.datn.atino.domain.CategoryEntity;
import com.datn.atino.service.CategoryService;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class CategoryResource {
    private final CategoryService categoryService;

    public CategoryResource(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping("/category")
    public CommonResponse getAllUser(){
        return new CommonResponse().success().data(categoryService.getAllUser());
    }

    @PostMapping("/admin/category")
    public PageResponse<List<CategoryEntity>> getAll(@RequestBody PageFilterInput<CategoryEntity> input){
        return categoryService.getAll(input);
    }

    @PostMapping("/admin/category/parent")
    public PageResponse<List<CategoryEntity>> getAllParent(@RequestBody PageFilterInput<CategoryEntity> input){
        return categoryService.getAllParent(input);
    }

    @PostMapping("/admin/category/save")
    public CommonResponse saveCategory(@RequestBody CategoryEntity category){
        return categoryService.saveCategory(category);
    }

    @PutMapping("/admin/category/update/{id}")
    public CommonResponse updateCategory(@PathVariable Integer id, @RequestBody CategoryEntity category){
        return categoryService.updateCategory(id, category);
    }

    @DeleteMapping("/admin/category/delete/{id}")
    public CommonResponse deleteCategory(@PathVariable Integer id){
        return categoryService.deleteCategory(id);
    }

}

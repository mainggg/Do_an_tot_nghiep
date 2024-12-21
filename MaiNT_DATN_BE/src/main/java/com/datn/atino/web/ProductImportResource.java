package com.datn.atino.web;

import com.datn.atino.domain.ProductImportEntity;
import com.datn.atino.service.ProductImportService;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductImportResource {

    private final ProductImportService productImportService;

    public ProductImportResource(ProductImportService productImportService) {
        this.productImportService = productImportService;
    }


    @PostMapping("/admin/product-import")
    public PageResponse<List<ProductImportEntity>> getAll(@RequestBody PageFilterInput<ProductImportEntity> input){
        return productImportService.getAll(input);
    }

    @PostMapping("/admin/product-import/save")
    public CommonResponse saveProductImport(@RequestBody ProductImportEntity input){
        productImportService.saveProductImport(input);
        return new CommonResponse().success();
    }

    @PutMapping("/admin/product-import/update/{id}")
    public CommonResponse updateProductImport(@PathVariable Integer id, @RequestBody ProductImportEntity input){
        productImportService.updateProductImport(id, input);
        return new CommonResponse().success();
    }

    @DeleteMapping("/admin/product-import/delete/{id}")
    public CommonResponse deleteProductImport(@PathVariable Integer id){
        productImportService.deleteProductImport(id);
        return new CommonResponse().success();
    }

}

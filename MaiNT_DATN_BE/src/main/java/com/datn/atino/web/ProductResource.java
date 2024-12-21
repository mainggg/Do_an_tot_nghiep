package com.datn.atino.web;


import com.datn.atino.service.ProductService;
import com.datn.atino.service.dto.ProductDTO;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductResource {

    private final ProductService productService;

    public ProductResource(ProductService productService) {
        this.productService = productService;
    }


    @PostMapping("/product")
    public PageResponse<List<ProductDTO>> getAllUser(@RequestBody PageFilterInput<ProductDTO> input){
        return productService.getAll(input);
    }

    @GetMapping("/product/{id}")
    public CommonResponse<ProductDTO> getDetailUser(@PathVariable Integer id){
        return new CommonResponse<>().success().data(productService.getDetail(id));
    }

    @PostMapping("/admin/product")
    public PageResponse<List<ProductDTO>> getAll(@RequestBody PageFilterInput<ProductDTO> input){
        return productService.getAll(input);
    }

    @GetMapping("/admin/product/{id}")
    public CommonResponse<ProductDTO> getDetail(@PathVariable Integer id){
        return new CommonResponse<>().success().data(productService.getDetail(id));
    }

    @PostMapping("/admin/product/save")
    public CommonResponse saveProduct(@RequestBody ProductDTO input){
        productService.saveProduct(input);
        return new CommonResponse().success();
    }

    @PutMapping("/admin/product/update/{id}")
    public CommonResponse updateProduct(@PathVariable Integer id, @RequestBody ProductDTO input){
        productService.updateProduct(id, input);
        return new CommonResponse().success();
    }

    @DeleteMapping("/admin/product/delete/{id}")
    public CommonResponse deleteProduct(@PathVariable Integer id){
        productService.deleteProduct(id);
        return new CommonResponse().success();
    }


}

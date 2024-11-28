package com.datn.atino.web;


import com.datn.atino.domain.ShopEntity;
import com.datn.atino.service.ShopService;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ShopResource {

    private final ShopService shopService;

    public ShopResource(ShopService shopService) {
        this.shopService = shopService;
    }

    @PostMapping("/admin/shop")
    public PageResponse<List<ShopEntity>> getAll(@RequestBody PageFilterInput<ShopEntity> input){
        return shopService.getAll(input);
    }

    @PostMapping("/shop")
    public PageResponse<List<ShopEntity>> getAllUser(@RequestBody PageFilterInput<ShopEntity> input){
        return shopService.getAll(input);
    }

    @PostMapping("/admin/shop/save")
    public CommonResponse saveShop(@RequestBody ShopEntity shopEntity){
        shopService.saveShop(shopEntity);
        return new CommonResponse().success();
    }

    @PutMapping("/admin/shop/update")
    public CommonResponse updateShop(@RequestBody ShopEntity shopEntity){
        shopService.updateShop(shopEntity);
        return new CommonResponse().success();
    }

    @DeleteMapping("/admin/shop/delete/{id}")
    public CommonResponse deleteShop(@PathVariable Integer id){
        shopService.deleteShop(id);
        return new CommonResponse().success();
    }

}

package com.datn.atino.web;

import com.datn.atino.domain.BannerEntity;
import com.datn.atino.service.BannerService;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BannerResource {

    private final BannerService bannerService;

    public BannerResource(BannerService bannerService) {
        this.bannerService = bannerService;
    }


    @PostMapping("/banner")
    private PageResponse<List<BannerEntity>> getBannerUser(@RequestBody PageFilterInput<BannerEntity> input){
        return bannerService.getAll(input, true);
    }

    @PostMapping("/admin/banner")
    public PageResponse<List<BannerEntity>> getAll(@RequestBody PageFilterInput<BannerEntity> input){
        return bannerService.getAll(input, false);
    }

    @PostMapping("/admin/banner/save")
    public CommonResponse saveBanner(@RequestBody BannerEntity bannerEntity){
        bannerService.saveUpdateBanner(bannerEntity);
        return new CommonResponse().success();
    }

    @GetMapping("/admin/banner/{id}/change")
    public CommonResponse changeBanner(@PathVariable Integer id){
        bannerService.changeVisible(id);
        return new CommonResponse().success();
    }

    @DeleteMapping("/admin/banner/delete/{id}")
    public CommonResponse deleteBanner(@PathVariable Integer id){
        bannerService.deleteBanner(id);
        return new CommonResponse().success();
    }

}

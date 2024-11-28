package com.datn.atino.web;


import com.datn.atino.domain.SizeEntity;
import com.datn.atino.service.SizeService;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SizeResource {

    private final SizeService sizeService;

    public SizeResource(SizeService sizeService) {
        this.sizeService = sizeService;
    }

    @PostMapping("/admin/size")
    public PageResponse<List<SizeEntity>> getAll(@RequestBody PageFilterInput<SizeEntity> input){
        return sizeService.getAll(input);
    }

    @PostMapping("/admin/size/save")
    public CommonResponse saveSize(@RequestBody SizeEntity input){
        sizeService.saveSize(input);
        return new CommonResponse().success();
    }

    @PutMapping("/admin/size/update")
    public CommonResponse updateSize(@RequestBody SizeEntity input){
        sizeService.updateSize(input);
        return new CommonResponse().success();
    }

    @DeleteMapping("/admin/size/delete/{id}")
    public CommonResponse deleteSize(@PathVariable Integer id){
        sizeService.delete(id);
        return new CommonResponse().success();
    }

}

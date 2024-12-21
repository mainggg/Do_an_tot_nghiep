package com.datn.atino.web;


import com.datn.atino.domain.ColorEntity;
import com.datn.atino.domain.SizeEntity;
import com.datn.atino.service.ColorService;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ColorResource {
    private final ColorService colorService;

    public ColorResource(ColorService colorService) {
        this.colorService = colorService;
    }

    @PostMapping("/admin/color")
    public PageResponse<List<ColorEntity>> getAll(@RequestBody PageFilterInput<ColorEntity> input){
        return colorService.getAll(input);
    }

    @PostMapping("/admin/color/save")
    public CommonResponse saveSize(@RequestBody ColorEntity input){
        colorService.saveColor(input);
        return new CommonResponse().success();
    }

    @PutMapping("/admin/color/update")
    public CommonResponse updateSize(@RequestBody ColorEntity input){
        colorService.updateColor(input);
        return new CommonResponse().success();
    }

    @DeleteMapping("/admin/color/delete/{id}")
    public CommonResponse deleteSize(@PathVariable Integer id){
        colorService.delete(id);
        return new CommonResponse().success();
    }
}

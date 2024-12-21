package com.datn.atino.web;


import com.datn.atino.domain.CollectionEntity;
import com.datn.atino.service.CollectionService;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CollectionResource {

    private final CollectionService collectionService;

    public CollectionResource(CollectionService collectionService) {
        this.collectionService = collectionService;
    }


    @PostMapping("/collection")
    public PageResponse<List<CollectionEntity>> getAllUser(@RequestBody PageFilterInput<CollectionEntity> input){
        return collectionService.getAll(input);
    }

    @GetMapping("/collection/{id}")
    public CommonResponse<CollectionEntity> getDetailCollection(@PathVariable Integer id){
        return new CommonResponse<>().success().data(collectionService.getDetail(id));
    }

    @PostMapping("/admin/collection")
    public PageResponse<List<CollectionEntity>> getAll(@RequestBody PageFilterInput<CollectionEntity> input){
        return collectionService.getAll(input);
    }

    @PostMapping("/admin/collection/save")
    public CommonResponse saveCollection(@RequestBody CollectionEntity input){
        collectionService.saveCollection(input);
        return new CommonResponse().success();
    }

    @PutMapping("/admin/collection/update/{id}")
    public CommonResponse updateCollection(@PathVariable Integer id, @RequestBody CollectionEntity input){
        collectionService.updateCollection(id, input);
        return new CommonResponse().success();
    }

    @DeleteMapping("/admin/collection/{id}")
    public CommonResponse deleteCollection(@PathVariable Integer id){
        collectionService.deleteCollection(id);
        return new CommonResponse().success();
    }




}

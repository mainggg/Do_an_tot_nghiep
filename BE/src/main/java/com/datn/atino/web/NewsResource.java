package com.datn.atino.web;


import com.datn.atino.domain.NewsEntity;
import com.datn.atino.service.NewsService;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class NewsResource {

    private final NewsService newsService;


    public NewsResource(NewsService newsService) {
        this.newsService = newsService;
    }


    @GetMapping("/news")
    public CommonResponse getNewUser(){
        return new CommonResponse().success().data(newsService.getNewsUser());
    }

    @PostMapping("/admin/news")
    public PageResponse<List<NewsEntity>> getAll(@RequestBody PageFilterInput<NewsEntity> input){
        return newsService.getAll(input);
    }

    @GetMapping("/admin/news/{id}")
    public CommonResponse getDetail(@PathVariable Integer id){
        return new CommonResponse().success().data(newsService.getDetail(id));
    }

    @GetMapping("/news/{id}")
    public CommonResponse getDetailUser(@PathVariable Integer id){
        return new CommonResponse().success().data(newsService.getDetail(id));
    }

    @PostMapping("/admin/news/save")
    public CommonResponse saveNews(@RequestBody NewsEntity input){
        newsService.saveNes(input);
        return new CommonResponse().success();
    }

    @PutMapping("/admin/news/update/{id}")
    public CommonResponse updateNews(@PathVariable Integer id, @RequestBody NewsEntity input){
        newsService.updateNews(id, input);
        return new CommonResponse().success();
    }


    @DeleteMapping("/admin/news/delete/{id}")
    public CommonResponse deleteNews(@PathVariable Integer id){
        newsService.deleteNews(id);
        return new CommonResponse().success();
    }

    @GetMapping("/admin/news/{id}/change-visible")
    public CommonResponse changeVisible(@PathVariable Integer id){
        newsService.changeVisible(id);
        return new CommonResponse().success();
    }


}

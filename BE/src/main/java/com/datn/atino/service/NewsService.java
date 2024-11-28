package com.datn.atino.service;

import com.datn.atino.domain.NewsEntity;
import com.datn.atino.repository.NewsEntityRepository;
import com.datn.atino.service.exception.CustomException;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.PageResponse;
import com.datn.atino.service.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsService {

    private final NewsEntityRepository newsEntityRepository;

    public NewsService(NewsEntityRepository newsEntityRepository) {
        this.newsEntityRepository = newsEntityRepository;
    }

    public List<NewsEntity> getNewsUser(){
        return newsEntityRepository.getAllNewForUser();
    }

    public PageResponse<List<NewsEntity>> getAll(PageFilterInput<NewsEntity> input){
        Pageable pageable = Constants.getPageable(input);
        Page<NewsEntity> newsEntities = newsEntityRepository.getAll(input, pageable);
        return new PageResponse<List<NewsEntity>>().success().dataCount(newsEntities.getTotalElements()).data(newsEntities.getContent());
    }

    public NewsEntity getDetail(Integer id){
        NewsEntity newsEntity = newsEntityRepository.findByIdAndIsActiveTrue(id);
        return newsEntity;
    }


    public void saveNes(NewsEntity input){
        newsEntityRepository.save(input);
    }

    public void updateNews(Integer id, NewsEntity input){
        NewsEntity newsEntity = newsEntityRepository.findByIdAndIsActiveTrue(id);
        if(newsEntity == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tìm thấy bản ghi");
        newsEntityRepository.save(input);
    }

    public void deleteNews(Integer id){
        NewsEntity newsEntity = newsEntityRepository.findByIdAndIsActiveTrue(id);
        if(newsEntity == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tìm thấy bản ghi");
        newsEntity.setActive(false);
        newsEntityRepository.save(newsEntity);
    }

    public void changeVisible(Integer id){
        NewsEntity newsEntity = newsEntityRepository.findByIdAndIsActiveTrue(id);
        if(newsEntity == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tìm thấy bản ghi");
        newsEntity.setVisible(!newsEntity.getVisible());
        newsEntityRepository.save(newsEntity);
    }


}

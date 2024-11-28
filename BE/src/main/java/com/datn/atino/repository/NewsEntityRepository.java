package com.datn.atino.repository;

import com.datn.atino.domain.NewsEntity;
import com.datn.atino.repository.custom.NewsEntityCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NewsEntityRepository extends JpaRepository<NewsEntity, Integer>, NewsEntityCustomRepository {

    NewsEntity findByIdAndIsActiveTrue(Integer id);

    @Query("select new com.datn.atino.domain.NewsEntity(n.id, n.title, n.avatar, n.author, n.briefDescription, n.isVisible, n.createdAt, n.updatedAt) from NewsEntity n where n.isActive = true and n.isVisible = true" +
            " order by n.createdAt desc ")
    List<NewsEntity> getAllNewForUser();

}

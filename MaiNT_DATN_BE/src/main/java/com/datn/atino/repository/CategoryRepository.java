package com.datn.atino.repository;

import com.datn.atino.domain.CategoryEntity;
import com.datn.atino.repository.custom.CategoryCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer>, CategoryCustomRepository {
    CategoryEntity findByIdAndIsActiveTrue (Integer id);

    CategoryEntity findByCategoryNameAndIsActiveTrue(String categoryName);

    @Query("select c from CategoryEntity c where c.isActive = true and c.parentId is null")
    List<CategoryEntity> findAll();

    @Query("select c from CategoryEntity c where c.isActive = true and c.parentId = :id")
    List<CategoryEntity> findByParent(@Param("id") Integer id);
}

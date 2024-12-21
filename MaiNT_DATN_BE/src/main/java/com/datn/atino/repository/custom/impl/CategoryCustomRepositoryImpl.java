package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.CategoryEntity;
import com.datn.atino.domain.QCategoryEntity;
import com.datn.atino.repository.custom.CategoryCustomRepository;
import com.datn.atino.service.model.PageFilterInput;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

public class CategoryCustomRepositoryImpl implements CategoryCustomRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<CategoryEntity> getAll(PageFilterInput<CategoryEntity> input, Pageable pageable, boolean isParent) {
        QCategoryEntity qCategoryEntity = QCategoryEntity.categoryEntity;
        QCategoryEntity qCategoryEntityParent = new QCategoryEntity("parentId");
        JPAQuery<CategoryEntity> query = new JPAQueryFactory(entityManager)
                .select(Projections.constructor(CategoryEntity.class, qCategoryEntity.id, qCategoryEntity.categoryName, qCategoryEntity.parentId, qCategoryEntity.isVisible, qCategoryEntityParent))
                .from(qCategoryEntity)
                .leftJoin(qCategoryEntityParent)
                .on(qCategoryEntity.parentId.eq(qCategoryEntityParent.id).and(qCategoryEntityParent.isActive.isTrue()));

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qCategoryEntity.isActive.isTrue());

        CategoryEntity filter = input.getFilter();

        if(isParent){
            booleanBuilder.and(qCategoryEntity.parentId.isNull());
        } else {
            booleanBuilder.and(qCategoryEntity.parentId.isNotNull());
        }

        if(StringUtils.hasText(input.getCommon())){
            booleanBuilder.and(
                    qCategoryEntity.categoryName.containsIgnoreCase(input.getCommon())
            );
        }

        if(StringUtils.hasText(filter.getCategoryName())){
            booleanBuilder.and(qCategoryEntity.categoryName.containsIgnoreCase(filter.getCategoryName()));
        }

        if(filter.getParentId() != null){
            booleanBuilder.and(qCategoryEntity.parentId.eq(filter.getParentId()));
        }

        if(!CollectionUtils.isEmpty(filter.getUpdatedAtSearch())){
            booleanBuilder.and(qCategoryEntity.updatedAt.goe(filter.getUpdatedAtSearch().get(0)));
            booleanBuilder.and(qCategoryEntity.updatedAt.loe(filter.getUpdatedAtSearch().get(1)));
        }

        if (!StringUtils.isEmpty(input.getSortProperty())) {
            Path<Object> fieldPath = Expressions.path(Object.class, qCategoryEntity, input.getSortProperty());
            query.orderBy(new OrderSpecifier(input.getSortOrder(), fieldPath));
        }

        query.where(booleanBuilder);
        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

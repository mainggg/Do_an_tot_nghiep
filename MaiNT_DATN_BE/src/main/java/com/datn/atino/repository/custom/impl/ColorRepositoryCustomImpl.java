package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.CategoryEntity;
import com.datn.atino.domain.ColorEntity;
import com.datn.atino.domain.QCategoryEntity;
import com.datn.atino.domain.QColorEntity;
import com.datn.atino.repository.custom.ColorRepositoryCustom;
import com.datn.atino.service.model.PageFilterInput;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

public class ColorRepositoryCustomImpl implements ColorRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public Page<ColorEntity> getAll(PageFilterInput<ColorEntity> input, Pageable pageable) {
        ColorEntity filter = input.getFilter();
        QColorEntity qColorEntity = QColorEntity.colorEntity;
        JPAQuery<ColorEntity> query = new JPAQueryFactory(entityManager)
                .selectFrom(qColorEntity);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qColorEntity.isActive.isTrue());
        if(StringUtils.hasText(input.getCommon())){
            booleanBuilder.and(qColorEntity.color.containsIgnoreCase(input.getCommon()));
        }

        if(StringUtils.hasText(filter.getColor())){
            booleanBuilder.and(qColorEntity.color.containsIgnoreCase(filter.getColor()));
        }

        if (!StringUtils.isEmpty(input.getSortProperty())) {
            Path<Object> fieldPath = Expressions.path(Object.class, qColorEntity, input.getSortProperty());
            query.orderBy(new OrderSpecifier(input.getSortOrder(), fieldPath));
        }

        if(pageable.isPaged()){
            query.offset(pageable.getOffset()).limit(pageable.getPageSize());
        }

        query.where(booleanBuilder);

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

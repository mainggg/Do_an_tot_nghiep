package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.ColorEntity;
import com.datn.atino.domain.QColorEntity;
import com.datn.atino.domain.QSizeEntity;
import com.datn.atino.domain.SizeEntity;
import com.datn.atino.repository.custom.SizeRepositoryCustom;
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

public class SizeRepositoryCustomImpl implements SizeRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<SizeEntity> getAll(PageFilterInput<SizeEntity> input, Pageable pageable) {
        SizeEntity filter = input.getFilter();
        QSizeEntity qSizeEntity = QSizeEntity.sizeEntity;
        JPAQuery<SizeEntity> query = new JPAQueryFactory(entityManager)
                .selectFrom(qSizeEntity);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qSizeEntity.isActive.isTrue());
        if(StringUtils.hasText(input.getCommon())){
            booleanBuilder.and(qSizeEntity.sizeName.containsIgnoreCase(input.getCommon()));
        }

        if(StringUtils.hasText(filter.getSizeName())){
            booleanBuilder.and(qSizeEntity.sizeName.containsIgnoreCase(filter.getSizeName()));
        }

        if (!StringUtils.isEmpty(input.getSortProperty())) {
            Path<Object> fieldPath = Expressions.path(Object.class, qSizeEntity, input.getSortProperty());
            query.orderBy(new OrderSpecifier(input.getSortOrder(), fieldPath));
        }

        query.where(booleanBuilder);

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

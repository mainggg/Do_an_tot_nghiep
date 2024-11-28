package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.ProductImportEntity;
import com.datn.atino.domain.QProductEntity;
import com.datn.atino.domain.QProductImportEntity;
import com.datn.atino.repository.custom.ProductImportCustom;
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
import org.springframework.util.StringUtils;

public class ProductImportCustomImpl implements ProductImportCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<ProductImportEntity> getAll(PageFilterInput<ProductImportEntity> input, Pageable pageable) {
        ProductImportEntity filter = input.getFilter();
        QProductImportEntity qProductImportEntity = QProductImportEntity.productImportEntity;
        QProductEntity qProductEntity = QProductEntity.productEntity;
        JPAQuery<ProductImportEntity> query = new JPAQueryFactory(entityManager)
                .select(Projections.constructor(ProductImportEntity.class,
                        qProductImportEntity.id, qProductEntity, qProductImportEntity.size,
                        qProductImportEntity.color, qProductImportEntity.quantityImport, qProductImportEntity.priceImport, qProductImportEntity.updatedAt
                ))
                .from(qProductImportEntity)
                .leftJoin(qProductEntity)
                .on(qProductImportEntity.productEntity.id.eq(qProductEntity.id));

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qProductImportEntity.isActive.isTrue());

        if(StringUtils.hasText(input.getCommon())){
            booleanBuilder.and(
                    qProductImportEntity.productEntity.productName.containsIgnoreCase(input.getCommon())
                            .or(qProductImportEntity.size.containsIgnoreCase(input.getCommon()))
                            .or(qProductImportEntity.color.containsIgnoreCase(input.getCommon()))
            );
        }

        if(filter.getProductEntity() != null && StringUtils.hasText(filter.getProductEntity().getProductName())){
            booleanBuilder.and(qProductImportEntity.productEntity.productName.containsIgnoreCase(filter.getProductEntity().getProductName()));
        }

        if(StringUtils.hasText(filter.getSize())){
            booleanBuilder.and(qProductImportEntity.size.eq(filter.getSize()));
        }

        if(StringUtils.hasText(filter.getColor())){
            booleanBuilder.and(qProductImportEntity.color.eq(filter.getColor()));
        }

        if(filter.getQuantityImport() != null){
            booleanBuilder.and(qProductImportEntity.quantityImport.like("%" + filter.getQuantityImport() + "%"));
        }


        if (!StringUtils.isEmpty(input.getSortProperty())) {
            Path<Object> fieldPath = Expressions.path(Object.class, qProductImportEntity, input.getSortProperty());
            query.orderBy(new OrderSpecifier(input.getSortOrder(), fieldPath));
        }

        query.where(booleanBuilder);

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

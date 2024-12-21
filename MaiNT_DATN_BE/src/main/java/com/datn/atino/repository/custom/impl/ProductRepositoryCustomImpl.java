package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.ProductEntity;
import com.datn.atino.domain.QProductEntity;
import com.datn.atino.repository.custom.ProductRepositoryCustom;
import com.datn.atino.service.dto.ProductDTO;
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

public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<ProductEntity> getAll(PageFilterInput<ProductDTO> input, Pageable pageable) {
        ProductDTO filter = input.getFilter();
        QProductEntity qProductEntity = QProductEntity.productEntity;
        JPAQuery<ProductEntity> query = new JPAQueryFactory(entityManager)
                .selectFrom(qProductEntity);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qProductEntity.isActive.isTrue());

        if(StringUtils.hasText(input.getCommon())){
            booleanBuilder.and(
                    qProductEntity.productName.containsIgnoreCase(input.getCommon())
                            .or(qProductEntity.productForm.containsIgnoreCase(input.getCommon()))
                            .or(qProductEntity.description.containsIgnoreCase(input.getCommon()))
            );
        }

        if(StringUtils.hasText(filter.getProductName())){
            booleanBuilder.and(qProductEntity.productName.containsIgnoreCase(filter.getProductName()));
        }

        if(StringUtils.hasText(filter.getProductForm())){
            booleanBuilder.and(qProductEntity.productForm.containsIgnoreCase(filter.getProductForm()));
        }

        if(StringUtils.hasText(filter.getDescription())){
            booleanBuilder.and(qProductEntity.description.containsIgnoreCase(filter.getDescription()));
        }

        if(filter.getPrice() != null){
            booleanBuilder.and(qProductEntity.price.like("%" + filter.getPrice() + "%"));
        }

        if(filter.getQuantity() != null){
            booleanBuilder.and(qProductEntity.quantity.like("%" + filter.getQuantity() + "%"));
        }

        if(filter.getTotalQuantityImported() != null){
            booleanBuilder.and(qProductEntity.totalQuantityImported.like("%" + filter.getTotalQuantityImported() + "%"));
        }

        if(filter.getTotalQuantitySales() != null){
            booleanBuilder.and(qProductEntity.totalQuantitySales.like("%" + filter.getTotalQuantitySales() + "%"));
        }

        if(filter.getSales() != null){
            booleanBuilder.and(qProductEntity.sales.like("%" + filter.getSales() + "%"));
        }

        if(StringUtils.hasText(filter.getProductMaterial())){
            booleanBuilder.and(qProductEntity.productMaterial.containsIgnoreCase(filter.getProductMaterial()));
        }

        if(filter.getCategory() != null){
            booleanBuilder.and(qProductEntity.categoryEntity.id.eq(filter.getCategory().getId()));
        }

        if(pageable.isPaged()){
            query.offset(pageable.getOffset()).limit(pageable.getPageSize());
        }

        if (!StringUtils.isEmpty(input.getSortProperty())) {
            Path<Object> fieldPath = Expressions.path(Object.class, qProductEntity, input.getSortProperty());
            query.orderBy(new OrderSpecifier(input.getSortOrder(), fieldPath));
        }

        query.where(booleanBuilder);

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

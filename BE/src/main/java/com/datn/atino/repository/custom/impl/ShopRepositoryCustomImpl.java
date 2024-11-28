package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.QShopEntity;
import com.datn.atino.domain.ShopEntity;
import com.datn.atino.repository.custom.ShopRepositoryCustom;
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
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

public class ShopRepositoryCustomImpl implements ShopRepositoryCustom {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<ShopEntity> getAll(PageFilterInput<ShopEntity> input, Pageable pageable) {
        ShopEntity filter = input.getFilter();
        QShopEntity qShopEntity = QShopEntity.shopEntity;

        JPAQuery<ShopEntity> query = new JPAQueryFactory(entityManager)
                .selectFrom(qShopEntity);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qShopEntity.isActive.isTrue());

        if(StringUtils.hasText(input.getCommon())){
            booleanBuilder.and(
                    qShopEntity.shopName.containsIgnoreCase(input.getCommon())
                            .or(qShopEntity.address.containsIgnoreCase(input.getCommon()))
                            .or(qShopEntity.phoneNumber.containsIgnoreCase(input.getCommon()))
            );
        }

        if(StringUtils.hasText(filter.getShopName())){
            booleanBuilder.and(qShopEntity.shopName.containsIgnoreCase(filter.getShopName()));
        }

        if(StringUtils.hasText(filter.getAddress())){
            booleanBuilder.and(qShopEntity.address.containsIgnoreCase(filter.getAddress()));
        }

        if(StringUtils.hasText(filter.getPhoneNumber())){
            booleanBuilder.and(qShopEntity.phoneNumber.containsIgnoreCase(filter.getPhoneNumber()));
        }

        if(!CollectionUtils.isEmpty(filter.getUpdatedAtSearch())){
            booleanBuilder
                    .and(qShopEntity.updatedAt.goe(filter.getUpdatedAtSearch().get(0)))
                    .and(qShopEntity.updatedAt.loe(filter.getUpdatedAtSearch().get(1)));
        }

        if (!StringUtils.isEmpty(input.getSortProperty())) {
            Path<Object> fieldPath = Expressions.path(Object.class, qShopEntity, input.getSortProperty());
            query.orderBy(new OrderSpecifier(input.getSortOrder(), fieldPath));
        }

        query.where(booleanBuilder);

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

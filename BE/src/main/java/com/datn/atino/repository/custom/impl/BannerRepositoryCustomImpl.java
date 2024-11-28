package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.BannerEntity;
import com.datn.atino.domain.QBannerEntity;
import com.datn.atino.repository.custom.BannerRepositoryCustom;
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

public class BannerRepositoryCustomImpl implements BannerRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<BannerEntity> getAll(PageFilterInput<BannerEntity> input, Pageable pageable, boolean isUser) {
        BannerEntity filter = input.getFilter();
        QBannerEntity qBannerEntity = QBannerEntity.bannerEntity;

        JPAQuery<BannerEntity> query = new JPAQueryFactory(entityManager)
                .selectFrom(qBannerEntity);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qBannerEntity.isActive.isTrue());

        if(isUser){
            booleanBuilder.and(qBannerEntity.isVisible.isTrue());
        }

        if (!StringUtils.isEmpty(input.getSortProperty())) {
            Path<Object> fieldPath = Expressions.path(Object.class, qBannerEntity, input.getSortProperty());
            query.orderBy(new OrderSpecifier(input.getSortOrder(), fieldPath));
        }

        query.where(booleanBuilder);

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

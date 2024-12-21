package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.NewsEntity;
import com.datn.atino.domain.QNewsEntity;
import com.datn.atino.repository.custom.NewsEntityCustomRepository;
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

public class NewsEntityCustomRepositoryImpl implements NewsEntityCustomRepository
{

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<NewsEntity> getAll(PageFilterInput<NewsEntity> input, Pageable pageable) {
        NewsEntity filter = input.getFilter();
        QNewsEntity qNewsEntity = QNewsEntity.newsEntity;
        JPAQuery<NewsEntity> query = new JPAQueryFactory(entityManager)
                .select(Projections.constructor(NewsEntity.class, qNewsEntity.id,
                        qNewsEntity.title, qNewsEntity.avatar, qNewsEntity.author,
                        qNewsEntity.briefDescription,
                        qNewsEntity.isVisible,
                        qNewsEntity.createdAt, qNewsEntity.updatedAt))
                .from(qNewsEntity);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qNewsEntity.isActive.isTrue());
        if(StringUtils.hasText(filter.getTitle())){
            booleanBuilder.and(qNewsEntity.title.containsIgnoreCase(filter.getTitle()));
        }

        if(StringUtils.hasText(filter.getAuthor())){
            booleanBuilder.and(qNewsEntity.author.containsIgnoreCase(filter.getAuthor()));
        }

        if(StringUtils.hasText(filter.getBriefDescription())){
                booleanBuilder.and(qNewsEntity.briefDescription.containsIgnoreCase(filter.getBriefDescription()));
        }

        if (!StringUtils.isEmpty(input.getSortProperty())) {
            Path<Object> fieldPath = Expressions.path(Object.class, qNewsEntity, input.getSortProperty());
            query.orderBy(new OrderSpecifier(input.getSortOrder(), fieldPath));
        }

        query.where(booleanBuilder);

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

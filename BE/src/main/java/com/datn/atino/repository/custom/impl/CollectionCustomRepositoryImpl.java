package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.CollectionEntity;
import com.datn.atino.domain.QCollectionEntity;
import com.datn.atino.repository.custom.CollectionCustomRepository;
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

public class CollectionCustomRepositoryImpl implements CollectionCustomRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<CollectionEntity> getAll(PageFilterInput<CollectionEntity> input, Pageable pageable) {

        QCollectionEntity qCollectionEntity = QCollectionEntity.collectionEntity;

        JPAQuery<CollectionEntity> query = new JPAQueryFactory(entityManager)
                .selectFrom(qCollectionEntity);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qCollectionEntity.isActive.isTrue());

        CollectionEntity filter = input.getFilter();

        if(StringUtils.hasText(filter.getName())){
            booleanBuilder.and(qCollectionEntity.name.containsIgnoreCase(filter.getName()));
        }

        if (!StringUtils.isEmpty(input.getSortProperty())) {
            Path<Object> fieldPath = Expressions.path(Object.class, qCollectionEntity, input.getSortProperty());
            query.orderBy(new OrderSpecifier(input.getSortOrder(), fieldPath));
        }

        query.where(booleanBuilder);

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

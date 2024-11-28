package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.BillEntity;
import com.datn.atino.domain.QBillEntity;
import com.datn.atino.repository.custom.BillCustomRepository;
import com.datn.atino.service.dto.BillDTO;
import com.datn.atino.service.model.PageFilterInput;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.StringUtils;

public class BillCustomRepositoryImpl implements BillCustomRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<BillEntity> getAll(PageFilterInput<BillDTO> input, Pageable pageable) {
        QBillEntity qBillEntity = QBillEntity.billEntity;

        BillDTO filter = input.getFilter();
        JPAQuery query = new JPAQueryFactory(entityManager)
                .selectFrom(qBillEntity);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        if(StringUtils.hasText(filter.getBillCode())){
            booleanBuilder.and(qBillEntity.billCode.containsIgnoreCase(filter.getBillCode()));
        }

        if(StringUtils.hasText(filter.getReciver())){
            booleanBuilder.and(qBillEntity.reciver.containsIgnoreCase(filter.getReciver()));
        }

        if(StringUtils.hasText(filter.getEmail())){
            booleanBuilder.and(qBillEntity.email.containsIgnoreCase(filter.getEmail()));
        }

        if(StringUtils.hasText(filter.getPhoneNumber())){
            booleanBuilder.and(qBillEntity.phoneNumber.containsIgnoreCase(filter.getPhoneNumber()));
        }

        if(StringUtils.hasText(filter.getAddress())){
            booleanBuilder.and(qBillEntity.address.containsIgnoreCase(filter.getAddress()));
        }

        if(StringUtils.hasText(filter.getBillNote())){
            booleanBuilder.and(qBillEntity.billNote.containsIgnoreCase(filter.getBillNote()));
        }

        if(StringUtils.hasText(filter.getCreatedBy())){
            booleanBuilder.and(qBillEntity.createdBy.eq(filter.getCreatedBy()));
        }

        if(filter.getTotalPrice() != null){
            booleanBuilder.and(qBillEntity.totalPrice.like("%" + filter.getTotalPrice() + "%"));
        }

        if(filter.getStatus() != null){
            booleanBuilder.and(qBillEntity.status.eq(filter.getStatus()));
        }

        if(pageable.isPaged()){
            query.offset(pageable.getOffset()).limit(pageable.getPageSize());
        }


        query.where(booleanBuilder).orderBy(qBillEntity.createdAt.desc());
        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

package com.datn.atino.repository.custom.impl;

import com.datn.atino.domain.QRoleEntity;
import com.datn.atino.domain.QUserEntity;
import com.datn.atino.domain.UserEntity;
import com.datn.atino.repository.custom.UserCustomRepository;
import com.datn.atino.service.dto.UserDTO;
import com.datn.atino.service.model.PageFilterInput;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

public class UserCustomRepositoryImpl implements UserCustomRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<UserEntity> getAll(Boolean isAdmin, PageFilterInput<UserDTO> input, Pageable pageable) {
        QUserEntity qUserEntity = QUserEntity.userEntity;
        QRoleEntity qRoleEntity = QRoleEntity.roleEntity;
        UserDTO filter = input.getFilter();

        JPAQuery<UserEntity> query = new JPAQuery<>(entityManager)
                .select(qUserEntity)
                .from(qUserEntity)
                .join(qUserEntity.roleEntities, qRoleEntity);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        booleanBuilder.and(qUserEntity.isActive.isTrue());

        if(isAdmin){
            booleanBuilder.and(qRoleEntity.name.eq("atino_admin"));
        } else {
            booleanBuilder.and(qRoleEntity.name.eq("atino_user"));
        }

        if(StringUtils.hasText(filter.getUserName())){
            booleanBuilder.and(qUserEntity.username.containsIgnoreCase(filter.getUserName()));
        }

        if(StringUtils.hasText(filter.getFirstName())){
            booleanBuilder.and(qUserEntity.firstName.containsIgnoreCase(filter.getFirstName()));
        }

        if(StringUtils.hasText(filter.getLastName())){
            booleanBuilder.and(qUserEntity.lastName.containsIgnoreCase(filter.getLastName()));
        }

        if(StringUtils.hasText(filter.getEmail())){
            booleanBuilder.and(qUserEntity.email.containsIgnoreCase(filter.getEmail()));
        }

        if(StringUtils.hasText(filter.getPhoneNumber())){
            booleanBuilder.and(qUserEntity.phoneNumber.containsIgnoreCase(filter.getPhoneNumber()));
        }

        if(pageable.isPaged()){
            query.offset(pageable.getOffset()).limit(pageable.getPageSize());
        }

        if(!CollectionUtils.isEmpty(filter.getUpdatedAtSearch())){
            booleanBuilder
                    .and(qUserEntity.updateAt.goe(filter.getUpdatedAtSearch().get(0)))
                    .and(qUserEntity.updateAt.loe(filter.getUpdatedAtSearch().get(1)));
        }

        query.where(booleanBuilder);

        return new PageImpl<>(query.fetch(), pageable, query.fetchCount());
    }
}

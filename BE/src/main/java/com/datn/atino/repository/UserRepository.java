package com.datn.atino.repository;

import com.datn.atino.domain.UserEntity;
import com.datn.atino.repository.custom.UserCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<UserEntity, Integer>, UserCustomRepository {

    @Query("select u from UserEntity u where u.isActive = true and u.username = :userName")
    UserEntity findByUsernameAndIsActiveTrue(@Param("userName") String userName);

    UserEntity findByIdAndIsActiveTrue(Integer id);

    @Query("select u from UserEntity u inner join u.roleEntities r where r.name = :name")
    List<UserEntity> findUserByRole(@Param("name") String name);

}

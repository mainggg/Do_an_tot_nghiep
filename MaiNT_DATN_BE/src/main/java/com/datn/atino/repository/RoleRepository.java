package com.datn.atino.repository;

import com.datn.atino.domain.RoleEntity;
import com.datn.atino.service.dto.RoleDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface RoleRepository extends JpaRepository<RoleEntity, Integer> {

    @Query("select r.name from RoleEntity r join r.userEntities u where u.username = :userName")
    List<String> findRoleNameByUserName(@Param("userName") String userName);

    @Query("select new com.datn.atino.service.dto.RoleDTO(r.id, r.name, r.description) from RoleEntity r")
    List<RoleDTO> getAllRole();

    @Query("select r from RoleEntity r join r.userEntities u where u.username = :userName")
    Set<RoleEntity> readAllBy(@Param("userName") String userName);
}

package com.datn.atino.repository;

import com.datn.atino.domain.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Integer> {

    @Query("select n from NotificationEntity n where n.username = :userName order by n.createdAt desc ")
    List<NotificationEntity> getAll(@Param("userName") String userName);

    @Query("select count (n.id) from NotificationEntity n where n.isRead = true and n.username = :userName")
    Integer countIsRead(@Param("userName") String userName);

}

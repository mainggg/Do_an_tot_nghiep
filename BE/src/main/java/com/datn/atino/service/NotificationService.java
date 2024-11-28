package com.datn.atino.service;


import com.datn.atino.domain.NotificationEntity;
import com.datn.atino.repository.NotificationRepository;
import com.datn.atino.service.util.SecurityUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<NotificationEntity> getAll(){
        String userName = SecurityUtils.getPrincipal().getUsername();
        return notificationRepository.getAll(userName);
    }

    public Integer getCountRead(){
        return notificationRepository.countIsRead(SecurityUtils.getPrincipal().getUsername());
    }

}

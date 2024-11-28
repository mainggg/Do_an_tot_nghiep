package com.datn.atino.service;


import com.datn.atino.domain.NotificationEntity;
import com.datn.atino.domain.UserEntity;
import com.datn.atino.repository.NotificationRepository;
import com.datn.atino.repository.UserRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WebSocketService {
    private final SimpMessagingTemplate simpMessagingTemplate;

    private final UserRepository userRepository;

    private final NotificationRepository notificationRepository;

    public WebSocketService(SimpMessagingTemplate simpMessagingTemplate, UserRepository userRepository, NotificationRepository notificationRepository) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.userRepository = userRepository;
        this.notificationRepository = notificationRepository;
    }


    public void sendMessage(NotificationEntity notificationEntity){
        List<UserEntity> userEntities = userRepository.findUserByRole("atino_admin");
        for(UserEntity user : userEntities){
            notificationEntity.setUsername(user.getUsername());
            String topic = "/topic/" + user.getUsername();
            System.err.println(topic);
            simpMessagingTemplate.convertAndSend(topic, notificationEntity);
            notificationRepository.save(notificationEntity);
        }
    }



}

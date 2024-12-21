package com.datn.atino.web;

import com.datn.atino.service.NotificationService;
import com.datn.atino.service.respone.CommonResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationResource {

    private final NotificationService notificationService;

    public NotificationResource(NotificationService notificationService) {
        this.notificationService = notificationService;
    }


    @GetMapping("/admin/notification")
    public CommonResponse getAll(){
        return new CommonResponse().success().data(notificationService.getAll());
    }

    @GetMapping("/admin/notification/count")
    public CommonResponse getCount(){
        return new CommonResponse().success().data(notificationService.getCountRead());
    }

}

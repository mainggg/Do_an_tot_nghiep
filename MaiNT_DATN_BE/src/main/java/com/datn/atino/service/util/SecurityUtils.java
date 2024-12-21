package com.datn.atino.service.util;

import com.datn.atino.domain.UserEntity;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtils {

    public static UserEntity getPrincipal() {
        return (UserEntity) (SecurityContextHolder.getContext()).getAuthentication().getPrincipal();
    }

}

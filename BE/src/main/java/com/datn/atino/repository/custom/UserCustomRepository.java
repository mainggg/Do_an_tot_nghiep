package com.datn.atino.repository.custom;


import com.datn.atino.domain.UserEntity;
import com.datn.atino.service.dto.UserDTO;
import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserCustomRepository {

    Page<UserEntity> getAll(Boolean isAdmin ,PageFilterInput<UserDTO> input, Pageable pageable);

}

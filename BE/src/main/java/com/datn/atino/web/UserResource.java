package com.datn.atino.web;


import com.datn.atino.domain.RoleEntity;
import com.datn.atino.domain.UserEntity;
import com.datn.atino.service.UserService;
import com.datn.atino.service.dto.ChangePasswordDTO;
import com.datn.atino.service.dto.RoleDTO;
import com.datn.atino.service.dto.UserDTO;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserResource {

    private final UserService userService;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public CommonResponse userLogin(@RequestBody UserEntity user){
        return userService.userLogin(user);
    }

    @PostMapping("/admin/user")
    public PageResponse<List<UserDTO>> getAllAdmin(@RequestBody PageFilterInput<UserDTO> input){
        return userService.getAllUser(true, input);
    }

    @PostMapping("/user")
    public PageResponse<List<UserDTO>> getAllUser(@RequestBody PageFilterInput<UserDTO> input){
        return userService.getAllUser(false, input);
    }

    @GetMapping("/user/{username}")
    public CommonResponse<UserDTO> getDetailUser(@PathVariable String username){
        return new CommonResponse<>().success().data(userService.getDetail(username));
    }


    @PostMapping("/user/new")
    public CommonResponse createUser(@RequestBody UserDTO userDTO){
        userService.saveUser(userDTO);
        return new CommonResponse().success();
    }

    @PutMapping("/user/{userId}")
    public CommonResponse updateUser(@PathVariable Integer userId, @RequestBody UserDTO input){
        userService.updateUser(userId, input);
        return new CommonResponse().success();
    }

    @GetMapping("/admin/roles")
    public CommonResponse<List<RoleDTO>> getAllRole(){
        return new CommonResponse<>().success().data(userService.getAllRole());
    }


    @GetMapping("/admin/{userName}/roles")
    public CommonResponse<List<String>> getAllRoleByUserName(@PathVariable String userName){
        return new CommonResponse<>().success().data(userService.getRoleNameByUserName(userName));
    }

    @GetMapping("/admin/delete/{userId}")
    public CommonResponse deleteUser(@PathVariable Integer userId){
        userService.deleteUser(userId);
        return new CommonResponse().success();
    }

    @PostMapping("/admin/change-password/{userId}")
    public CommonResponse changePassword(@PathVariable Integer userId, @RequestBody ChangePasswordDTO input){
        userService.changePassword(userId, input);
        return new CommonResponse().success();
    }



}

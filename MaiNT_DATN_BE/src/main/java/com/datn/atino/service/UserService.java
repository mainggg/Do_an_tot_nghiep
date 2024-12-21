package com.datn.atino.service;


import com.datn.atino.domain.RoleEntity;
import com.datn.atino.domain.UserEntity;
import com.datn.atino.repository.RoleRepository;
import com.datn.atino.repository.UserRepository;
import com.datn.atino.service.dto.ChangePasswordDTO;
import com.datn.atino.service.dto.RoleDTO;
import com.datn.atino.service.dto.UserDTO;
import com.datn.atino.service.exception.CustomException;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import com.datn.atino.service.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.time.Instant;
import java.util.*;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, JwtService jwtService, AuthenticationManager authenticationManager, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public CommonResponse userLogin(UserEntity input){
        UserEntity user = userRepository.findByUsernameAndIsActiveTrue(input.getUsername());
        //user.setRoleEntities(roleRepository.readAllBy(input.getUsername()));
        if(user == null) return new CommonResponse().result("403","Thông tin mật khẩu không chính xác", false);
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(input.getUsername(), input.getPassword())
            );
        } catch (Exception ex){
            return new CommonResponse().result("403", "Thông tin tài khoản mật khẩu không chính xác", false);

        }

        String jwtToken = jwtService.generateToken(user);
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setToken(jwtToken);
        userDTO.setListRoleString(roleRepository.findRoleNameByUserName(user.getUsername()));
        return new CommonResponse().success().data(userDTO);
    }

    public PageResponse<List<UserDTO>> getAllUser(Boolean isAdmin, PageFilterInput<UserDTO> input){
        Page<UserEntity> userEntities = userRepository.getAll(isAdmin, input, Constants.getPageable(input));
        List<UserDTO> result = new ArrayList<>();
        for (UserEntity user : userEntities.getContent()){
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setUserName(user.getUsername());
            userDTO.setEmail(user.getEmail());
            userDTO.setPhoneNumber(user.getPhoneNumber());
            userDTO.setFirstName(user.getFirstName());
            userDTO.setLastName(user.getLastName());
            userDTO.setUpdatedAt(user.getUpdateAt());
            Set<RoleDTO> roleDTOS = new LinkedHashSet<>();
            for (RoleEntity role : user.getRoleEntities()){
                RoleDTO roleDTO = new RoleDTO(role.getId(), role.getName(), role.getDescription());
                roleDTOS.add(roleDTO);
            }
            userDTO.setRoles(roleDTOS);
            result.add(userDTO);
        }
        return new PageResponse<List<UserDTO>>().success().data(result).dataCount(userEntities.getTotalElements());
    }

    public UserDTO getDetail(String userName){
        UserEntity user = userRepository.findByUsernameAndIsActiveTrue(userName);
        if(user == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tìm thấy");
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());
        userDTO.setAddress(user.getAddress());
        return userDTO;
    }

    public void saveUser(UserDTO userDTO){
        UserEntity user = new UserEntity();
        user.setUsername(userDTO.getUserName());
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        user.setAddress(userDTO.getAddress());
        user.setPassword(passwordEncoder.encode(userDTO.getPassWord()));
        Set<RoleEntity> roleEntities = new HashSet<>();
        if(!CollectionUtils.isEmpty(userDTO.getRoles())){
            for (RoleDTO roleDTO : userDTO.getRoles()){
                RoleEntity role = new RoleEntity();
                role.setId(roleDTO.getId());
                role.setName(roleDTO.getName());
                role.setDescription(roleDTO.getDescription());
                roleEntities.add(role);
            }
            user.setRoleEntities(roleEntities);

        }
        user.setAddress(userDTO.getAddress());
        user.setUpdateAt(Instant.now());
        user.setCreatedAt(Instant.now());
        userRepository.save(user);
    }

    public void updateUser(Integer id ,UserDTO userDTO){
        UserEntity user = userRepository.findByIdAndIsActiveTrue(id);
        user.setEmail(userDTO.getEmail());
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setFirstName(userDTO.getFirstName());
        user.setLastName(userDTO.getLastName());
        Set<RoleEntity> roleEntities = new HashSet<>();
        if(!CollectionUtils.isEmpty(userDTO.getRoles())){
            for (RoleDTO roleDTO : userDTO.getRoles()){
                RoleEntity role = new RoleEntity();
                role.setId(roleDTO.getId());
                role.setName(roleDTO.getName());
                role.setDescription(roleDTO.getDescription());
                roleEntities.add(role);
            }
            user.setRoleEntities(roleEntities);

        }
        user.setUpdateAt(Instant.now());
        userRepository.save(user);
    }

    public List<RoleDTO> getAllRole(){
        return roleRepository.getAllRole();
    }

    public List<String> getRoleNameByUserName(String userName){
        return roleRepository.findRoleNameByUserName(userName);
    }

    public void deleteUser(Integer userId){
        UserEntity user = userRepository.findByIdAndIsActiveTrue(userId);
        user.setIsActive(false);
        userRepository.save(user);
    }

    public void changePassword(Integer userId, ChangePasswordDTO changePassword){
        UserEntity user = userRepository.findByIdAndIsActiveTrue(userId);
        if(!changePassword.getNewPassword().equals(changePassword.getConfirmNewPassword())){
            throw new CustomException(HttpStatus.BAD_REQUEST, "Mật khẩu không khớp");
        }
        System.err.println(changePassword.getNewPassword() + ": " + passwordEncoder.encode(changePassword.getNewPassword()));
        user.setPassword(passwordEncoder.encode(changePassword.getNewPassword()));
        userRepository.save(user);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        UserEntity user = userRepository.findByUsernameAndIsActiveTrue(username);

        // Converting userDetail to UserDetails
        return user;
    }

}

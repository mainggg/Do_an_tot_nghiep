package com.datn.atino.service.dto;

import com.datn.atino.domain.RoleEntity;

import java.time.Instant;
import java.util.List;
import java.util.Set;

public class UserDTO {

    private Integer id;
    private String userName;
    private String address;
    private String email;
    private String phoneNumber;
    private String firstName;
    private String lastName;

    private String passWord;
    private String token;

    private Set<RoleDTO> roles;

    private List<String> listRoleString;

    private Instant updatedAt;

    private List<Instant> updatedAtSearch;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }


    public String getPassWord() {
        return passWord;
    }

    public void setPassWord(String passWord) {
        this.passWord = passWord;
    }

    public Set<RoleDTO> getRoles() {
        return roles;
    }

    public void setRoles(Set<RoleDTO> roles) {
        this.roles = roles;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<String> getListRoleString() {
        return listRoleString;
    }

    public void setListRoleString(List<String> listRoleString) {
        this.listRoleString = listRoleString;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public List<Instant> getUpdatedAtSearch() {
        return updatedAtSearch;
    }

    public void setUpdatedAtSearch(List<Instant> updatedAtSearch) {
        this.updatedAtSearch = updatedAtSearch;
    }
}

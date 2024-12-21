package com.datn.atino.service;


import com.datn.atino.domain.RoleEntity;
import com.datn.atino.domain.UserEntity;
import com.datn.atino.repository.UserRepository;
import com.datn.atino.service.dto.RoleDTO;
import com.datn.atino.service.dto.UserDTO;
import com.datn.atino.service.exception.CustomException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtService {
    private final UserRepository userRepository;
    private static final String SERCRET_KEY = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public UserEntity extractUser(String token) {
        try {
            Claims claims = extractAllClaims(token);
            String jsonUserCustomDTO = claims.get("user").toString();

            ObjectMapper mapper = new ObjectMapper();
            UserEntity user = mapper.readValue(jsonUserCustomDTO, UserEntity.class);

            return user;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserEntity user){
        Map<String, Object> claims = new HashMap<>();
        String jsonUserCustom = "";
        UserEntity userCustom = new UserEntity();
        UserDTO userDTO = new UserDTO();
        try {
                userCustom =
                    userRepository.findByUsernameAndIsActiveTrue(user.getUsername());
            if(userCustom == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tìm thấy tài khoản");

            userDTO.setUserName(userCustom.getUsername());
            userDTO.setEmail(userCustom.getEmail());
            userDTO.setPhoneNumber(userCustom.getPhoneNumber());
            Set<RoleDTO> roleDTOS = new HashSet<>();
            for (RoleEntity role: userCustom.getRoleEntities()){
                RoleDTO roleDTO = new RoleDTO();
                roleDTO.setId(role.getId());
                roleDTO.setName(role.getName());
                roleDTOS.add(roleDTO);
            }
            userDTO.setRoles(roleDTOS);
            jsonUserCustom = convertObjectToJson(userDTO);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
        }

        claims.put("user", jsonUserCustom);
        return generateToken(claims, userCustom);
    }
    public String generateToken(Map<String, Object> extraClaims, UserEntity user){
        return Jwts.builder()
                .addClaims(extraClaims)
                .setSubject(user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SERCRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    public String convertObjectToJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    }
}
package com.datn.atino.config;


import com.datn.atino.service.UserService;
import com.datn.atino.service.filter.CorsFilter;
import com.datn.atino.service.filter.JwtAuthenticantionFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    private final JwtAuthenticantionFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final CorsFilter corsFilter;

    public SecurityConfig(JwtAuthenticantionFilter jwtAuthFilter, AuthenticationProvider authenticationProvider, CorsFilter corsFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.authenticationProvider = authenticationProvider;
        this.corsFilter = corsFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsFilter.corsConfigurationSource()))
                .authorizeHttpRequests(auth -> {
                    auth.requestMatchers("/api/v1/auth/register").permitAll();
                    auth.requestMatchers("/login").permitAll();
                    auth.requestMatchers("/admin/**").hasAuthority("atino_admin");
                    auth.requestMatchers("/**").permitAll();
                    auth.anyRequest().permitAll();
                })
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }



}

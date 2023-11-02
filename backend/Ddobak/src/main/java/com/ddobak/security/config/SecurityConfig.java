package com.ddobak.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
            .formLogin().disable()
            .httpBasic().disable()
            .csrf().disable()
            .cors()
            .and()
            .headers()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(
                SessionCreationPolicy.STATELESS
            )
            .and()

            // URL 별 권환 확인
            .authorizeRequests()
            .antMatchers("/api/v1/member/email/**","/docs/**", "/api/v1/member/join/**").permitAll()
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .build();
    }
}

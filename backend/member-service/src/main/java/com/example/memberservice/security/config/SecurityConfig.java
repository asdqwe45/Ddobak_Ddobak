package com.example.memberservice.security.config;

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
            .formLogin().disable() // FromLogin 사용 X
            .httpBasic().disable() // httpBasic 사용 X
            .csrf().disable() // csrf 보안 사용 X
            .cors()
            .and()
            .headers().frameOptions().disable() // X-Frame-Options Click jacking 공격 막기 사용 X
            .and()
            .sessionManagement()
            .sessionCreationPolicy(
                SessionCreationPolicy.STATELESS) // 세션을 사용하지 않기 때문에 사용 정책 stateless
            .and()

            // URL 별 권한 관리 옵션
            .authorizeRequests()
            .antMatchers("/h2-console/**","/docs/**").permitAll()
            .antMatchers("/**").permitAll()
            .anyRequest().authenticated()
            .and()
            .build();
    }

}

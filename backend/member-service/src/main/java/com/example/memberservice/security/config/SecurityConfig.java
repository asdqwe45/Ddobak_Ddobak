package com.example.memberservice.security.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable() // CSRF 보호를 비활성화 (API 서비스의 경우 이 설정이 필요할 수 있습니다)
            .authorizeRequests()
            .anyRequest().permitAll(); // 모든 요청에 대해 인증 없이 접근을 허용합니다.
    }
}

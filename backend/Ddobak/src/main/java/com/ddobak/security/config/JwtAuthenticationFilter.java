package com.ddobak.security.config;

import com.ddobak.global.entity.UserInfo;
import com.ddobak.security.service.CustomUserDetailService;
import com.ddobak.security.util.JwtProvider;
import com.ddobak.security.util.LoginInfo;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final CustomUserDetailService customUserDetailService;

    @Value("${jwt.token.secret}")
    private String secretKey;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        final String authorization = request.getHeader(HttpHeaders.AUTHORIZATION);
        log.debug("authorization start : {}", authorization);

        // 인증 여부 확인
        if(authorization == null || !(authorization.startsWith("Bearer ") || authorization.startsWith("Refresh "))) {
            log.error("authorization is null ");
            filterChain.doFilter(request, response);
            return;
        }

        // 있는 경우 유효성 확인
        // "Bearer " 또는 "Refresh-> 7
        String token = authorization.substring(7);
        if(authorization.startsWith("Bearer ")) { // accessToken의 경우 처리
            String accessToken;
            // 토큰 분해할 수 없는 경우
            try {
                accessToken = authorization.split(" ")[1];
            } catch (Exception e) {
                log.debug("Token 을 분해할 수 없음");
                filterChain.doFilter(request, response);
                return;
            }

            // 토큰 분해힌 경우
            // 유효성 검사
            if(jwtProvider.isExpired(accessToken, secretKey)) {
                log.error("AccessToken 만료");
                filterChain.doFilter(request, response);
                return;
            }

            // 정보 추출 및 SecurityContextHolder 에 저장할 레코드 생성
            String email = jwtProvider.getEmail(accessToken, secretKey);
            Long id = jwtProvider.getId(accessToken, secretKey);

            UserInfo userInfo = (UserInfo) customUserDetailService.loadUserByUsername(email);
            LoginInfo loginInfo = new LoginInfo(email, id);

            // SecurityContextHolder 에 저장
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginInfo, null, userInfo.getAuthorities());
            usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }
        else if(authorization.startsWith("Refresh ")) {
            String refreshToken = authorization.substring(8);
            try {
                String newAccessToken = jwtProvider.createNewAccessToken(refreshToken, secretKey);
                response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer "+newAccessToken);
            } catch (Exception e) {
                log.error("accessToken update fail");
            }
        }

        filterChain.doFilter(request, response);
    }
}

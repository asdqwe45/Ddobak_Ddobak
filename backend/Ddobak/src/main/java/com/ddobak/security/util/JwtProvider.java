package com.ddobak.security.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtProvider {

    private final RedisTemplate<String, String> redisTemplate;

    private final Long accessTokenExpireTime = 3600000L; // 1시간
    private final Long refreshTokenExpireTime = 1209600000L; // 2주일

    public String createAccessToken(Long id, String email, String secretKey) {
        Claims claims = Jwts.claims();

        claims.put("id", id);
        claims.put("email", email);

        Date now = new Date();
        Date accessTokenExpire = new Date(now.getTime() + accessTokenExpireTime);


        String accessToken = Jwts.builder()
                                 .setClaims(claims)
                                 .setIssuedAt(now)
                                 .setExpiration(accessTokenExpire)
                                 .signWith(
                                     Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)),
                                     SignatureAlgorithm.HS256)
                                 .compact();

        return accessToken;
    }

    public String createRefreshToken(String email, String secretKey) {
        Claims claims = Jwts.claims();

        claims.put("email", email);

        Date now = new Date();
        Date refreshTokenExpire = new Date(now.getTime() + refreshTokenExpireTime);

        String refreshToken = Jwts.builder()
                                  .setClaims(claims)
                                  .setIssuedAt(now)
                                  .setExpiration(refreshTokenExpire)
                                  .signWith(
                                      Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)),
                                      SignatureAlgorithm.HS256)
                                  .compact();

        // RefreshToken을 캐시에 저장
        redisTemplate.opsForValue().set(email, refreshToken, refreshTokenExpireTime, TimeUnit.MILLISECONDS);

        return refreshToken;
    }
}

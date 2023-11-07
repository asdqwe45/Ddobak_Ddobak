package com.ddobak.security.util;

import com.ddobak.global.exception.ErrorCode;
import com.ddobak.security.exception.SecurityException;
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

    public String getEmail(String token, String secretKey) {
        return Jwts.parserBuilder()
            .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
            .build()
            .parseClaimsJws(token)
            .getBody()
            .get("email", String.class);

    }

    public boolean isExpired(String token, String secretKey) {
        return Jwts.parserBuilder()
            .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getExpiration()
            .before(new Date());
    }

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

    public String createNewAccessToken(String refreshToken, String secretKey) {
        // RefreshToken 검증 후 새로운 AccessToken 생성
        try{
            Claims claims = Jwts.parserBuilder()
                                .setSigningKey(secretKey.getBytes(StandardCharsets.UTF_8))
                                .build()
                                .parseClaimsJws(refreshToken)
                                .getBody();

            String email = claims.get("email", String.class);

            // 저장된 RefreshToken 과 비교
            String redisRefreshToken = redisTemplate.opsForValue().get(email);
            if(redisRefreshToken == null || !redisRefreshToken.equals(refreshToken)) {
                throw new SecurityException(ErrorCode.INVALID_REFRESH_TOKEN);
            }
            Date now = new Date();
            Date accessTokenExpire = new Date(now.getTime() + accessTokenExpireTime);

            Claims newClaims = Jwts.claims();
//            newClaims.put("id", id);
            newClaims.put("email", email);

            String accessToken = Jwts.builder()
                .setClaims(newClaims)
                .setExpiration(accessTokenExpire)
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)),SignatureAlgorithm.HS256)
                .compact();

            return accessToken;


        } catch (Exception e) {
            throw new SecurityException(ErrorCode.INVALID_REFRESH_TOKEN);
        }
    }
}

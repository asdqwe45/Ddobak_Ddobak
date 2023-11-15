package com.ddobak.util;

import com.ddobak.font.controller.FontController;
import com.ddobak.font.service.FontEmailService;
import com.ddobak.font.service.FontImageService;
import com.ddobak.font.service.FontService;
import com.ddobak.global.service.S3Service;
import com.ddobak.member.controller.MemberController;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.member.service.EmailService;
import com.ddobak.member.service.MemberService;
import com.ddobak.security.service.CustomUserDetailService;
import com.ddobak.security.util.JwtProvider;
import com.ddobak.security.util.LoginInfo;
import com.ddobak.transaction.service.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@AutoConfigureRestDocs
@ActiveProfiles("test")
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureMockMvc(addFilters = false)
@ExtendWith(RestDocumentationExtension.class)
@WebMvcTest({
    MemberController.class, FontController.class
})
public class ControllerTest {

    // Util
    @Autowired
    protected MockMvc mockMvc;
    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean protected JwtProvider jwtProvider;
    @MockBean protected S3Service s3Service;


    @Value("${jwt.token.secret}")
    protected String secretKey;

    // Service
    @MockBean protected MemberService memberService;
    @MockBean protected EmailService emailService;
    @MockBean protected CustomUserDetailService customUserDetailService;
    @MockBean protected FontImageService fontImageService;
    @MockBean protected FontService fontService;
    @MockBean protected TransactionService transactionService;
    @MockBean protected FontEmailService fontEmailService;

    // Repository
    @MockBean protected MemberRepository memberRepository;

    protected String createToken(String email, String secretKey) {

        final long accessTokenExpireTimeMs = 3600000L; // 1시간
        final long refreshTokenExpireTimeMs = 1209600000L; // 2주일

        Claims claims = Jwts.claims();
        claims.put("email", email);

        Date now = new Date();
        Date accessTokenExpiration = new Date(now.getTime() + accessTokenExpireTimeMs);

        return Jwts.builder()
                   .setClaims(claims)
                   .setIssuedAt(now)
                   .setExpiration(accessTokenExpiration)
                   .signWith(
                       Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)),
                       SignatureAlgorithm.HS256)
                   .compact();

    }

    protected void setAuthentication() {
        LoginInfo loginInfo = new LoginInfo("lkm454545@gmail.com",1L);
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new TestingAuthenticationToken(loginInfo, null));
        SecurityContextHolder.setContext(securityContext);
    }
}

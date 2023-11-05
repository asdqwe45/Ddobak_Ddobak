package com.ddobak.global.config;
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
//import springfox.documentation.builders.ApiInfoBuilder;
//import springfox.documentation.builders.PathSelectors;
//import springfox.documentation.builders.RequestHandlerSelectors;
//import springfox.documentation.service.*;
//import springfox.documentation.spi.DocumentationType;
//import springfox.documentation.spi.service.contexts.SecurityContext;
//import springfox.documentation.spring.web.plugins.Docket;
//
//import java.util.List;
//
//@Configuration
//@EnableWebMvc
//public class SwaggerConfig extends WebMvcConfigurationSupport {
//
//    private static final String REFERENCE = "Authorization 헤더 값";
//
//    @Bean
//    public Docket api() {
//        return new Docket(DocumentationType.OAS_30)
//                .select()
//                .apis(RequestHandlerSelectors.any())
//                .paths(PathSelectors.any())
//                .build()
//                .apiInfo(apiInfo())
//                .securityContexts(List.of(securityContext()))
//                .securitySchemes(List.of(bearerAuthSecurityScheme()));
//    }
//
//
//    private ApiInfo apiInfo() {
//        return new ApiInfoBuilder()
//                .title("Swagger 문서 제목")
//                .description("Swagger 문서 설명")
//                .version("1.0")
//                .build();
//    }
//
//
//    private SecurityContext securityContext() {
//        return springfox.documentation
//                .spi.service.contexts
//                .SecurityContext
//                .builder()
//                .securityReferences(defaultAuth())
//                .operationSelector(operationContext -> true)
//                .build();
//    }
//    private List<SecurityReference> defaultAuth() {
//        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
//        authorizationScopes[0] = new AuthorizationScope("global", "accessEverything");
//        return List.of(new SecurityReference(REFERENCE, authorizationScopes));
//    }
//    private HttpAuthenticationScheme bearerAuthSecurityScheme(){
//        return HttpAuthenticationScheme.JWT_BEARER_BUILDER
//                .name(REFERENCE).build();
//    }
//}
//
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    // 테스트

    @Bean
    public GroupedOpenApi publicApi(){
        return GroupedOpenApi.builder()
                .group("v1-definition")
                .pathsToMatch("/api/**")
                .build();
    }

    @Bean
    public OpenAPI UniqonOpenApi(){
        return new OpenAPI()
                .info(new Info().title("Uniqon API Document")
                        .description("Uniqon의 API 명세서")
                        .version("v0.1.0"));
    }

}

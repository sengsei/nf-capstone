package de.neuefische;

import de.neuefische.category.Category;
import de.neuefische.user.LoginData;
import de.neuefische.user.UserDocument;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void integrationTest() {

        Category category = new Category();
        category.setCategoryName("Java");

        ResponseEntity<String> createUserResponse = restTemplate.postForEntity("/api/users", new UserDocument(null, "user", "123456", "123456", "USER"), String.class);
        assertThat(createUserResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(createUserResponse.getBody()).isEqualTo("user was created");

        ResponseEntity<String> loginResponse = restTemplate.postForEntity("/api/users/login", new LoginData("user", "123456"), String.class);
        assertThat(loginResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(loginResponse.getBody()).isNotBlank();
        String token = loginResponse.getBody();
        HttpHeaders bearerHeader = new HttpHeaders();
        bearerHeader.setBearerAuth(token);

        ResponseEntity<Category[]> addCategoryResponse = restTemplate.exchange(
                "/api/categories",
                HttpMethod.POST,
                new HttpEntity<>(category, bearerHeader),
                Category[].class
        );

        Category[] createdCategory = addCategoryResponse.getBody();

        assertThat(addCategoryResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(createdCategory.length).isEqualTo(1);
        assertThat(createdCategory[0].getCategoryName()).isEqualTo("Java");

        ResponseEntity<Category> getCategoryByIdResponse = restTemplate.exchange(
                "/api/categories/" + createdCategory[0].getId(),
                HttpMethod.GET,
                new HttpEntity<>(bearerHeader),
                Category.class
        );

        assertThat(getCategoryByIdResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getCategoryByIdResponse.getBody()).isEqualTo(createdCategory[0]);



    }



}
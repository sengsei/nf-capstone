package de.neuefische;

import de.neuefische.category.Category;
import de.neuefische.user.LoginData;
import de.neuefische.user.UserDocument;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.util.Objects;

import static org.assertj.core.api.Assertions.assertThat;



@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class IntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void integrationTestCategory() {

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
        assert createdCategory != null;
        String categoryId = createdCategory[0].getId();

        assertThat(addCategoryResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(createdCategory.length).isEqualTo(1);
        assertThat(createdCategory[0].getCategoryName()).isEqualTo("Java");

        ResponseEntity<Category> getCategoryByIdResponse = restTemplate.exchange(
                "/api/categories/" + categoryId,
                HttpMethod.GET,
                new HttpEntity<>(bearerHeader),
                Category.class
        );

        assertThat(getCategoryByIdResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(getCategoryByIdResponse.getBody()).isEqualTo(createdCategory[0]);

        Category changedCategory = new Category();
        changedCategory.setCategoryName("Python");

        ResponseEntity<Category[]> changeCategoryResponse = restTemplate.exchange(
                "/api/categories/" + categoryId,
                HttpMethod.PUT,
                new HttpEntity<>(changedCategory, bearerHeader),
                Category[].class
        );

        Category[] changeCategoryResponseBody = changeCategoryResponse.getBody();

        assertThat(changeCategoryResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assert changeCategoryResponseBody != null;
        assertThat(changeCategoryResponseBody[0].getCategoryName()).isEqualTo("Python");

        ResponseEntity<Category[]> deleteCategoryResponse = restTemplate.exchange(
                "/api/categories/" + categoryId,
                HttpMethod.DELETE,
                new HttpEntity<>(changedCategory, bearerHeader),
                Category[].class
        );

        assertThat(deleteCategoryResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        ResponseEntity<Category[]> getCategoryListResponse = restTemplate.exchange(
                "/api/categories",
                HttpMethod.GET,
                new HttpEntity<>(bearerHeader),
                Category[].class
        );

        assertThat(getCategoryListResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(Objects.requireNonNull(getCategoryListResponse.getBody()).length).isEqualTo(0);



    }

}
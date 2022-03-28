package de.neuefische.category;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Collection;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

class CategoryServiceTest {

    @Test
    void shouldGetAllCategories() {
        Category elem1 = new Category();
        elem1.setCategoryName("Java");

        Category elem2 = new Category();
        elem2.setCategoryName("Python");

        List<Category> categoryList = List.of(elem1, elem2);
        CategoryRepository repo = Mockito.mock(CategoryRepository.class);

        when(repo.findAll()).thenReturn(categoryList);

        CategoryService categoryService = new CategoryService(repo);
        Collection<Category> actual = categoryService.getCategoryList();

        assertThat(actual).isEqualTo(categoryList);

    }

}
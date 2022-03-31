package de.neuefische.category;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;


import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
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

    @Test
    void shouldDeleteCategory(){
        CategoryRepository repo = Mockito.mock(CategoryRepository.class);
        CategoryService categoryService = new CategoryService(repo);

        categoryService.deleteCategory("777");

        verify(repo).deleteById("777");
    }

    @Test
    void shouldAddCategory() {
        Category elem = new Category();
        elem.setCategoryName("Java");

        Category savedElem = new Category();
        savedElem.setCategoryName("Java");

        CategoryRepository repo = Mockito.mock(CategoryRepository.class);
        when(repo.save(elem)).thenReturn(savedElem);

        CategoryService categoryService = new CategoryService(repo);
        Category actual = categoryService.addCategory(elem);

        assertThat(actual).isSameAs(savedElem);
    }

    @Test
    void shouldGetCategoryById() {
        Category elem = new Category();
        elem.setCategoryName("Java");
        elem.setId("777");

        CategoryRepository repo = Mockito.mock(CategoryRepository.class);
        when(repo.findById(elem.getId())).thenReturn(Optional.of(elem));

        CategoryService categoryService = new CategoryService(repo);
        Category actual = categoryService.getCategoryById(elem.getId());

        assertThat(actual).isEqualTo(elem);
    }

}
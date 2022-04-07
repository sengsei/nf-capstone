package de.neuefische.category;

import de.neuefische.user.UserDocument;
import de.neuefische.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.mockito.Mockito.*;

class CategoryServiceTest {

    @Test
    void shouldGetAllCategories() {
        Category elem1 = new Category();
        elem1.setCategoryName("Java");

        Category elem2 = new Category();
        elem2.setCategoryName("Python");

        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        CategoryRepository categoryRepository = mock(CategoryRepository.class);
        when(categoryRepository.findAllByUserId("123")).thenReturn(List.of(elem1, elem2));

        CategoryService categoryService = new CategoryService(categoryRepository, userRepository);
        Collection<Category> actual = categoryService.getCategoryList(principal);

        assertThat(actual.size()).isEqualTo(2);

    }

    @Test
    void shouldDeleteCategory() {
        Category elem1 = new Category();
        elem1.setCategoryName("Java");
        elem1.setId("777");

        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        CategoryRepository repo = Mockito.mock(CategoryRepository.class);
        CategoryService categoryService = new CategoryService(repo, userRepository);

        categoryService.deleteCategory(elem1.getId(), principal);

        verify(repo).deleteCategoryByIdAndUserId("777", "123");
    }

    @Test
    void shouldAddCategory() {
        Category elem = new Category();
        elem.setCategoryName("Java");

        Category savedElem = new Category();
        savedElem.setCategoryName("Java");

        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        CategoryRepository repo = Mockito.mock(CategoryRepository.class);
        when(repo.save(elem)).thenReturn(savedElem);

        CategoryService categoryService = new CategoryService(repo, userRepository);
        Category actual = categoryService.addCategory(elem, principal);

        assertThat(actual).isSameAs(savedElem);
    }

    @Test
    void shouldThrowAnExceptionWhenCategoryIsTheSame() {
        Category elem = new Category();
        elem.setCategoryName("Java");

        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        CategoryRepository categoryRepository = mock(CategoryRepository.class);
        when(categoryRepository.findByCategoryName(elem.getCategoryName())).thenReturn(Optional.of(elem));

        CategoryService categoryService = new CategoryService(categoryRepository, userRepository);

        assertThatExceptionOfType(IllegalArgumentException.class)
                .isThrownBy(() -> categoryService.addCategory(elem, principal))
                .withMessage("Die Kategorie existiert schon!");
    }

    @Test
    void shouldChangeCategory() {
        Category elem = new Category();
        elem.setId("777");
        elem.setCategoryName("Java");

        Category savedElem = new Category();
        savedElem.setId("777");
        savedElem.setCategoryName("Python");

        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        CategoryRepository repo = Mockito.mock(CategoryRepository.class);
        when(repo.findById("777")).thenReturn(Optional.of(elem));

        CategoryService categoryService = new CategoryService(repo, userRepository);

        categoryService.changeCategory("777", savedElem);

        Mockito.verify(repo).save(savedElem);

    }


    @Test
    void shouldGetCategoryById() {
        Category elem = new Category();
        elem.setCategoryName("Java");
        elem.setId("777");

        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        CategoryRepository repo = Mockito.mock(CategoryRepository.class);
        when(repo.findById(elem.getId())).thenReturn(Optional.of(elem));

        CategoryService categoryService = new CategoryService(repo, userRepository);
        Category actual = categoryService.getCategoryById(elem.getId());

        assertThat(actual).isEqualTo(elem);
    }

}
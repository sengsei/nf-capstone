package de.neuefische.category;

import de.neuefische.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Collection;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public Collection<Category>getCategoryList(Principal principal) {
        return categoryRepository.findAllByUserId(getUserID(principal));
    }

    public void deleteCategory(String id, Principal principal) {
        categoryRepository.deleteCategoryByIdAndUserId(id, getUserID(principal));
    }

    public Category addCategory(Category category, Principal principal) {
        if (categoryRepository.findByCategoryName(category.getCategoryName()).isEmpty()){
            category.setUserId(getUserID(principal));
            return categoryRepository.save(category);
        }
        throw new IllegalArgumentException("Die Kategorie existiert schon!");
    }

    public Category getCategoryById(String id) {
        Optional<Category> category = categoryRepository.findById(id);
        return category.orElseGet(Category::new);
    }

    public void changeCategory(String id, Category changedCategory) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()){
            Category catUnwrapped = category.get();
            if (!changedCategory.getCategoryName().isBlank()){
                catUnwrapped.setCategoryName(changedCategory.getCategoryName());
            }
            categoryRepository.save(catUnwrapped);
        }
    }

    private String getUserID(Principal principal) {
        return userRepository.findByEmail(principal.getName()).get().getId();
    }
}

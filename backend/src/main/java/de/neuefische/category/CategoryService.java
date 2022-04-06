package de.neuefische.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Collection<Category>getCategoryList() {
        return categoryRepository.findAll();
    }

    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }

    public Category addCategory(Category category) {
        if (categoryRepository.findByCategoryName(category.getCategoryName()).isEmpty()){
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
}

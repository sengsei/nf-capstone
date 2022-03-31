package de.neuefische.category;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public Collection<Category> getCategoryList() {
        return categoryService.getCategoryList();
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable String id) {
        return categoryService.getCategoryById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable String id){
        categoryService.deleteCategory(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Collection<Category> addCategory(@RequestBody Category category){
        categoryService.addCategory(category);
        return categoryService.getCategoryList();
    }

}

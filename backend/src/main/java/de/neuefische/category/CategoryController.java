package de.neuefische.category;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collection;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@CrossOrigin
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public Collection<Category> getCategoryList(Principal principal) {
        return categoryService.getCategoryList(principal);
    }

    @GetMapping("/{id}")
    public Category getCategoryById(@PathVariable String id) {
        return categoryService.getCategoryById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable String id, Principal principal){
        categoryService.deleteCategory(id, principal);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Collection<Category> addCategory(@RequestBody Category category, Principal principal){
        categoryService.addCategory(category, principal);
        return categoryService.getCategoryList(principal);
    }

    @PutMapping("/{id}")
    public Collection<Category>changeCategory(@PathVariable String id, @RequestBody Category category, Principal principal){
        categoryService.changeCategory(id, category);
        return categoryService.getCategoryList(principal);
    }

}

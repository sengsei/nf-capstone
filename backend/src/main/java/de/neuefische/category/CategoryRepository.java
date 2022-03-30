package de.neuefische.category;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
        void deleteCategoryById(String id);
}

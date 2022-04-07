package de.neuefische.question;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findQuestionByCategoryNameAndUserId(String name, String userId);
    List<Question> findAllByUserId(String userId);
    void deleteQuestionByIdAndUserId(String id, String userId);
}

package de.neuefische.question;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public Collection<Question>getQuestionList() {
        return questionRepository.findAll();
    }

    public List<Question> findByCategory(String categoryName) {
        return questionRepository.findQuestionByCategoryName(categoryName);
    }
}

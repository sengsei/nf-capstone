package de.neuefische.question;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.io.*;
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

    public Question addQuestion(Question question) {
        return questionRepository.save(question);
    }

    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }

    public ImportStatus createQuestions(InputStream inputStream) {
        try (Reader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            CsvToBean<CsvItem> csvToBean = new CsvToBeanBuilder<CsvItem>(reader)
                    .withType(CsvItem.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            questionRepository.saveAll(csvToBean.parse().stream()
                    .map(item -> item.toQuestion())
                    .toList());

            return ImportStatus.SUCCESS;
        } catch (IllegalStateException | IllegalArgumentException | IOException e) {
            return ImportStatus.FAILURE;
        }

    }
}

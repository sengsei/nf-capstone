package de.neuefische.question;

import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import de.neuefische.category.CategoryRepository;
import de.neuefische.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Service;


import java.io.*;
import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;


    public Collection<Question>getQuestionList(Principal principal) {
        return questionRepository.findAllByUserId(getUserID(principal));
    }

    public List<Question> findByCategory(String categoryName, Principal principal) {
        return questionRepository.findQuestionByCategoryNameAndUserId(categoryName, getUserID(principal));
    }

    public Question addQuestion(Question question, Principal principal) {
        question.setUserId(getUserID(principal));
        return questionRepository.save(question);
    }

    public void deleteQuestion(String id, Principal principal) {
        questionRepository.deleteQuestionByIdAndUserId(id, getUserID(principal));
    }

    public ImportStatus createQuestions(InputStream inputStream, Principal principal) {
        try (Reader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            CsvToBean<CsvItem> csvToBean = new CsvToBeanBuilder<CsvItem>(reader)
                    .withType(CsvItem.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            questionRepository.saveAll(csvToBean.parse().stream()
                    .map(elem -> elem.toQuestion(getUserID(principal)))
                    .toList());

            return ImportStatus.SUCCESS;
        } catch (IllegalStateException | IllegalArgumentException | IOException e) {
            return ImportStatus.FAILURE;
        }

    }

    public void changeQuestion(String id, Question changedQuestion) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isPresent()){
            Question questionUnwrapped = question.get();
            if (!changedQuestion.getQuestion().isBlank()){
                questionUnwrapped.setQuestion(changedQuestion.getQuestion());
            }
            if (!changedQuestion.getCategoryName().isBlank()){
                questionUnwrapped.setCategoryName(changedQuestion.getCategoryName());
            }
            if (!changedQuestion.getQuestionState().isBlank()){
                questionUnwrapped.setQuestionState(changedQuestion.getQuestionState());
            }
            questionRepository.save(questionUnwrapped);
        }
    }

    private String getUserID(Principal principal) {
        return userRepository.findByEmail(principal.getName()).get().getId();
    }
}

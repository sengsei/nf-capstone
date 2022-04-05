package de.neuefische.question;

import org.junit.jupiter.api.Test;

import java.io.InputStream;
import java.util.Collection;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class QuestionServiceTest {

    @Test
    void shouldGetAllQuestions() {
        Question elem1 = new Question();
        elem1.setCategoryName("Java");
        elem1.setQuestion("Java OOP?");

        Question elem2 = new Question();
        elem2.setCategoryName("Python");
        elem2.setQuestion("Ist Python eine interpretierte Sprache?");

        List<Question> questionList = List.of(elem1, elem2);
        QuestionRepository repo = mock(QuestionRepository.class);

        when(repo.findAll()).thenReturn(questionList);

        QuestionService questionService = new QuestionService(repo);
        Collection<Question> actual = questionService.getQuestionList();

        assertThat(actual).isEqualTo(questionList);
    }

    @Test
    void shouldGetQuestionByCategorie() {
        Question elem = new Question();
        elem.setQuestion("Java OOP?");
        elem.setCategoryName("Java");

        List<Question> questionList = List.of(elem);
        QuestionRepository repo = mock(QuestionRepository.class);

        when(repo.findQuestionByCategoryName("Java")).thenReturn(questionList);

        QuestionService questionService = new QuestionService(repo);
        List<Question> actual = questionService.findByCategory("Java");

        assertThat(actual).isEqualTo(questionList);
    }

    @Test
    void shouldAddNewQuestion() {
        Question elem = new Question();
        elem.setQuestion("Java OOP?");

        Question savedElem = new Question();
        savedElem.setQuestion("Java OOP?");

        QuestionRepository questionRepository = mock(QuestionRepository.class);
        when(questionRepository.save(elem)).thenReturn(savedElem);

        QuestionService questionService = new QuestionService(questionRepository);
        Question actual = questionService.addQuestion(elem);

        assertThat(actual).isSameAs(savedElem);
    }

    @Test
    void shouldDeleteQuestionByID() {
        QuestionRepository repo = mock(QuestionRepository.class);
        QuestionService questionService = new QuestionService(repo);

        questionService.deleteQuestion("777");

        verify(repo).deleteById("777");
    }
    @Test
    void shouldImportCsv() {
        InputStream input = getClass().getResourceAsStream("/de.neuefische/question/data.csv");
        QuestionRepository questionRepository = mock(QuestionRepository.class);
        QuestionService questionService = new QuestionService(questionRepository);

        questionService.createQuestions(input);

        verify(questionRepository).saveAll(List.of(
                new Question(null, "Java", "Kann Java das OOP Konzept?", "true"),
                new Question(null, "Python", "Ist Python eine Interpreter Sprache?", "true")));
    }


}
package de.neuefische.question;

import de.neuefische.category.Category;
import de.neuefische.category.CategoryRepository;
import de.neuefische.category.CategoryService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Collection;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

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
        QuestionRepository repo = Mockito.mock(QuestionRepository.class);

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
        QuestionRepository repo = Mockito.mock(QuestionRepository.class);

        when(repo.findQuestionByCategoryName("Java")).thenReturn(questionList);

        QuestionService questionService = new QuestionService(repo);
        List<Question> actual = questionService.findByCategory("Java");

        assertThat(actual).isEqualTo(questionList);
    }

}
package de.neuefische.question;

import de.neuefische.user.UserDocument;
import de.neuefische.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.io.InputStream;
import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

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

        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        QuestionRepository questionRepository = mock(QuestionRepository.class);
        when(questionRepository.findAllByUserId("123")).thenReturn(List.of(elem1, elem2));

        QuestionService questionService = new QuestionService(questionRepository, userRepository);
        Collection<Question> actual = questionService.getQuestionList(principal);

        assertThat(actual.size()).isEqualTo(2);
    }

    @Test
    void shouldGetQuestionByCategoryAndUserId() {
        Question elem = new Question();
        elem.setQuestion("Java OOP?");
        elem.setCategoryName("Java");

        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        QuestionRepository questionRepository = mock(QuestionRepository.class);
        when(questionRepository.findQuestionByCategoryNameAndUserId("Java","123")).thenReturn(List.of(elem));

        QuestionService questionService = new QuestionService(questionRepository, userRepository);
        List<Question> actual = questionService.findByCategory("Java", principal);

        assertThat(actual.size()).isEqualTo(1);
    }

    @Test
    void shouldAddNewQuestion() {
        Question elem = new Question();
        elem.setQuestion("Java OOP?");

        Question savedElem = new Question();
        savedElem.setQuestion("Java OOP?");

        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        QuestionRepository questionRepository = mock(QuestionRepository.class);
        when(questionRepository.save(elem)).thenReturn(savedElem);

        QuestionService questionService = new QuestionService(questionRepository, userRepository);
        Question actual = questionService.addQuestion(elem);

        assertThat(actual).isSameAs(savedElem);
    }

    @Test
    void shouldDeleteQuestionByID() {
        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        QuestionRepository repo = mock(QuestionRepository.class);
        QuestionService questionService = new QuestionService(repo, userRepository);

        questionService.deleteQuestion("777");

        verify(repo).deleteById("777");
    }
    @Test
    void shouldImportCsv() {
        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        InputStream input = getClass().getResourceAsStream("/de.neuefische/question/data.csv");
        QuestionRepository questionRepository = mock(QuestionRepository.class);
        QuestionService questionService = new QuestionService(questionRepository, userRepository);

        questionService.createQuestions(input, user.getId());

        verify(questionRepository).saveAll(List.of(
                new Question(null, "Java", "Kann Java das OOP Konzept?", "true", "userId"),
                new Question(null, "Python", "Ist Python eine Interpreter Sprache?", "true", "userId")));
    }

    @Test
    void shouldChangeQuestion() {
        Question elem = new Question();
        elem.setId("777");
        elem.setCategoryName("Java");
        elem.setQuestion("Java kann das OOP Konzept.");
        elem.setQuestionState("true");

        Question savedQuestion = new Question();
        savedQuestion.setId("777");
        savedQuestion.setCategoryName("Java");
        savedQuestion.setQuestion("Java kann FP Konzepte.");
        savedQuestion.setQuestionState("true");

        UserDocument user = new UserDocument("123", "user@mail.de", "user","user","User");
        Principal principal = () -> "user@mail.de";

        UserRepository userRepository = Mockito.mock(UserRepository.class);
        when(userRepository.findByEmail("user@mail.de")).thenReturn(Optional.of(user));

        QuestionRepository repository = mock(QuestionRepository.class);
        when(repository.findById("777")).thenReturn(Optional.of(elem));

        QuestionService questionService = new QuestionService(repository, userRepository);

        questionService.changeQuestion("777", savedQuestion);

        verify(repository).save(savedQuestion);
    }


}
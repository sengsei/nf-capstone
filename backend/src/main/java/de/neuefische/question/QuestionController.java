package de.neuefische.question;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping
    public Collection<Question> getQuestionList(){
        return questionService.getQuestionList();
    }

    @GetMapping("/{category}")
    public List<Question> getQuestionListByCategory(@PathVariable String category) {
        return questionService.findByCategory(category);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Collection<Question> addQuestion(@RequestBody Question question) {
        questionService.addQuestion(question);
        return questionService.getQuestionList();
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable String id){
        questionService.deleteQuestion(id);
    }
}


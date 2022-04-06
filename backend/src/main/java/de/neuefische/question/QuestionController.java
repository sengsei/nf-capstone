package de.neuefische.question;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> createQuestions(@RequestParam("csv")MultipartFile file) throws IOException {
        ImportStatus importStatus = questionService.createQuestions(file.getInputStream());
        if (importStatus == ImportStatus.SUCCESS) {
            return ResponseEntity.ok().build();
        } else if (importStatus == ImportStatus.PARTIAL) {
            return ResponseEntity.unprocessableEntity().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public Collection<Question>changeQuestion(@PathVariable String id, @RequestBody Question question){
        questionService.changeQuestion(id, question);
        return questionService.getQuestionList();
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable String id){
        questionService.deleteQuestion(id);
    }
}


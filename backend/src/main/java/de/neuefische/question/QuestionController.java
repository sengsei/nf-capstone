package de.neuefische.question;


import de.neuefische.user.UserDocument;
import de.neuefische.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.IOException;
import java.security.Principal;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@RequiredArgsConstructor
@CrossOrigin
public class QuestionController {
    private final QuestionService questionService;
    private final UserService userService;

    @GetMapping
    public Collection<Question> getQuestionList(Principal principal){
        return questionService.getQuestionList(principal);
    }

    @GetMapping("/{category}")
    public List<Question> getQuestionListByCategory(@PathVariable String category, Principal principal) {
        return questionService.findByCategory(category, principal);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Collection<Question> addQuestion(@RequestBody Question question, Principal principal) {
        questionService.addQuestion(question, principal);
        return questionService.getQuestionList(principal);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Void> createQuestions(@RequestParam("csv")MultipartFile file, Principal principal) throws IOException {
        ImportStatus importStatus = questionService.createQuestions(file.getInputStream(), principal);
        if (importStatus == ImportStatus.SUCCESS) {
            return ResponseEntity.ok().build();
        } else if (importStatus == ImportStatus.PARTIAL) {
            return ResponseEntity.unprocessableEntity().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public Collection<Question>changeQuestion(@PathVariable String id, @RequestBody Question question, Principal principal){
        questionService.changeQuestion(id, question);
        return questionService.getQuestionList(principal);
    }

    @DeleteMapping("/{id}")
    public void deleteQuestion(@PathVariable String id, Principal principal){
        questionService.deleteQuestion(id, principal);
    }
}


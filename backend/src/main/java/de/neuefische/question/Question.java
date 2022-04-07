package de.neuefische.question;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {

    @Id
    private String id;
    private String categoryName;
    private String question;
    private String questionState;
    private String userId;
}

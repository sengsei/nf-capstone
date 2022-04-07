package de.neuefische.question;
import com.opencsv.bean.CsvBindByName;

public class CsvItem {
    @CsvBindByName
    private String question;
    @CsvBindByName
    private String categoryName;
    @CsvBindByName
    private String questionState;

    public Question toQuestion(String userId){
        return new Question(null, categoryName, question, questionState, userId);
    }

}

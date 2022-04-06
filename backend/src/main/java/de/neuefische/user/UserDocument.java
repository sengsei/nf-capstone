package de.neuefische.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDocument {

    @Id
    private String id;
    private String email;
    private String password;
    private String passwordAgain;
    private String role = "USER";
}

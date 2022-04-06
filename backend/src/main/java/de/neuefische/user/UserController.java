package de.neuefische.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserDocument user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setPasswordAgain(passwordEncoder.encode(user.getPasswordAgain()));
            userService.createUser(user);
            return ResponseEntity.status(201).body("user was created");
        } catch (UserAlreadyExistsException e){
            return ResponseEntity.status(409).body(e.getMessage());
        } catch (PasswordNotMatchException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

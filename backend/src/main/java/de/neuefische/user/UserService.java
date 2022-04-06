package de.neuefische.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDocument createUser(UserDocument user){
        if (findByEmail(user.getEmail()).isPresent()){
            throw new IllegalArgumentException();
        }
        return userRepository.save(user);
    }

    public Optional<UserDocument> findByEmail(String username){
        return userRepository.findByEmail(username);
    }
}

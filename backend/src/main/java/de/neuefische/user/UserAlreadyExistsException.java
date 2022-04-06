package de.neuefische.user;

public class UserAlreadyExistsException extends IllegalStateException {
    UserAlreadyExistsException() {
        super("user already exists");
    }
}

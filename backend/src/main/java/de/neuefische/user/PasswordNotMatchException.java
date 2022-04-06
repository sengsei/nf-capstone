package de.neuefische.user;

public class PasswordNotMatchException extends IllegalStateException {

    PasswordNotMatchException() {
        super("passwords do not match");
    }
}

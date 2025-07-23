package fpt.hsf302.movtube.services;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

    public String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    /**
     * Checks if the provided password matches the hashed password.
     *
     * @param password the plain text password to check
     * @param hashedPassword the hashed password to compare against
     * @return true if the passwords match, false otherwise
     */
    public boolean checkPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }
}

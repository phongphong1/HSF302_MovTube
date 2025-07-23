package fpt.hsf302.movtube.services;

import fpt.hsf302.movtube.entities.User;
import fpt.hsf302.movtube.entities.UserRole;
import fpt.hsf302.movtube.repositories.UserRepository;
import fpt.hsf302.movtube.repositories.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordService passwordService;
    private final UserRoleRepository userRoleRepository;

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(UserRepository userRepository, PasswordService passwordService, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
        this.userRoleRepository = userRoleRepository;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean authenticate(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        return userOpt.isPresent() && passwordService.checkPassword(password, userOpt.get().getPasswordHash());
    }

    public boolean registerUser(String username, String password, String email, String firstName, String lastName) {
        if (userRepository.findByUsername(username).isPresent()) {
            return false; // Username already exists
        }
        User user = new User();
        user.setUsername(username);
        user.setPasswordHash(passwordService.hashPassword(password));
        user.setEmail(email);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setRegistrationDate(LocalDateTime.now());
        userRepository.save(user);
        return true;
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public List<String> getRoleNamesByUser(User user) {
        List<String> roles = userRoleRepository.findByUser_Id(user.getId())
                .stream()
                .map(UserRole::getRole)
                .filter(role -> role != null && role.getName() != null)
                .map(role -> role.getName().trim().toUpperCase())
                .distinct()
                .collect(Collectors.toList());
        logger.info("User '{}' has roles: {}", user.getUsername(), roles);
        return roles;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }
}


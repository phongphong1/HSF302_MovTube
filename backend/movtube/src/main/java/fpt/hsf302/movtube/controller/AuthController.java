package fpt.hsf302.movtube.controller;

import fpt.hsf302.movtube.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthController {
    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("userForm", new UserRegistrationForm());
        return "register";
    }

    @PostMapping("/register")
    public String register(@ModelAttribute("userForm") UserRegistrationForm form, Model model) {
        boolean success = userService.registerUser(
                form.getUsername(),
                form.getPassword(),
                form.getEmail(),
                form.getFirstName(),
                form.getLastName()
        );
        if (success) {
            return "redirect:/login?registered";
        } else {
            model.addAttribute("error", "Username already exists");
            return "register";
        }
    }

    // DTO for registration form
    public static class UserRegistrationForm {
        private String username;
        private String password;
        private String email;
        private String firstName;
        private String lastName;
        // getters and setters
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getFirstName() { return firstName; }
        public void setFirstName(String firstName) { this.firstName = firstName; }
        public String getLastName() { return lastName; }
        public void setLastName(String lastName) { this.lastName = lastName; }
    }
}


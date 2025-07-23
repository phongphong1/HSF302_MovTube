package fpt.hsf302.movtube.controller;

import fpt.hsf302.movtube.entities.User;
import fpt.hsf302.movtube.services.PasswordService;
import fpt.hsf302.movtube.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserAdminController {
    private final UserService userService;
    private final PasswordService passwordService;

    @Autowired
    public UserAdminController(UserService userService) {
        this.userService = userService;
        this.passwordService = new PasswordService();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/users")
    public String userList(Model model) {
        model.addAttribute("users", userService.findAll());
        return "admin-users";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/users/add")
    public String showAddUserForm(Model model) {
        model.addAttribute("user", new User());
        return "admin-user-form";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/users/add")
    public String addUser(@ModelAttribute User user) {
        user.setPasswordHash(passwordService.hashPassword(user.getPasswordHash()));
        userService.save(user);
        return "redirect:/admin/users";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/users/edit/{id}")
    public String showEditUserForm(@PathVariable Integer id, Model model) {
        User user = userService.findById(id);
        if (user == null) return "redirect:/admin/users";
        model.addAttribute("user", user);
        return "admin-user-form";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/users/edit/{id}")
    public String editUser(@PathVariable Integer id, @ModelAttribute User user) {
        user.setId(id);
        user.setPasswordHash(passwordService.hashPassword(user.getPasswordHash()));
        userService.save(user);
        return "redirect:/admin/users";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/users/delete/{id}")
    public String deleteUser(@PathVariable Integer id) {
        userService.deleteById(id);
        return "redirect:/admin/users";
    }
}

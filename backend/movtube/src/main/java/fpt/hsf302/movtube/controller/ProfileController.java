package fpt.hsf302.movtube.controller;

import fpt.hsf302.movtube.entities.User;
import fpt.hsf302.movtube.services.UserService;
import fpt.hsf302.movtube.services.MovieService;
import java.util.List;
import fpt.hsf302.movtube.entities.Genre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class ProfileController {
    @Autowired
    private UserService userService;

    @Autowired
    private MovieService movieService;

    @GetMapping("/profile")
    public String profilePage(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        if (userDetails == null) return "redirect:/login";
        User user = userService.findByUsername(userDetails.getUsername()).orElse(null);
        if (user == null) return "redirect:/login";
        model.addAttribute("user", user);
        List<Genre> genres = movieService.getAllGenres();
        model.addAttribute("genres", genres);
        return "profile";
    }

    @PostMapping("/profile")
    public String updateProfile(@AuthenticationPrincipal UserDetails userDetails,
                               @ModelAttribute("user") User formUser,
                               Model model) {
        if (userDetails == null) return "redirect:/login";
        User user = userService.findByUsername(userDetails.getUsername()).orElse(null);
        if (user == null) return "redirect:/login";
        // Validate email (simple check)
        if (formUser.getEmail() == null || !formUser.getEmail().contains("@")) {
            model.addAttribute("user", user);
            model.addAttribute("error", "Email không hợp lệ!");
            model.addAttribute("genres", movieService.getAllGenres());
            return "profile";
        }
        user.setFirstName(formUser.getFirstName());
        user.setLastName(formUser.getLastName());
        user.setEmail(formUser.getEmail());
        userService.save(user);
        model.addAttribute("user", user);
        model.addAttribute("success", true);
        model.addAttribute("genres", movieService.getAllGenres());
        return "profile";
    }


}

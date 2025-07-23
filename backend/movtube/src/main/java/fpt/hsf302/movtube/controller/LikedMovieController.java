package fpt.hsf302.movtube.controller;

import fpt.hsf302.movtube.entities.Movie;
import fpt.hsf302.movtube.entities.User;
import fpt.hsf302.movtube.services.LikedMovieService;
import fpt.hsf302.movtube.services.MovieService;
import fpt.hsf302.movtube.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class LikedMovieController {
    @Autowired
    private LikedMovieService likedMovieService;
    @Autowired
    private UserService userService;
    @Autowired
    private MovieService movieService;

    @GetMapping("/favorites")
    public String favoritesPage(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        if (userDetails == null) return "redirect:/login";
        User user = userService.findByUsername(userDetails.getUsername()).orElse(null);
        if (user == null) return "redirect:/login";
        model.addAttribute("favorites", likedMovieService.getLikedMoviesByUser(user));
        model.addAttribute("genres", movieService.getAllGenres());
        return "favorites";
    }

    @PostMapping("/favorites/toggle/{movieId}")
    public String toggleFavorite(@PathVariable Integer movieId, @AuthenticationPrincipal UserDetails userDetails, @RequestHeader(value = "Referer", required = false) String referer) {
        if (userDetails == null) return "redirect:/login";
        User user = userService.findByUsername(userDetails.getUsername()).orElse(null);
        if (user == null) return "redirect:/login";
        Movie movie = movieService.getMovieById(movieId);
        if (movie == null) return "redirect:/movies";
        if (likedMovieService.isLiked(user, movie)) {
            likedMovieService.removeLike(user, movie);
        } else {
            likedMovieService.addLike(user, movie);
        }
        return "redirect:" + (referer != null ? referer : "/movies");
    }
}

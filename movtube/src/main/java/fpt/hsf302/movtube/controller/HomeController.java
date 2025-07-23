package fpt.hsf302.movtube.controller;


import fpt.hsf302.movtube.entities.Genre;
import fpt.hsf302.movtube.entities.Movie;
import fpt.hsf302.movtube.services.MovieService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/")
public class HomeController {

    private MovieService movieService;

    public HomeController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public String home(Model model) {
        List<Movie> featuredMovies = movieService.getFeaturedMovies();
        List<Movie> newMovies = movieService.getNewMovies();
        List<Genre> genres = movieService.getAllGenres();

        model.addAttribute("featuredMovies", featuredMovies);
        model.addAttribute("newMovies", newMovies);
        model.addAttribute("genres", genres);
        return "home";
    }
}

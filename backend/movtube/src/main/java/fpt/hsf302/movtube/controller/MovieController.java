package fpt.hsf302.movtube.controller;

import fpt.hsf302.movtube.dtos.MoviesWithPaginationDTO;
import fpt.hsf302.movtube.dtos.PlayerDTO;
import fpt.hsf302.movtube.entities.Episode;
import fpt.hsf302.movtube.entities.Genre;
import fpt.hsf302.movtube.entities.Movie;
import fpt.hsf302.movtube.entities.User;
import fpt.hsf302.movtube.services.LikedMovieService;
import fpt.hsf302.movtube.services.MovieService;
import fpt.hsf302.movtube.services.UserService;
import jakarta.persistence.SecondaryTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Controller
@RequestMapping("/movies")
public class MovieController {

    private final MovieService movieService;
    private final LikedMovieService likedMovieService;
    private final UserService userService;

    @Autowired
    public MovieController(MovieService movieService, LikedMovieService likedMovieService, UserService userService) {
        this.movieService = movieService;
        this.likedMovieService = likedMovieService;
        this.userService = userService;
    }

    @GetMapping
    public String getMoviesWithFilters(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Integer genreId,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear,
            @RequestParam(required = false, defaultValue = "0") BigDecimal minRating,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDirection,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "15") Integer size,
            Model model) {


        MoviesWithPaginationDTO moviesWithPaginationDTO = movieService.getAllMoviesWithFilter(
                query,
                genreId,
                fromYear,
                toYear,
                minRating,
                sortBy,
                sortDirection,
                page,
                size
        );
        List<Genre> genres = movieService.getAllGenres();

        model.addAttribute("movies", moviesWithPaginationDTO.getMovies());
        model.addAttribute("pagination", moviesWithPaginationDTO.getPagination());
        model.addAttribute("sortBy", sortBy);
        model.addAttribute("minRating", minRating);
        model.addAttribute("genres", genres);
        model.addAttribute("genreId", genreId);
        model.addAttribute("fromYear", fromYear != null ? fromYear : 1900);
        model.addAttribute("toYear", toYear != null ? toYear : java.time.Year.now().getValue());
        model.addAttribute("query", query);
        model.addAttribute("currentYear", java.time.Year.now().getValue());

        return "movies";
    }

    @GetMapping("/{id}")
    public String getMovieById(@PathVariable Integer id, Model model, @AuthenticationPrincipal UserDetails userDetails) {
        Movie movie = movieService.getMovieById(id);
        if (movie == null) {
            return "not-found";
        }
        model.addAttribute("movie", movie);
        boolean isFavorite = false;
        if (userDetails != null) {
            User user = userService.findByUsername(userDetails.getUsername()).orElse(null);
            if (user != null) {
                isFavorite = likedMovieService.isLiked(user, movie);
            }
        }
        model.addAttribute("isFavorite", isFavorite);
        return "movie-detail";
    }

    @GetMapping("/watch/{id}")
    public String getEpisodeForWatch(@PathVariable Integer id, Model model) {

        PlayerDTO player = movieService.getEpisodeById(id);
        model.addAttribute("player", player);
        return "movie-player";
    }
}

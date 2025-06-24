package fpt.hsf302.movtube.controller;


import fpt.hsf302.movtube.dtos.HomeMovieDTO;
import fpt.hsf302.movtube.dtos.MoviesWithPaginationDTO;
import fpt.hsf302.movtube.entities.Genre;
import fpt.hsf302.movtube.entities.Movie;
import fpt.hsf302.movtube.entities.MovieGenre;
import fpt.hsf302.movtube.repositories.MovieGenreRepository;
import fpt.hsf302.movtube.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "*")
public class MovieController {

    private MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public HomeMovieDTO getHomeMovies() {

        HomeMovieDTO homeMovieDTO = new HomeMovieDTO();
        homeMovieDTO.setFeaturedMovies(movieService.getFeaturedMovies());
        homeMovieDTO.setNewMovies(movieService.getNewMovies());
        homeMovieDTO.setGenres(movieService.getAllGenres());
        return homeMovieDTO;
    }

    @GetMapping("/search")
    public MoviesWithPaginationDTO getMoviesWithFilters(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) Integer genreId,
            @RequestParam(required = false) Integer fromYear,
            @RequestParam(required = false) Integer toYear,
            @RequestParam(required = false) BigDecimal minRating,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortDirection,
            @RequestParam(required = false, defaultValue = "0") Integer page,
            @RequestParam(required = false, defaultValue = "15") Integer size) {


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

        return moviesWithPaginationDTO;
    }

    @GetMapping("/{id}")
    public Movie getMovieById(@PathVariable Integer id) {
        return movieService.getMovieById(id);
    }
}

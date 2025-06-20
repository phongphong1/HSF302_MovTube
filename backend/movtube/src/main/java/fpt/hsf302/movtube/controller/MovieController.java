package fpt.hsf302.movtube.controller;


import fpt.hsf302.movtube.dtos.HomeMovieDTO;
import fpt.hsf302.movtube.entities.Genre;
import fpt.hsf302.movtube.entities.Movie;
import fpt.hsf302.movtube.entities.MovieGenre;
import fpt.hsf302.movtube.repositories.MovieGenreRepository;
import fpt.hsf302.movtube.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private MovieService movieService;

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
}

package fpt.hsf302.movtube.controller;


import fpt.hsf302.movtube.entities.MovieGenre;
import fpt.hsf302.movtube.repositories.MovieGenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/movie")
public class MovieController {
    private MovieGenreRepository repository;


    public MovieController(MovieGenreRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public MovieGenre getMovie() {
        return repository.findAll().get(0);
    }
}

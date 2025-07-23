package fpt.hsf302.movtube.controller;

import fpt.hsf302.movtube.services.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Page;
import fpt.hsf302.movtube.entities.Movie;
import fpt.hsf302.movtube.services.GenreService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ModelAttribute;

@Controller
public class MovieAdminController {
    private final MovieService movieService;
    private final GenreService genreService;

    @Autowired
    public MovieAdminController(MovieService movieService, GenreService genreService) {
        this.movieService = movieService;
        this.genreService = genreService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/movies")
    public String movieList(Model model, @RequestParam(defaultValue = "1") int page) {
        int pageSize = 30;
        Page<Movie> moviesPage = movieService.findAllPaged(page - 1, pageSize);
        model.addAttribute("movies", moviesPage.getContent());
        model.addAttribute("currentPage", moviesPage.getNumber() + 1);
        model.addAttribute("totalPages", moviesPage.getTotalPages());
        return "admin-movies";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/movies/add")
    public String showAddForm(Model model) {
        model.addAttribute("movie", new Movie());
        model.addAttribute("genres", genreService.findAll());
        return "admin-movie-form";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/movies/add")
    public String addMovie(@ModelAttribute Movie movie) {
        movieService.save(movie);
        return "redirect:/admin/movies";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/movies/edit/{id}")
    public String showEditForm(@PathVariable Integer id, Model model) {
        Movie movie = movieService.getMovieById(id);
        if (movie == null) return "redirect:/admin/movies";
        model.addAttribute("movie", movie);
        model.addAttribute("genres", genreService.findAll());
        return "admin-movie-form";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/movies/edit/{id}")
    public String editMovie(@PathVariable Integer id, @ModelAttribute Movie movie) {
        movie.setId(id);
        movieService.save(movie);
        return "redirect:/admin/movies";
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/admin/movies/delete/{id}")
    public String deleteMovie(@PathVariable Integer id) {
        movieService.deleteById(id);
        return "redirect:/admin/movies";
    }
}

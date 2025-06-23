package fpt.hsf302.movtube.services;

import fpt.hsf302.movtube.dtos.MoviesWithPaginationDTO;
import fpt.hsf302.movtube.entities.Genre;
import fpt.hsf302.movtube.entities.Movie;
import fpt.hsf302.movtube.entities.Pagination;
import fpt.hsf302.movtube.repositories.GenreRepository;
import fpt.hsf302.movtube.repositories.MovieGenreRepository;
import fpt.hsf302.movtube.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class MovieService {
    private MovieGenreRepository movieGenreRepository;
    private MovieRepository movieRepository;
    private GenreRepository genreRepository;

    @Autowired
    public MovieService(MovieGenreRepository movieGenreRepository,
                        MovieRepository movieRepository,
                        GenreRepository genreRepository) {

        this.movieGenreRepository = movieGenreRepository;
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;

    }

    /**
     * Retrieves a list of featured movies, which are the top 4 movies ordered by average rating.
     *
     * @return a list of featured movies
     */
    public List<Movie> getFeaturedMovies() {
        return movieRepository.findTop4ByOrderByAverageRatingDesc();
    }

    /**
     * Retrieves a list of new movies, which are the top 3 movies ordered by year in descending order.
     *
     * @return a list of new movies
     */
    public List<Movie> getNewMovies() {
        return movieRepository.findTop3ByOrderByYearDesc();
    }

    /**
     * Retrieves a list of all genres available in the database.
     *
     * @return a list of all genres
     */
    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public MoviesWithPaginationDTO getAllMoviesWithFilter(String query,
                                              Integer genreId,
                                              Integer fromYear,
                                              Integer toYear,
                                              BigDecimal minRating,
                                              String sortBy,
                                              String sortDirection,
                                              Integer page,
                                              Integer size) {
        Pageable pageable;
        if (sortBy != null && !sortBy.isBlank()) {
            pageable = PageRequest.of(page, size, Sort.by(sortBy, sortDirection));
        }else{
            pageable = PageRequest.of(page, size);
        }
        Genre genre = null;
        if(genreId != null){
            genre = genreRepository.findById(genreId).orElse(null);
        }

        Page<Movie> movies = movieRepository.getMoviesWithFilters(query, genre, fromYear, toYear, minRating, pageable);
        Pagination pagination = new Pagination();
        pagination.setCurrentPage(page);
        pagination.setTotalPages(movies.getTotalPages());
        pagination.setItemsPerPage(size);
        pagination.setTotalItems((int)movies.getTotalElements());

        MoviesWithPaginationDTO result = new MoviesWithPaginationDTO(movies.getContent(), pagination);

        return result;
    }


}

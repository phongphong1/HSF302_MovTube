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

    /**
     * Retrieves a paginated list of movies based on various filters such as query, genre, year range, minimum rating,
     * sorting options, and pagination parameters.
     *
     * @param query         the search query for movie titles
     * @param genreId      the ID of the genre to filter by
     * @param fromYear     the starting year for filtering movies
     * @param toYear       the ending year for filtering movies
     * @param minRating    the minimum average rating for filtering movies
     * @param sortBy       the field to sort by
     * @param sortDirection the direction of sorting (asc or desc)
     * @param page         the page number for pagination
     * @param size         the number of items per page
     * @return a DTO containing a list of movies and pagination information
     */
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
            pageable = PageRequest.of(page, size, Sort.by(sortDirection.equalsIgnoreCase("asc")?Sort.Direction.ASC: Sort.Direction.DESC ,sortBy));
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


    /**
     * Retrieves a movie by its ID.
     *
     * @param id the ID of the movie to retrieve
     * @return the movie with the specified ID, or null if not found
     */
    public Movie getMovieById(Integer id) {
        return movieRepository.findById(id).orElse(null);
    }


}

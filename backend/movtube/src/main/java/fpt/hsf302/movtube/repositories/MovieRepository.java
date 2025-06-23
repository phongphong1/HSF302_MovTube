package fpt.hsf302.movtube.repositories;

import fpt.hsf302.movtube.entities.Genre;
import fpt.hsf302.movtube.entities.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findTop4ByOrderByAverageRatingDesc();

    List<Movie> findTop3ByOrderByYearDesc();

    @Query("SELECT m FROM Movie m " +
            "WHERE (LOWER(m.title) LIKE LOWER(CONCAT('%', :query, '%')) OR :query IS NULL) " +
            "AND (:genre IS NULL OR :genre MEMBER OF m.genres) " +
            "AND (m.year >= :fromYear OR :fromYear IS NULL) " +
            "AND (m.year <= :toYear OR :toYear IS NULL) " +
            "AND (m.averageRating >= :minRating OR :minRating IS NULL)")
    Page<Movie> getMoviesWithFilters(String query,
                                         Genre genre,
                                         Integer fromYear,
                                         Integer toYear,
                                         BigDecimal minRating,
                                        Pageable pageable);

}

package fpt.hsf302.movtube.repositories;

import fpt.hsf302.movtube.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findTop4ByOrderByAverageRatingDesc();

    List<Movie> findTop3ByOrderByYearDesc();
}

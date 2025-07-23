package fpt.hsf302.movtube.repositories;

import fpt.hsf302.movtube.entities.LikedMovie;
import fpt.hsf302.movtube.entities.LikedMovieId;
import fpt.hsf302.movtube.entities.Movie;
import fpt.hsf302.movtube.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LikedMovieRepository extends JpaRepository<LikedMovie, LikedMovieId> {
    List<LikedMovie> findByUser(User user);
    Optional<LikedMovie> findByUserAndMovie(User user, Movie movie);
    void deleteByUserAndMovie(User user, Movie movie);
    void deleteByUserIdAndMovieId(Integer userId, Integer movieId);
}

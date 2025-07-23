package fpt.hsf302.movtube.services;

import fpt.hsf302.movtube.entities.LikedMovie;
import fpt.hsf302.movtube.entities.LikedMovieId;
import fpt.hsf302.movtube.entities.Movie;
import fpt.hsf302.movtube.entities.User;
import fpt.hsf302.movtube.repositories.LikedMovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LikedMovieService {
    @Autowired
    private LikedMovieRepository likedMovieRepository;

    public List<LikedMovie> getLikedMoviesByUser(User user) {
        return likedMovieRepository.findByUser(user);
    }

    public boolean isLiked(User user, Movie movie) {
        return likedMovieRepository.findByUserAndMovie(user, movie).isPresent();
    }

    public void addLike(User user, Movie movie) {
        if (!isLiked(user, movie)) {
            LikedMovie likedMovie = new LikedMovie();
            likedMovie.setUser(user);
            likedMovie.setMovie(movie);
            LikedMovieId id = new LikedMovieId();
            id.setUserId(user.getId());
            id.setMovieId(movie.getId());
            likedMovie.setId(id);
            likedMovieRepository.save(likedMovie);
        }
    }

    @Transactional
    public void removeLike(User user, Movie movie) {
        likedMovieRepository.deleteByUserIdAndMovieId(user.getId(), movie.getId());
    }
}

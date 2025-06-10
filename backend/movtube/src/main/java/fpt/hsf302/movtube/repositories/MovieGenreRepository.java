package fpt.hsf302.movtube.repositories;

import fpt.hsf302.movtube.entities.MovieGenre;
import fpt.hsf302.movtube.entities.MovieGenreId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieGenreRepository extends JpaRepository<MovieGenre, MovieGenreId> {
}

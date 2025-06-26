package fpt.hsf302.movtube.repositories;

import fpt.hsf302.movtube.entities.Episode;
import fpt.hsf302.movtube.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EpisodeRepository extends JpaRepository<Episode, Integer> {
    Episode findByMovieAndOrderNumber(Movie movie, Integer orderNumber);
}

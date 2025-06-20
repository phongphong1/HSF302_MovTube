package fpt.hsf302.movtube.repositories;

import fpt.hsf302.movtube.entities.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Integer> {

}

package fpt.hsf302.movtube.dtos;

import fpt.hsf302.movtube.entities.Genre;
import fpt.hsf302.movtube.entities.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class HomeMovieDTO {
    private List<Movie> featuredMovies;
    private List<Movie> newMovies;
    private List<Genre> genres;
}

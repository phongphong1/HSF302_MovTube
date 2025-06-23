package fpt.hsf302.movtube.dtos;

import fpt.hsf302.movtube.entities.Movie;
import fpt.hsf302.movtube.entities.Pagination;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class MoviesWithPaginationDTO {
    List<Movie> movies;
    Pagination pagination;
}

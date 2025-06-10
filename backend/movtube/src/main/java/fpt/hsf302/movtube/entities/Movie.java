package fpt.hsf302.movtube.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Nationalized
    @Column(name = "title")
    private String title;

    @Nationalized
    @Column(name = "original_name")
    private String originalName;

    @Column(name = "\"year\"")
    private Integer year;

    @Nationalized
    @Lob
    @Column(name = "synopsis")
    private String synopsis;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "poster_url")
    private String posterUrl;

    @Column(name = "average_rating", precision = 4, scale = 2)
    private BigDecimal averageRating;

    @Column(name = "total_episodes")
    private Integer totalEpisodes;

}
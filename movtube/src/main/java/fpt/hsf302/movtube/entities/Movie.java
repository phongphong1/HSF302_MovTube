package fpt.hsf302.movtube.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.Set;

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

    @Column(name = "year")
    private Integer year;

    @Nationalized
    @Lob
    @Column(name = "synopsis", columnDefinition = "NTEXT")
    private String synopsis;

    @Column(name = "duration_minutes")
    private Integer durationMinutes;

    @Column(name = "poster_url")
    private String posterUrl;

    @Column(name = "average_rating", precision = 4, scale = 2)
    private BigDecimal averageRating;

    @Column(name = "total_episodes")
    private Integer totalEpisodes;

    @ManyToMany
    @JoinTable(name = "movie_genres",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private Set<Genre> genres = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(name = "movie_actors",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "person_id"))
    private Set<Person> actors = new LinkedHashSet<>();


    @ManyToMany
    @JoinTable(name = "movie_directors",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "person_id"))
    private Set<Person> directors = new LinkedHashSet<>();

    @Column(name = "thumbnail_url")
    private String thumbnailUrl;

    @Column(name = "trailer_url")
    private String trailerUrl;

    @OneToMany(mappedBy = "movie")
    @OrderBy("orderNumber ASC")
    private Set<Episode> episodes = new LinkedHashSet<>();

}
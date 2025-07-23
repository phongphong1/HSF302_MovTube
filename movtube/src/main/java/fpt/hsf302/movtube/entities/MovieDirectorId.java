package fpt.hsf302.movtube.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class MovieDirectorId implements Serializable {
    @Column(name = "movie_id", nullable = false)
    private Integer movieId;

    @Column(name = "person_id", nullable = false)
    private Integer personId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        MovieDirectorId entity = (MovieDirectorId) o;
        return Objects.equals(this.movieId, entity.movieId) &&
                Objects.equals(this.personId, entity.personId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(movieId, personId);
    }

}
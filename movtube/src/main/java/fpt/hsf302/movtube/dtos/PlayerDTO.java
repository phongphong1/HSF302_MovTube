package fpt.hsf302.movtube.dtos;

import fpt.hsf302.movtube.entities.Episode;
import fpt.hsf302.movtube.entities.Movie;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class PlayerDTO {
    private Integer episodeId;
    private String title;
    private String originalName;
    private String videoUrl;
    private String posterUrl;
    private Integer episode;
    private Integer nextEpisodeId;
    private Integer prevEpisodeId;
    private Set<Episode> episodes;
    private Movie movie;

    public PlayerDTO(Episode episode, Integer episodeNumber, Integer nextEpisodeId, Integer prevEpisodeId) {
        this.episodeId = episode.getId();
        this.title = episode.getMovie().getTitle();
        this.originalName = episode.getMovie().getOriginalName();
        this.videoUrl = episode.getUrl();
        this.posterUrl = episode.getMovie().getThumbnailUrl();
        this.episode = episodeNumber;
        this.nextEpisodeId = nextEpisodeId;
        this.prevEpisodeId = prevEpisodeId;
        this.episodes = episode.getMovie().getEpisodes();
        this.movie = episode.getMovie();
    }
}

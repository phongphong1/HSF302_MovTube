import type { MoviePlayerData } from "../components/player/PlayerTypes";
import { useEffect, useState } from "react";

const API_URL = `${import.meta.env.VITE_API_URL}/movies/watch`;

export function useMoviePlayer(episodeId: string) {
    const [data, setData] = useState<MoviePlayerData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
            if (!episodeId) return;
    
            setLoading(true);
            setError(null);
    
            fetch(`${API_URL}/${episodeId}`)
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to fetch movie detail');
                    return res.json();
                })
                .then((json) => {
                    // Ensure json is of type MoviePlayerData
                    const movieData: MoviePlayerData = {
                        id: json.episodeId,
                        title: json.title,
                        originalName: json.originalName,
                        videoUrl: json.videoUrl,
                        posterUrl: json.posterUrl,
                        episode: json.episode || 0,
                        prevEpisodeId: json.prevEpisodeId || null,
                        nextEpisodeId: json.nextEpisodeId || null,
                        episodes: json.episodes || [],
                    };
                    setData(movieData);
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false));
        }, [episodeId]);
    
        return { data, loading, error };
}
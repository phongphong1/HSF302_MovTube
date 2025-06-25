import { useEffect, useState } from 'react';

interface Genre{
    id: number;
    name: string;
}

interface People{
    id: string;
    name: string;
}

interface Episodes{
    id: string;
    orderNumber: number;
    url: string;
}
interface MovieDetail {
    id: string;
    title: string;
    originalName: string;
    synopsis: string;
    year: number;
    durationMinutes: number;
    genres: Genre[];
    averageRating: number;
    totalEpisodes: number;
    actors: People[];
    directors: People[];
    posterUrl: string;
    thumbnailUrl: string;
    trailerUrl?: string;
    episodes?: Episodes[];
}

interface UseMovieDetailResult {
    data: MovieDetail | null;
    loading: boolean;
    error: string | null;
}

const API_URL = `${import.meta.env.VITE_API_URL}/movies`;

export function useMovieDetail(movieId: string): UseMovieDetailResult {
    const [data, setData] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!movieId) return;

        setLoading(true);
        setError(null);

        fetch(`${API_URL}/${movieId}`)
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch movie detail');
                return res.json();
            })
            .then((json) => setData(json))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [movieId]);

    return { data, loading, error };
}
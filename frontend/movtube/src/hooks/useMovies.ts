import { useState, useEffect } from 'react';
import type { Movie, Genre } from '../types';

// Types for the hook
interface UseMoviesReturn {
  featuredMovies: Movie[];
  newMovies: Movie[];
  genres: Genre[];
  isLoading: boolean;
  error: Error | null;
}


// API URL using Vite's development proxy to avoid CORS issues
const API_URL = '/api/movies';

/**
 * Custom hook to fetch movie data
 * @returns Object containing fetched movies and status
 */
export const useMovies = (): UseMoviesReturn => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [newMovies, setNewMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
        try {
        const fetchOptions = {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        };
        
        const response = await fetch(API_URL, fetchOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // For debugging
        
        setFeaturedMovies(data.featuredMovies || []);
        setNewMovies(data.newMovies || []);
        setGenres(data.genres || []);
          } catch (err: unknown) {
        console.error('Error fetching movies:', err);
        
        // Show detailed error for debugging
        const errorMessage = err instanceof Error 
          ? `${err.name}: ${err.message}` 
          : 'An unknown error occurred';
        
        setError(new Error(errorMessage));
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return {
    featuredMovies,
    newMovies,
    genres,
    isLoading,
    error
  };
};

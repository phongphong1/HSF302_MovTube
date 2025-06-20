export interface Movie {
  id: number;
  title: string;
  originalName?: string; 
  year: number;
  synopsis?: string;
  durationMinutes: number;
  posterUrl: string;
  averageRating: number;
  totalEpisodes: number;
  genres?: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieCardProps {
  movie: Movie;
}

export type SortOption = "rating" | "year" | "title";

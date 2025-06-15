export interface Movie {
  id: string;
  title: string;
  image: string;
  poster?: string;
  backdrop?: string;
  rating: number;
  year: number;
  releaseDate?: string;
  genres: string[];
  duration: string;
  director?: string;
  writers?: string[];
  stars?: string[];
  plot?: string;
  trailer?: string;
  similar?: string[];
}

export interface MovieCardProps {
  movie: Movie;
}

export type SortOption = "rating" | "year" | "title";

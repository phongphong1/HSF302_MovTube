export interface Movie {
  id: string | number;
  title: string;
  originalName?: string; 
  year: number;
  synopsis?: string;
  durationMinutes?: number;
  posterUrl?: string;
  image?: string;
  poster?: string;
  backdrop?: string;
  averageRating: number;
  rating?: number;
  totalEpisodes?: number;
  genres?: (string | Genre)[];
  duration?: string;
  director?: string;
  writers?: string[];
  stars?: string[];
  plot?: string;
  trailer?: string;
  similar?: string[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieCardProps {
  movie: Movie;
}

export type SortOption = "averageRating" | "year" | "title" | null;
export type SortDirection = "asc" | "desc";

export interface FilterOptions {
  searchTerm: string;
  minRating: number;
  yearFrom: number;
  yearTo: number;
  selectedGenre: string;
  sortBy: SortOption;
  sortDirection: SortDirection;
  itemsPerPage: number;
  currentPage: number;
}

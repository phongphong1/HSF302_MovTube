import type { Movie } from "../types";

/**
 * Lấy giá trị đánh giá từ một bộ phim, xem xét cả averageRating và rating
 */
export const getMovieRating = (movie: Movie): number => {
  return movie.averageRating || movie.rating || 0;
};

/**
 * Lấy URL hình ảnh poster của phim
 */
export const getMoviePosterUrl = (movie: Movie): string => {
  return movie.posterUrl || movie.image || movie.poster || '';
};

/**
 * Format các thể loại phim thành chuỗi với giới hạn số lượng hiển thị
 */
export const formatGenres = (movie: Movie, limit: number = 2): string => {
  if (!movie.genres || !Array.isArray(movie.genres) || movie.genres.length === 0) {
    return 'Không có thể loại';
  }
  
  const genres = movie.genres.map(g => 
    typeof g === 'string' ? g : g?.name || ''
  ).filter(Boolean);
  
  if (genres.length <= limit) {
    return genres.join(', ');
  }
  
  return `${genres.slice(0, limit).join(', ')} +${genres.length - limit}`;
};

/**
 * Tạo URL chi tiết phim
 */
export const getMovieDetailUrl = (movieId: string | number): string => {
  return `/movies/${movieId}`;
};

/**
 * Format thời lượng phim
 */
export const formatDuration = (minutes: number): string => {
  if (!minutes) return '';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins} phút`;
  if (mins === 0) return `${hours}h`;
  
  return `${hours}h ${mins}m`;
};

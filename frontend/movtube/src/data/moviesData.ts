import type { Movie } from '../types';

// Mock movie data
export const allMovies: Movie[] = [
  {
    id: "1",
    title: "Interstellar Odyssey",
    image: "https://picsum.photos/seed/movie1/300/450",
    poster: "https://picsum.photos/seed/movie1poster/300/450",
    backdrop: "https://picsum.photos/seed/movie1backdrop/1920/1080",
    rating: 4.8,
    year: 2025,
    releaseDate: "June 10, 2025",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    duration: "2h 35m",
    director: "Christopher Anderson",
    writers: ["Emma Johnson", "Michael Lee"],
    stars: ["James Wilson", "Sophia Martinez", "David Kim"],
    plot: "In the year 2157, humanity faces extinction as Earth's resources dwindle. A team of astronauts embarks on a perilous journey through a newly discovered wormhole near Saturn, hoping to find a habitable planet in another galaxy. As they navigate through space and time, they must confront scientific paradoxes, the limits of human endurance, and the powerful force of love that transcends dimensions.",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    similar: ["2", "7", "3"]
  },
  {
    id: "2",
    title: "Midnight Symphony",
    image: "https://picsum.photos/seed/movie2/300/450",
    poster: "https://picsum.photos/seed/movie2poster/300/450",
    backdrop: "https://picsum.photos/seed/movie2backdrop/1920/1080",
    rating: 4.6,
    year: 2025,
    releaseDate: "March 15, 2025",
    genres: ["Drama", "Music", "Romance"],
    duration: "2h 10m",
    director: "Olivia Chen",
    writers: ["Robert Taylor", "Lisa Wong"],
    stars: ["Thomas Parker", "Emily Davis", "Alexander Wright"],
    plot: "A gifted but troubled pianist returns to her hometown after a decade-long absence to face the ghosts of her past. As she prepares for the performance of a lifetime, she reconnects with her former mentor and a childhood friend who now leads the orchestra. Through music, she finds healing and redemption, learning that some harmonies can only be discovered through discord and reconciliation.",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    similar: ["5", "11", "4"]
  },
  {
    id: "3",
    title: "Neon Warriors",
    image: "https://picsum.photos/seed/movie3/300/450",
    rating: 4.7,
    year: 2025,
    genres: ["Action", "Cyberpunk"],
    duration: "1h 55m",
  },
  {
    id: "4",
    title: "Whispers in the Forest",
    image: "https://picsum.photos/seed/movie4/300/450",
    rating: 4.5,
    year: 2024,
    genres: ["Horror", "Thriller"],
    duration: "1h 48m",
  },
  {
    id: "5",
    title: "Eternal Echo",
    image: "https://picsum.photos/seed/movie5/300/450",
    rating: 4.9,
    year: 2025,
    genres: ["Romance", "Fantasy"],
    duration: "2h 15m",
  },
  {
    id: "6",
    title: "Desert Mirage",
    image: "https://picsum.photos/seed/movie6/300/450",
    rating: 4.4,
    year: 2025,
    genres: ["Adventure", "Drama"],
    duration: "2h 05m",
  },
  {
    id: "7",
    title: "Quantum Paradox",
    image: "https://picsum.photos/seed/movie7/300/450",
    rating: 4.7,
    year: 2024,
    genres: ["Sci-Fi", "Mystery"],
    duration: "2h 20m",
  },
  {
    id: "8",
    title: "Urban Legends",
    image: "https://picsum.photos/seed/movie8/300/450",
    rating: 4.2,
    year: 2024,
    genres: ["Crime", "Drama"],
    duration: "1h 50m",
  },
  {
    id: "9",
    title: "Sunrise Kingdom",
    image: "https://picsum.photos/seed/movie9/300/450",
    rating: 4.8,
    year: 2025,
    genres: ["Animation", "Adventure"],
    duration: "1h 45m",
  },
  {
    id: "10",
    title: "Midnight Runners",
    image: "https://picsum.photos/seed/movie10/300/450",
    rating: 4.3,
    year: 2023,
    genres: ["Action", "Comedy"],
    duration: "1h 58m",
  },
  {
    id: "11",
    title: "Forgotten Dreams",
    image: "https://picsum.photos/seed/movie11/300/450",
    rating: 4.6,
    year: 2024,
    genres: ["Drama", "Mystery"],
    duration: "2h 12m",
  },
  {
    id: "12",
    title: "Steel Thunder",
    image: "https://picsum.photos/seed/movie12/300/450",
    rating: 4.4,
    year: 2023,
    genres: ["Action", "War"],
    duration: "2h 08m",
  },
];

// Create a list of all genres
export const allGenres = [...new Set(allMovies.flatMap(movie => movie.genres))].sort();

// Function to get a movie by ID
export const getMovieById = (id: string): Movie | undefined => {
  return allMovies.find(movie => movie.id === id);
};

// Function to get similar movies
export const getSimilarMovies = (movieId: string, limit: number = 4): Movie[] => {
  const movie = getMovieById(movieId);
  if (!movie || !movie.similar) {
    // Return random movies if no similar ones defined
    return allMovies
      .filter(m => m.id !== movieId)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit);
  }
  
  return movie.similar
    .map(id => getMovieById(id))
    .filter((movie): movie is Movie => movie !== undefined)
    .slice(0, limit);
};

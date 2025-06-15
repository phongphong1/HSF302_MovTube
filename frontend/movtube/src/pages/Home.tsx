import React from "react";
import { Link } from "react-router-dom";

// Mock data for featured movies
const featuredMovies = [
  {
    id: "1",
    title: "Interstellar Odyssey",
    image: "https://picsum.photos/seed/movie1/300/450",
    rating: 4.8,
    year: 2025,
    genres: ["Sci-Fi", "Adventure"],
  },
  {
    id: "2",
    title: "Midnight Symphony",
    image: "https://picsum.photos/seed/movie2/300/450",
    rating: 4.6,
    year: 2025,
    genres: ["Drama", "Music"],
  },
  {
    id: "3",
    title: "Neon Warriors",
    image: "https://picsum.photos/seed/movie3/300/450",
    rating: 4.7,
    year: 2025,
    genres: ["Action", "Cyberpunk"],
  },
  {
    id: "4",
    title: "Whispers in the Forest",
    image: "https://picsum.photos/seed/movie4/300/450",
    rating: 4.5,
    year: 2024,
    genres: ["Horror", "Thriller"],
  },
];

// Mock data for trending movies
const trendingMovies = [
  {
    id: "5",
    title: "Eternal Echo",
    image: "https://picsum.photos/seed/movie5/300/450",
    rating: 4.9,
    year: 2025,
    genres: ["Romance", "Fantasy"],
  },
  {
    id: "6",
    title: "Desert Mirage",
    image: "https://picsum.photos/seed/movie6/300/450",
    rating: 4.4,
    year: 2025,
    genres: ["Adventure", "Drama"],
  },
  {
    id: "7",
    title: "Quantum Paradox",
    image: "https://picsum.photos/seed/movie7/300/450",
    rating: 4.7,
    year: 2024,
    genres: ["Sci-Fi", "Mystery"],
  },
];

const MovieCard: React.FC<{
  movie: {
    id: string;
    title: string;
    image: string;
    rating: number;
    year: number;
    genres: string[];
  };
}> = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="group">
      <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-[350px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{movie.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-yellow-400 font-medium">
              ★ {movie.rating}
            </span>
            <span className="text-gray-300 text-sm">{movie.year}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            {movie.genres.map((genre, index) => (
              <span
                key={index}
                className="text-xs bg-gray-800 text-white px-2 py-0.5 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/hero/1920/1080')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to MovTube</h1>
          <p className="text-xl max-w-2xl mb-8">
            Discover the latest blockbusters, indie gems, and timeless classics.
            Your ultimate movie streaming destination.
          </p>
          <div>
            <Link
              to="/movies"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Browse Movies
            </Link>
            <button className="ml-4 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
              Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {/* Featured Movies */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Movies</h2>
          <Link to="/movies" className="text-red-500 hover:text-red-400">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

      {/* Trending Now */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Trending Now</h2>
          <Link to="/movies" className="text-red-500 hover:text-red-400">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingMovies.slice(0, 3).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
          <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-blue-700 flex flex-col items-center justify-center p-6 text-center h-[350px]">
            <h3 className="text-3xl font-bold mb-4">Want More?</h3>
            <p className="mb-6">
              Discover our complete collection of movies and TV shows.
            </p>
            <Link
              to="/movies"
              className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Explore All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

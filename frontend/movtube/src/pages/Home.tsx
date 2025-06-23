import React from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "../components/movies/MovieCard";
import LoadingState from "../components/ui/LoadingState";
import ErrorState from "../components/ui/ErrorState";
import heroImage from "../assets/hero.jpg";

const Home: React.FC = () => {
  // Using the useMovies hook to fetch data
  const { featuredMovies, newMovies, isLoading, error } = useMovies();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">Chào mừng đến với MovTube</h1>
          <p className="text-xl max-w-2xl mb-8">
            Khám phá bộ sưu tập phim đa dạng của chúng tôi. Hãy tìm kiếm những
            bộ phim yêu thích, khám phá các thể loại mới và thưởng thức những bộ
            phim hot nhất hiện nay.
          </p>
          <div>
            <Link
              to="/movies"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Xem Ngay
            </Link>
          </div>
        </div>
      </div>{" "}
      {/* Featured Movies */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Phim nổi bật</h2>
          <Link to="/movies" className="text-red-500 hover:text-red-400">
            Xem tất cả →
          </Link>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            message={error.message}
            onRetry={() => window.location.reload()}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} variant="simple" />
            ))}
          </div>
        )}
      </div>{" "}
      {/* New Movies */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Mới nhất</h2>
          <Link to="/movies" className="text-red-500 hover:text-red-400">
            Xem tất cả →
          </Link>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            message={error.message}
            onRetry={() => window.location.reload()}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newMovies.slice(0, 3).map((movie) => (
              <MovieCard key={movie.id} movie={movie} variant="simple" />
            ))}
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-br from-purple-600 to-blue-700 flex flex-col items-center justify-center p-6 text-center h-[350px]">
              <h3 className="text-3xl font-bold mb-4">Khám phá thêm?</h3>
              <p className="mb-6">
                Tìm kiếm những bộ phim mới nhất và hot nhất trong bộ sưu tập của
                chúng tôi.
              </p>
              <Link
                to="/movies"
                className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Xem Ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

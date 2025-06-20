import React from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../hooks/useMovies";
import type { Movie } from "../types";
import heroImage from "../assets/hero.jpg";

// MovieCard component
const MovieCard: React.FC<{
  movie: Movie;
}> = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} className="group">
      <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-[350px] object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white font-bold text-lg">{movie.title}</h3>
          {movie.originalName && (
            <p className="text-gray-400 text-sm">{movie.originalName}</p>
          )}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center">
              <span className="text-yellow-400 font-medium">
                ★ {movie.averageRating.toFixed(1)}
              </span>
              {movie.totalEpisodes > 1 && (
                <span className="text-gray-300 text-xs ml-2">
                  {movie.totalEpisodes} tập
                </span>
              )}
            </div>
            <span className="text-gray-300 text-sm">{movie.year}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-400 bg-red-900/20 rounded-lg p-4 border border-red-700">
            <h3 className="text-xl font-semibold mb-2">
              Đã xảy ra lỗi khi tải dữ liệu phim
            </h3>
            <p className="mb-2">Chi tiết lỗi:</p>
            <pre className="text-sm bg-red-900/30 p-3 rounded overflow-auto max-h-32 whitespace-pre-wrap">
              {error.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-400 bg-red-900/20 rounded-lg p-4 border border-red-700">
            <h3 className="text-xl font-semibold mb-2">
              Đã xảy ra lỗi khi tải dữ liệu phim
            </h3>
            <p className="mb-2">Chi tiết lỗi:</p>
            <pre className="text-sm bg-red-900/30 p-3 rounded overflow-auto max-h-32 whitespace-pre-wrap">
              {error.message}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {newMovies.slice(0, 3).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
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

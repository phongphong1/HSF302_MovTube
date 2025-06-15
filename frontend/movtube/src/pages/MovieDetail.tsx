import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// Mock movie database with detailed information
const movieDatabase = [
  {
    id: "1",
    title: "Interstellar Odyssey",
    image: "https://picsum.photos/seed/movie1/800/1200",
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
    similar: ["2", "7", "3"],
  },
  {
    id: "2",
    title: "Midnight Symphony",
    image: "https://picsum.photos/seed/movie2/800/1200",
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
    similar: ["5", "11", "4"],
  },
  {
    id: "3",
    title: "Neon Warriors",
    image: "https://picsum.photos/seed/movie3/800/1200",
    poster: "https://picsum.photos/seed/movie3poster/300/450",
    backdrop: "https://picsum.photos/seed/movie3backdrop/1920/1080",
    rating: 4.7,
    year: 2025,
    releaseDate: "May 22, 2025",
    genres: ["Action", "Cyberpunk", "Thriller"],
    duration: "1h 55m",
    director: "Marcus Zhang",
    writers: ["Jessica Brown", "Kevin Moore"],
    stars: ["Nathan Scott", "Aisha Johnson", "Lucas Chen"],
    plot: "In Neo-Tokyo 2085, the line between humans and machines has blurred beyond recognition. When a series of high-profile assassinations rocks the corporate elite, street-smart mercenary Kai and rogue AI specialist Dr. Maya uncover a conspiracy that threatens to redefine humanity. Armed with experimental tech and facing an army of enhanced soldiers, they must navigate the neon-lit underbelly of the city to expose the truth before it's too late.",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    similar: ["10", "7", "6"],
  },
  {
    id: "4",
    title: "Whispers in the Forest",
    image: "https://picsum.photos/seed/movie4/800/1200",
    poster: "https://picsum.photos/seed/movie4poster/300/450",
    backdrop: "https://picsum.photos/seed/movie4backdrop/1920/1080",
    rating: 4.5,
    year: 2024,
    releaseDate: "October 31, 2024",
    genres: ["Horror", "Thriller", "Mystery"],
    duration: "1h 48m",
    director: "Sarah Miller",
    writers: ["Daniel Jones", "Rachel Green"],
    stars: ["Victoria Adams", "Andrew Wilson", "Zoe Brown"],
    plot: "When renowned author Ellie Blackwood retreats to a remote cabin to finish her latest novel, she discovers the forest surrounding her holds ancient secrets. Local legends speak of entities that mimic human voices to lure victims into the woods. As strange occurrences escalate and the boundary between reality and fiction blurs, Ellie must determine if the whispers she hears are manifestations of her creative mind or something far more sinister lurking among the trees.",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    similar: ["12", "8", "11"],
  },
];

// For IDs 5-12, we'll generate placeholder data if needed when fetching

interface SimilarMovieCardProps {
  movieId: string;
}

const SimilarMovieCard: React.FC<SimilarMovieCardProps> = ({ movieId }) => {
  // Find movie from our database
  const movie = movieDatabase.find((m) => m.id === movieId) || {
    id: movieId,
    title: `Related Movie ${movieId}`,
    poster: `https://picsum.photos/seed/movie${movieId}poster/300/450`,
    year: 2025,
    genres: ["Drama"],
  };

  return (
    <Link to={`/movies/${movieId}`} className="block group">
      <div className="rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-auto object-cover"
        />
        <div className="p-2">
          <h4 className="font-medium text-white truncate">{movie.title}</h4>
          <p className="text-gray-400 text-sm">{movie.year}</p>
        </div>
      </div>
    </Link>
  );
};

const MovieDetail: React.FC = () => {
  // Get movie ID from URL params
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, we'd fetch from an API
    // For demo, we'll use our mock database
    setTimeout(() => {
      const foundMovie = movieDatabase.find((m) => m.id === id);
      if (foundMovie) {
        setMovie(foundMovie);
      } else {
        // Create placeholder data for unknown IDs
        setMovie({
          id,
          title: `Movie ${id}`,
          image: `https://picsum.photos/seed/movie${id}/800/1200`,
          poster: `https://picsum.photos/seed/movie${id}poster/300/450`,
          backdrop: `https://picsum.photos/seed/movie${id}backdrop/1920/1080`,
          rating: (4 + Math.random()).toFixed(1),
          year: 2023 + Math.floor(Math.random() * 3),
          releaseDate: "2025",
          genres: ["Drama", "Action"],
          duration: "2h 00m",
          director: "Director Name",
          writers: ["Writer One", "Writer Two"],
          stars: ["Actor One", "Actor Two", "Actor Three"],
          plot: "This is a placeholder description for a movie that doesn't exist in our database. In a real application, this information would be fetched from a backend API with actual movie data.",
          trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          similar: ["1", "2", "3"].filter((m) => m !== id),
        });
      }
      setLoading(false);
    }, 800); // Simulate loading delay
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white">Loading movie information...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
          <p>Sorry, the movie you're looking for doesn't exist.</p>
          <Link
            to="/movies"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero section with backdrop */}
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.backdrop})`,
          backgroundPosition: "center 20%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-4 pb-8 pt-20">
            <div className="flex flex-col md:flex-row items-end gap-8">
              {/* Movie poster */}
              <div className="w-48 md:w-64 flex-shrink-0 rounded-lg overflow-hidden shadow-2xl transform -translate-y-16">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-auto"
                />
              </div>

              {/* Movie info */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {movie.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-300 mb-4">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                  <span>•</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 font-medium mr-2">
                      ★ {movie.rating}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {movie.genres.map((genre: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 mt-6">
                  <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-lg flex items-center transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie details section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content - left 2/3 */}
          <div className="md:col-span-2 space-y-8">
            {/* Plot */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Story</h2>
              <p className="text-gray-300 leading-relaxed">{movie.plot}</p>
            </div>

            {/* Trailer */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Trailer</h2>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={movie.trailer}
                  title={`${movie.title} Trailer`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Cast */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Cast & Crew</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-400">Director</h3>
                  <p className="text-white">{movie.director}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-400">Writers</h3>
                  <p className="text-white">{movie.writers.join(", ")}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-400">Stars</h3>
                  <p className="text-white">{movie.stars.join(", ")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - right 1/3 */}
          <div className="space-y-8">
            {/* Details */}
            <div className="bg-gray-800 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-3">Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-white">{movie.releaseDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span className="text-white">{movie.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Genres</span>
                  <span className="text-white">{movie.genres.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* Similar Movies */}
            <div>
              <h3 className="font-bold text-lg mb-3">You might also like</h3>
              <div className="grid grid-cols-2 gap-3">
                {movie.similar.slice(0, 4).map((similarId: string) => (
                  <SimilarMovieCard key={similarId} movieId={similarId} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

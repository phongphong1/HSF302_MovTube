import { useParams, Link } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import LoadingState from "../components/ui/LoadingState";
import backdrop from "../assets/background.png";
import EpisodeSelector from "../components/movies/EpisodeSelector";
import { useState } from "react";

const MovieDetail: React.FC = () => {
  // Get movie ID from URL params
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = id
    ? useMovieDetail(id)
    : { data: null, loading: false, error: null };
  const [isEpisodeSelectorOpen, setIsEpisodeSelectorOpen] = useState(false);
  const watchFilm = (url: string) => {
    setIsEpisodeSelectorOpen(false);
    //Tạm thời chỉ log URL để test
    console.log(`Watching film at URL: ${url}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <LoadingState message="Loading movie details..." />
      </div>
    );
  }

  if (!data || data === null || error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Không tìm được phim</h1>
          <p>Bộ phim bạn tìm có vẻ đang không tồn tại!</p>
          <Link
            to="/movies"
            className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Quay lại danh sách phim
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
          backgroundImage: `url(${data.thumbnailUrl || backdrop})`,
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
                  src={data.posterUrl}
                  alt={data.title}
                  className="w-full h-auto"
                />
              </div>

              {/* Movie info */}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {data.title}
                </h1>
                {data.originalName && (
                  <p className="text-gray-400 text-lg mb-2 italic">
                    {data.originalName}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-300 mb-4">
                  <span>{data.year}</span>
                  <span>•</span>
                  <span>
                    {data.durationMinutes >= 60 &&
                      `${Math.floor(data.durationMinutes / 60)}h `}
                    {`${data.durationMinutes % 60}m`}
                  </span>
                  <span>•</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 font-medium mr-2">
                      ★ {data.averageRating.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {data.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-4">
                  {data.totalEpisodes === 1 ? (
                    <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center transition-all duration-200 shadow-lg hover:shadow-red-600/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z" />
                        <path d="M7 21h10" />
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                      </svg>
                      Xem phim
                    </button>
                  ) : (
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg flex items-center transition-all duration-200 shadow-lg hover:shadow-red-600/30"
                      onClick={() => setIsEpisodeSelectorOpen(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#c2bcbc"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z" />
                        <path d="m6.2 5.3 3.1 3.9" />
                        <path d="m12.4 3.4 3.1 4" />
                        <path d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
                      </svg>
                      Chọn tập
                    </button>
                  )}
                  <button className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-5 rounded-lg flex items-center transition-all duration-200 border border-gray-700 hover:border-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#c2bcbc"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
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
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Mô tả</h2>
              <p className="text-gray-300 leading-relaxed">{data.synopsis}</p>
            </div>

            {/* Trailer */}
            {data.trailerUrl && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={data.trailerUrl}
                    title={`${data.title} Trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Cast */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Đội ngũ sản xuất</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-400">Đạo diễn</h3>
                  <p className="text-white">
                    {data.directors.map((d) => d.name).join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-400">Diễn viên</h3>
                  <p className="text-white">
                    {data.actors.map((a) => a.name).join(", ")}
                  </p>
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
                  <span className="text-gray-400">Năm phát hành</span>
                  <span className="text-white">{data.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thời lượng</span>
                  <span className="text-white">
                    {data.durationMinutes >= 60 &&
                      `${Math.floor(data.durationMinutes / 60)}h `}
                    {`${data.durationMinutes % 60}m`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Thể loại</span>
                  <span className="text-white">
                    {data.genres.map((g) => g.name).join(", ")}
                  </span>
                </div>
                {data.totalEpisodes > 1 && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Số tập</span>
                    <span className="text-white">{data.totalEpisodes}</span>
                  </div>
                )}
              </div>
            </div>

            <EpisodeSelector
              isOpen={isEpisodeSelectorOpen}
              onClose={() => setIsEpisodeSelectorOpen(false)}
              episodes={data.episodes || []}
              onSelectEpisode={watchFilm}
              movieTitle="Chọn tập phim"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

import { useParams } from "react-router-dom";
import LoadingState from "../components/ui/LoadingState";
import VideoPlayer from "../components/player/VideoPlayer";
import { useMoviePlayer } from "../hooks/useMoviePlayer";

const MoviePlayer: React.FC = () => {
  const { episodeId } = useParams<{ episodeId?: string }>();

  const { data, loading, error } = useMoviePlayer(episodeId || "");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <LoadingState message="Đang tải phim..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-4">
        <div className="container mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="mb-6">{error}</p>
          <button
            onClick={() => (window.location.href = "/movies")}
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Quay lại danh sách phim
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black flex flex-col">
      {/* Video Player Header */}
      <div className="bg-gradient-to-b from-black to-transparent shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-white text-xl font-bold truncate">
            {data?.title}
            {data?.originalName && (
              <span className="text-gray-400 ml-2">({data.originalName})</span>
            )}
          </h1>
          {data?.episode && data?.episodes.length > 1 && (
            <span className="ml-2 text-red-500">Tập {data.episode}</span>
          )}
        </div>
      </div>

      {/* Video Player Container */}
      <div className="relative bg-black shadow-2xl">
        <div className="container mx-auto">
          <VideoPlayer
            movieData={data}
            isLoading={loading}
            onError={(error: string) => {
              console.error("Video Player Error:", error);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;

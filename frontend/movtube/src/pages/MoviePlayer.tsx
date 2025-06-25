import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingState from "../components/ui/LoadingState";
import VideoPlayer from "../components/player/VideoPlayer";
import InfoSection from "../components/player/InfoSection";
import type { MoviePlayerData } from "../components/player/PlayerTypes";

const MoviePlayer: React.FC = () => {
  const { id, episodeId } = useParams<{ id: string; episodeId?: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movieData, setMovieData] = useState<MoviePlayerData | null>(null);

  // Mock API call to get movie data
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch this from your API
        // For this example, we'll use sample data

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Sample video URL (use your actual HLS stream URL)
        // This is a sample Big Buck Bunny HLS stream
        const sampleVideoUrl =
          "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

        const data: MoviePlayerData = {
          id: id || "unknown",
          title: "Movie Title",
          originalName: "Original Movie Name",
          videoUrl: sampleVideoUrl,
          posterUrl: "https://picsum.photos/seed/movie1/1280/720",
        };

        // If we have an episodeId, add episode data
        if (episodeId) {
          data.episode = parseInt(episodeId);
          data.episodeTitle = `Episode ${episodeId}`;
          // Add next/prev episode IDs if needed
          if (parseInt(episodeId) > 1) {
            data.prevEpisodeId = (parseInt(episodeId) - 1).toString();
          }
          data.nextEpisodeId = (parseInt(episodeId) + 1).toString();
        }

        setMovieData(data);
      } catch (err) {
        console.error("Error fetching movie data:", err);
        setError("Failed to load video. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieData();
  }, [id, episodeId]);

  // Navigate to another episode
  const navigateToEpisode = (episodeId: string) => {
    window.location.href = `/movies/${id}/watch/${episodeId}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <LoadingState message="Loading video..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-4">
        <div className="container mx-auto text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p className="mb-6">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Video Player */}
      <VideoPlayer
        movieData={movieData}
        isLoading={isLoading}
        onError={setError}
      />

      {/* Info Area Below Player */}
      <InfoSection
        movieData={movieData}
        navigateToEpisode={navigateToEpisode}
      />
    </div>
  );
};

export default MoviePlayer;

import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import VideoElement from "./VideoElement";
import ControlsOverlay from "./ControlsOverlay";
import type { MoviePlayerData } from "./PlayerTypes";

interface VideoPlayerProps {
  movieData: MoviePlayerData | null;
  isLoading: boolean;
  onError: (error: string) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  movieData,
  // isLoading is not used directly in this component
  isLoading: _isLoading, // Renamed to avoid lint error
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  // Using number type for setTimeout (instead of NodeJS.Timeout)
  const controlsTimeoutRef = useRef<number | null>(null);

  // Handle play/pause
  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch((err) => {
        console.error("Error playing video:", err);
        onError("Could not play video. Please try again.");
      });
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);

    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  // Handle mute toggle
  const toggleMute = () => {
    if (!videoRef.current) return;

    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!playerRef.current) return;

    if (!isFullscreen) {
      if (playerRef.current.requestFullscreen) {
        playerRef.current.requestFullscreen();
      } else if ((playerRef.current as any).mozRequestFullScreen) {
        (playerRef.current as any).mozRequestFullScreen();
      } else if ((playerRef.current as any).webkitRequestFullscreen) {
        (playerRef.current as any).webkitRequestFullscreen();
      } else if ((playerRef.current as any).msRequestFullscreen) {
        (playerRef.current as any).msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    }
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement !== null ||
          (document as any).webkitFullscreenElement !== null ||
          (document as any).mozFullScreenElement !== null ||
          (document as any).msFullscreenElement !== null
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // Update video metadata
  useEffect(() => {
    if (!videoRef.current) return;

    const handleLoadedMetadata = () => {
      if (!videoRef.current) return;
      setDuration(videoRef.current.duration);
    };

    const handleTimeUpdate = () => {
      if (!videoRef.current) return;
      setCurrentTime(videoRef.current.currentTime);
    };

    const handleVideoEnd = () => {
      setIsPlaying(false);
    };

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const video = videoRef.current;

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [videoRef.current]);

  // Handle controls visibility
  useEffect(() => {
    const showControls = () => {
      setIsControlsVisible(true);

      // Reset timeout
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }

      // Auto-hide controls after 3 seconds if video is playing
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setIsControlsVisible(false);
        }
      }, 3000);
    };

    const playerElement = playerRef.current;

    if (playerElement) {
      playerElement.addEventListener("mousemove", showControls);
      playerElement.addEventListener("click", showControls);
    }

    return () => {
      if (playerElement) {
        playerElement.removeEventListener("mousemove", showControls);
        playerElement.removeEventListener("click", showControls);
      }

      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, playerRef.current]);

  // Format time (seconds to MM:SS format)
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Navigate to another episode
  const navigateToEpisode = (episodeId: string) => {
    // In a real app, you would use react-router to navigate
    window.location.href = `/movies/${movieData?.id}/watch/${episodeId}`;
  };

  // Set up callback refs
  const handleVideoRef = (ref: React.RefObject<HTMLVideoElement | null>) => {
    videoRef.current = ref.current;
  };

  const handleHlsRef = (ref: React.RefObject<Hls | null>) => {
    hlsRef.current = ref.current;
  };

  return (
    <div
      ref={playerRef}
      className="relative w-full aspect-video bg-black cursor-pointer"
      onClick={togglePlay}
    >
      {/* Video Element */}
      {movieData && (
        <VideoElement
          videoUrl={movieData.videoUrl}
          posterUrl={movieData.posterUrl}
          isPlaying={isPlaying}
          onVideoRef={handleVideoRef}
          onHlsRef={handleHlsRef}
          onLoadingChange={() => {}}
          onError={onError}
        />
      )}

      {/* Controls Overlay */}
      <ControlsOverlay
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        currentTime={currentTime}
        duration={duration}
        isFullscreen={isFullscreen}
        isControlsVisible={isControlsVisible}
        movieData={movieData}
        formatTime={formatTime}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        handleVolumeChange={handleVolumeChange}
        handleSeek={handleSeek}
        toggleFullscreen={toggleFullscreen}
        navigateToEpisode={navigateToEpisode}
      />
    </div>
  );
};

export default VideoPlayer;

import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
// No need to import types that are unused

interface VideoElementProps {
  videoUrl: string;
  posterUrl?: string;
  isPlaying: boolean;
  onVideoRef: (ref: React.RefObject<HTMLVideoElement | null>) => void;
  onHlsRef: (ref: React.RefObject<Hls | null>) => void;
  onLoadingChange: (isLoading: boolean) => void;
  onError: (error: string) => void;
}

const VideoElement: React.FC<VideoElementProps> = ({
  videoUrl,
  posterUrl,
  // isPlaying prop is available for future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isPlaying,
  onVideoRef,
  onHlsRef,
  onLoadingChange,
  onError,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  // Share the refs with parent
  useEffect(() => {
    onVideoRef(videoRef);
    onHlsRef(hlsRef);
  }, [onVideoRef, onHlsRef]);

  // Initialize HLS player when video data is available
  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    const loadVideo = () => {
      if (!videoRef.current) return;

      // Clean up previous HLS instance if it exists
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      // Check if HLS is supported in the browser
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxMaxBufferLength: 30,
          maxBufferSize: 30 * 1000 * 1000,
          maxBufferLength: 30,
          startLevel: -1, // Auto quality level selection
        });

        hls.loadSource(videoUrl);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          onLoadingChange(false);
        });

        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.error("Network error");
                hls.startLoad(); // Try to recover
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error("Media error");
                hls.recoverMediaError(); // Try to recover
                break;
              default:
                // Cannot recover
                hls.destroy();
                onError("Could not play the video. Please try again later.");
                break;
            }
          }
        });

        hlsRef.current = hls;
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        // For Safari which has built-in HLS support
        videoRef.current.src = videoUrl;
        onLoadingChange(false);
      } else {
        onError("Your browser does not support HLS video playback.");
      }
    };

    loadVideo();

    // Clean up
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
    };
  }, [videoUrl, onLoadingChange, onError]);

  return (
    <video
      ref={videoRef}
      className="w-full h-full"
      poster={posterUrl}
      playsInline
      preload="auto"
    />
  );
};

export default VideoElement;

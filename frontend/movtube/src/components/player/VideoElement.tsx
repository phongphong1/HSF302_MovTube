import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import Hls from "hls.js";
import type { VideoElementProps, VideoElementHandle } from "./PlayerTypes";

const VideoElement = forwardRef<VideoElementHandle, VideoElementProps>(
  ({ videoUrl, posterUrl, onLoadingChange, onError }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    // Expose methods to parent component
    useImperativeHandle(
      ref,
      () => ({
        get videoElement() {
          return videoRef.current;
        },
        get hlsInstance() {
          return hlsRef.current;
        },
        play() {
          if (videoRef.current) {
            return videoRef.current.play();
          }
          return Promise.reject(new Error("Video element not available"));
        },
        pause() {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        },
      }),
      []
    );

    // Initialize HLS player
    useEffect(() => {
      if (!videoUrl || !videoRef.current) return;

      const videoElement = videoRef.current;

      // Clean up previous HLS instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      // Set up HLS.js if supported
      if (Hls.isSupported()) {
        const hls = new Hls({
          startLevel: -1, // Auto quality level
          autoStartLoad: true,
        });

        hls.loadSource(videoUrl);
        hls.attachMedia(videoElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          onLoadingChange(false);
          videoElement.play().catch(() => {
            // Autoplay prevented, user will need to press play
          });
        });

        hls.on(Hls.Events.ERROR, (_, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad(); // Try to recover
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError(); // Try to recover
                break;
              default:
                hls.destroy();
                onError("Could not play the video. Please try again later.");
                break;
            }
          }
        });

        hlsRef.current = hls;
      } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
        // For Safari with native HLS support
        videoElement.src = videoUrl;
        onLoadingChange(false);
      } else {
        onError("Your browser does not support HLS video playback.");
      }

      // Cleanup
      return () => {
        if (hlsRef.current) {
          hlsRef.current.destroy();
          hlsRef.current = null;
        }
      };
    }, [videoUrl, onLoadingChange, onError]);

    return (
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black"
        poster={posterUrl}
        playsInline
        preload="auto"
        controls={true}
        controlsList="nodownload"
        style={{
          maxHeight: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          display: "block",
          outline: "none",
          boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.7)",
          borderRadius: "0.25rem",
        }}
      />
    );
  }
);

export default VideoElement;

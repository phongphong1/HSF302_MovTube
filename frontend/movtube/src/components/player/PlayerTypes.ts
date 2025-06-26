import type { Episodes } from "../../types";

// Player related interfaces and types
export interface MoviePlayerData {
  id: string;
  title: string;
  originalName?: string;
  episode?: number;
  videoUrl: string;
  posterUrl?: string;
  nextEpisodeId?: string;
  prevEpisodeId?: string;
  episodes: Episodes[];
}

export interface VideoElementProps {
  videoUrl: string;
  posterUrl?: string;
  onLoadingChange: (isLoading: boolean) => void;
  onError: (error: string) => void;
}

export interface VideoElementHandle {
  videoElement: HTMLVideoElement | null;
  hlsInstance: any; // Using any for HLS.js instance
  play: () => Promise<void>;
  pause: () => void;
}

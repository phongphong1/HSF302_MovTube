// Player related interfaces and types
export interface MoviePlayerData {
  id: string;
  title: string;
  originalName?: string;
  episode?: number;
  episodeTitle?: string;
  videoUrl: string;
  posterUrl?: string;
  nextEpisodeId?: string;
  prevEpisodeId?: string;
}

export interface ProgressProps {
  currentTime: number;
  duration: number;
  formatTime: (time: number) => string;
  handleSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ControlButtonsProps {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  isFullscreen: boolean;
  movieData?: MoviePlayerData;
  togglePlay: (e?: React.MouseEvent) => void;
  toggleMute: () => void;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleFullscreen: () => void;
  navigateToEpisode: (episodeId: string) => void;
}

export interface VideoTitleProps {
  title?: string;
  episode?: number;
  episodeTitle?: string;
}

export interface EpisodeNavigationProps {
  prevEpisodeId?: string;
  nextEpisodeId?: string;
  navigateToEpisode: (episodeId: string) => void;
}

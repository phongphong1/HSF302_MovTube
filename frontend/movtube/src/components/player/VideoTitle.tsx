import React from "react";
import type { VideoTitleProps } from "./PlayerTypes";

const VideoTitle: React.FC<VideoTitleProps> = ({
  title,
  episode,
  episodeTitle,
}) => {
  return (
    <div className="mb-2">
      <h2 className="text-white font-bold text-lg">{title}</h2>
      {episode && (
        <p className="text-gray-300 text-sm">
          Episode {episode}: {episodeTitle}
        </p>
      )}
    </div>
  );
};

export default VideoTitle;

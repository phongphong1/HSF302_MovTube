import React from "react";
import type { ProgressProps } from "./PlayerTypes";

const ProgressBar: React.FC<ProgressProps> = ({
  currentTime,
  duration,
  formatTime,
  handleSeek,
}) => {
  return (
    <div className="flex items-center mb-2">
      <span className="text-white text-sm mr-2">{formatTime(currentTime)}</span>
      <input
        type="range"
        className="flex-1 h-1 bg-gray-700 rounded-full appearance-none cursor-pointer"
        min="0"
        max={duration}
        step="0.1"
        value={currentTime}
        onChange={handleSeek}
        style={{
          background: `linear-gradient(to right, #E50914 0%, #E50914 ${
            (currentTime / duration) * 100
          }%, #4B5563 ${(currentTime / duration) * 100}%, #4B5563 100%)`,
        }}
      />
      <span className="text-white text-sm ml-2">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;

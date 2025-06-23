import React from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  id: string;
  step?: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  value,
  onChange,
  label,
  id,
  step = 0.5,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {label}: <span className="font-bold">{value}</span>
      </label>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">{min}</span>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
        />
        <span className="text-xs text-gray-400">{max}</span>
      </div>
    </div>
  );
};

export default RangeSlider;

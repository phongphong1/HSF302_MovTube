import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  label = "Search",
  placeholder = "Search...",
}) => {
  return (
    <div>
      <label
        htmlFor="search"
        className="block text-sm font-medium text-gray-300 mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        id="search"
        placeholder={placeholder}
        className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;

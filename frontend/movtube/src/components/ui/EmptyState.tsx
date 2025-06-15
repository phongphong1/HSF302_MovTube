import React from "react";

interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, message, icon }) => {
  return (
    <div className="text-center py-12">
      {icon || (
        <svg
          className="mx-auto h-16 w-16 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-1 text-gray-400">{message}</p>
    </div>
  );
};

export default EmptyState;

import React from "react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-10 text-red-400 bg-red-900/20 rounded-lg p-4 border border-red-700">
      <h3 className="text-xl font-semibold mb-2">
        Đã xảy ra lỗi khi tải dữ liệu
      </h3>
      {message && (
        <>
          <p className="mb-2">Chi tiết lỗi:</p>
          <pre className="text-sm bg-red-900/30 p-3 rounded overflow-auto max-h-32 whitespace-pre-wrap">
            {message}
          </pre>
        </>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Thử lại
        </button>
      )}
    </div>
  );
};

export default ErrorState;

import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <div className="mt-4 mb-8">
          <h2 className="text-3xl font-bold mb-2">Oops! Page Not Found</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            The scene you're looking for might have been deleted or moved to a
            different streaming service.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
          >
            Back to Homepage
          </Link>
          <Link
            to="/movies"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-300"
          >
            Browse Movies
          </Link>
        </div>

        <div className="mt-16 max-w-md mx-auto">
          <h3 className="font-medium mb-3">Popular searches you might like:</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              to="/movies"
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-sm rounded-full transition-colors"
            >
              Action Movies
            </Link>
            <Link
              to="/movies"
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-sm rounded-full transition-colors"
            >
              New Releases
            </Link>
            <Link
              to="/movies"
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-sm rounded-full transition-colors"
            >
              Top Rated
            </Link>
            <Link
              to="/movies"
              className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-sm rounded-full transition-colors"
            >
              Comedy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

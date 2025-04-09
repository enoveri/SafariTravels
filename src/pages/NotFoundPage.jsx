import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-6xl font-bold text-amber-800 mb-6">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/events"
            className="bg-transparent border-2 border-amber-600 text-amber-600 px-6 py-3 rounded-md hover:bg-amber-50 transition-colors"
          >
            Explore Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 
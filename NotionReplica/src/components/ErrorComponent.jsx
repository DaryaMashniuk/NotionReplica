import React from 'react';

const ErrorComponent = ({ error, retry }) => {
  return (
    <div className="error text-center p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong.</h2>
      <p className="text-gray-700">{error?.message || "An unexpected error occurred."}</p>
      {error?.status === 404 ? (
        <p className="text-gray-700 mt-2">The page you're looking for might have been moved or deleted.</p>
      ) : (
        <p className="text-gray-700 mt-2">It seems there was a problem loading this page. Please try again.</p>
      )}
      <button onClick={retry} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Retry
      </button>
    </div>
  );
};

export default ErrorComponent;
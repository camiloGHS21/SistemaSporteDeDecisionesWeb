import React from 'react';

const LoadingIndicator = ({ message, fileName, progress }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-1/3 max-w-md text-center">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{message}</h3>
        {fileName && <p className="text-gray-600 mb-4 break-all">{fileName}</p>}
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${progress}%`, transition: 'width 0.2s ease-in-out' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
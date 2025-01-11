import React from 'react';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <span 
        className="border-4 border-t-transparent border-gray-600 rounded-full animate-spin h-16 w-16" 
      />
    </div>
  );
};

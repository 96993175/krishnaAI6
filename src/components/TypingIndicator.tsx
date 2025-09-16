import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 px-4 py-3 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl max-w-xs animate-slide-in-left shadow-lg">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center text-white text-lg font-medium shadow-lg ring-2 ring-amber-200">
        🧘‍♂️
      </div>
      <div className="flex items-center space-x-1">
        <span className="text-amber-800 text-sm font-semibold">Krishna is contemplating</span>
        <div className="flex space-x-1">
          <div className="w-2.5 h-2.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2.5 h-2.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2.5 h-2.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
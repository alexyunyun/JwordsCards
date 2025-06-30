import React from 'react';

interface ProgressIndicatorProps {
  currentIndex: number;
  totalWords: number;
  bookmarkMode: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentIndex,
  totalWords,
  bookmarkMode
}) => {
  return (
    <div className="absolute top-3 left-3 z-15">
      <div className="text-gray-700 dark:text-gray-200 text-sm font-medium bg-white/20 dark:bg-gray-800/20 backdrop-blur-md rounded-full px-3 py-1 border border-gray-200/30 dark:border-gray-700/30">
        {currentIndex + 1} / {totalWords}
        {bookmarkMode && (
          <span className="ml-2 text-yellow-500 font-bold">📚</span>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicator;
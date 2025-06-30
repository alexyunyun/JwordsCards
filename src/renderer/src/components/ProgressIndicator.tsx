import React from 'react';
import '../styles/ProgressIndicator.css';

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
    <div className="progress-indicator">
      <div className="progress-content">
        {currentIndex + 1} / {totalWords}
        {bookmarkMode && (
          <span className="bookmark-indicator">📚</span>
        )}
      </div>
    </div>
  );
};

export default ProgressIndicator;
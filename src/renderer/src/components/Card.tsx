import React, { useState } from 'react';
import { useTTS } from '../hooks/useTTS';
import type { Word, Theme } from '../types';
import ThemeToggle from './ThemeToggle';
import ProgressIndicator from './ProgressIndicator';
import FlipCard from './FlipCard';
import ControlBar from './ControlBar';
import '../styles/Card.css';

interface CardProps {
  word: Word;
  isBookmarked: boolean;
  onBookmark: () => void;
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalWords: number;
  bookmarkMode: boolean;
  theme: Theme;
  onToggleTheme: () => void;
  onToggleBookmarkMode: () => void;
  bookmarkCount: number;
}

function Card({
  word,
  isBookmarked,
  onBookmark,
  onNext,
  onPrevious,
  currentIndex,
  totalWords,
  bookmarkMode,
  theme,
  onToggleTheme,
  onToggleBookmarkMode,
  bookmarkCount,
}: CardProps): JSX.Element {
  const [isFlipped, setIsFlipped] = useState(false);
  const { speak, isPlaying, isSupported } = useTTS();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleSpeak = async () => {
    if (isSupported && !isPlaying) {
      try {
        await speak(word.word, { rate: 0.8 });
      } catch (error) {
        console.error('TTS error:', error);
      }
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    onNext();
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    onPrevious();
  };

  return (
    <div className="card-wrapper">
      <div className="card-container">
        {/* 完整卡片容器 */}
        <div className="card-main">
          {/* 右上角主题切换按钮 */}
          <div
            className="theme-toggle-container"
            style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
          >
            <div className="theme-toggle-wrapper">
              <ThemeToggle
                theme={theme}
                onToggle={onToggleTheme}
              />
            </div>
          </div>

          {/* 左上角进度指示器 */}
          <ProgressIndicator
            currentIndex={currentIndex}
            totalWords={totalWords}
            bookmarkMode={bookmarkMode}
          />

          {/* 卡片翻转容器 */}
          <FlipCard
            word={word}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />

          {/* 底部控制栏 */}
          <ControlBar
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSpeak={handleSpeak}
            onBookmark={onBookmark}
            isBookmarked={isBookmarked}
            isPlaying={isPlaying}
            isSupported={isSupported}
            bookmarkMode={bookmarkMode}
            onToggleBookmarkMode={onToggleBookmarkMode}
            bookmarkCount={bookmarkCount}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;

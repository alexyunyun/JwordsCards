import React, { useState } from 'react';
import { useTTS } from '../hooks/useTTS';
import type { Word, Theme } from '../types';
import ThemeToggle from './ThemeToggle';
import ProgressIndicator from './ProgressIndicator';
import FlipCard from './FlipCard';
import ControlBar from './ControlBar';

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
    <div className="w-full h-full flex items-center justify-center p-3">
      <div className="relative w-full h-full max-w-[420px] max-h-[280px] min-w-[320px] min-h-[220px]">
        {/* 完整卡片容器 */}
        <div className="w-full h-full glass rounded-2xl shadow-2xl overflow-hidden relative">
          {/* 右上角主题切换按钮 */}
          <div
            className="absolute top-3 right-3 z-20"
            style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
          >
            <div className="w-8 h-8 flex items-center justify-center">
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

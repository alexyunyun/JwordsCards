import React from 'react';
import { motion } from 'framer-motion';
import ControlButton from './ControlButton';
import BookmarkModeToggle from './BookmarkModeToggle';

interface ControlBarProps {
  onPrevious: () => void;
  onNext: () => void;
  onSpeak: () => void;
  onBookmark: () => void;
  isBookmarked: boolean;
  isPlaying: boolean;
  isSupported: boolean;
  bookmarkMode: boolean;
  onToggleBookmarkMode: () => void;
  bookmarkCount: number;
}

const ControlBar: React.FC<ControlBarProps> = ({
  onPrevious,
  onNext,
  onSpeak,
  onBookmark,
  isBookmarked,
  isPlaying,
  isSupported,
  bookmarkMode,
  onToggleBookmarkMode,
  bookmarkCount
}) => {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-10 control-bar-bg"
      style={{
        WebkitAppRegion: 'no-drag',
        padding: 'clamp(0.5rem, 2vw, 0.75rem)',
      } as React.CSSProperties}
    >
      <div
        className="flex items-center justify-center"
        style={{ gap: 'clamp(0.5rem, 2vw, 0.75rem)' }}
      >
        {/* 书签模式切换 */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <BookmarkModeToggle
            bookmarkMode={bookmarkMode}
            onToggle={onToggleBookmarkMode}
            bookmarkCount={bookmarkCount}
          />
        </motion.div>

        {/* 上一个按钮 */}
        <ControlButton
          onClick={onPrevious}
          title="上一个单词 (←)"
          size="sm"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </ControlButton>

        {/* 播放按钮 */}
        <ControlButton
          onClick={onSpeak}
          title="播放发音"
          disabled={isPlaying || !isSupported}
          size="lg"
        >
          <svg
            className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </ControlButton>

        {/* 下一个按钮 */}
        <ControlButton
          onClick={onNext}
          title="下一个单词 (→ 或 空格)"
          size="sm"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </ControlButton>

        {/* 收藏按钮 */}
        <ControlButton
          onClick={(e?: React.MouseEvent) => {
                e?.stopPropagation();
                onBookmark();
              }}
          title={isBookmarked ? '取消收藏 (B)' : '添加收藏 (B)'}
          className={isBookmarked
            ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
            : ''
          }
          size="sm"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </ControlButton>
      </div>
    </div>
  );
};

export default ControlBar;
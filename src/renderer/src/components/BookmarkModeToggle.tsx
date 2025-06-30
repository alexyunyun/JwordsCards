import React from 'react';
import { motion } from 'framer-motion';

interface BookmarkModeToggleProps {
  bookmarkMode: boolean;
  onToggle: () => void;
  bookmarkCount: number;
}

function BookmarkModeToggle({
  bookmarkMode,
  onToggle,
  bookmarkCount,
}: BookmarkModeToggleProps): JSX.Element {
  return (
    <motion.button
      onClick={onToggle}
      className={`relative p-2 rounded-full glass btn-hover transition-all duration-300 ${
        bookmarkMode
          ? 'bg-yellow-500/50 text-yellow-600 border-yellow-400/50'
          : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border-gray-300/50 dark:border-gray-600/50'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={bookmarkMode ? '退出收藏模式 (M)' : '进入收藏模式 (M)'}
    >
      <svg
        className="w-5 h-5"
        fill={bookmarkMode ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13L7.5 18l4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13L16.5 18l-4.5 1.253"
        />
      </svg>

      {/* 收藏数量徽章 */}
      {bookmarkCount > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
        >
          {bookmarkCount > 99 ? '99+' : bookmarkCount}
        </motion.div>
      )}
    </motion.button>
  );
}

export default BookmarkModeToggle;

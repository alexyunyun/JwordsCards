import { motion } from 'framer-motion';
import '../styles/BookmarkModeToggle.css';

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
      className={`bookmark-toggle ${bookmarkMode ? 'active' : ''}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={bookmarkMode ? '退出收藏模式 (M)' : '进入收藏模式 (M)'}
    >
      <svg
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
          className="bookmark-badge"
        >
          {bookmarkCount > 99 ? '99+' : bookmarkCount}
        </motion.div>
      )}
    </motion.button>
  );
}

export default BookmarkModeToggle;

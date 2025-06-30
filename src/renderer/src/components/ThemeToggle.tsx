import { motion } from 'framer-motion';
import type { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps): JSX.Element {
  return (
    <motion.button
      onClick={onToggle}
      className="p-2 rounded-full text-gray-700 dark:text-gray-200 bg-white/20 dark:bg-gray-800/20 backdrop-blur-md border border-gray-200/30 dark:border-gray-700/30 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={theme === 'dark' ? '切换到亮色模式 (T)' : '切换到暗色模式 (T)'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          // 月亮图标 (暗色模式)
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        ) : (
          // 太阳图标 (亮色模式)
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12,18.5A6.5,6.5,0,1,1,18.5,12,6.51,6.51,0,0,1,12,18.5ZM12,7A5,5,0,1,0,17,12,5,5,0,0,0,12,7Z" />
            <path d="M12,1a1,1,0,0,0-1,1V4a1,1,0,0,0,2,0V2A1,1,0,0,0,12,1Z" />
            <path d="M12,20a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V21A1,1,0,0,0,12,20Z" />
            <path d="M6.34,7.76A1,1,0,0,0,4.93,6.34L3.51,7.76a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0Z" />
            <path d="M19.07,17.66a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.41l1.42,1.42a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41Z" />
            <path d="M1,13H4a1,1,0,0,0,0-2H1a1,1,0,0,0,0,2Z" />
            <path d="M20,13h3a1,1,0,0,0,0-2H20a1,1,0,0,0,0,2Z" />
            <path d="M4.93,17.66,3.51,19.07a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0L6.34,19.07a1,1,0,0,0,0-1.41A1,1,0,0,0,4.93,17.66Z" />
            <path d="M17.66,7.76l1.42-1.42a1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0L16.25,6.34a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.76Z" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;

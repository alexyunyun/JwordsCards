import { motion } from 'framer-motion';
import type { Theme } from '../types';
import '../styles/ThemeToggle.css';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps): JSX.Element {
  return (
    <motion.button
      onClick={onToggle}
      className="theme-toggle"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={theme === 'dark' ? '切换到亮色模式 (T)' : '切换到暗色模式 (T)'}
    >
      <motion.div
        className="theme-toggle-icon"
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          // 月亮图标 (暗色模式)
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        ) : (
          // 太阳图标 (亮色模式)
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
            width="20"
            height="20"
          >
            {/* 太阳中心圆 */}
            <circle cx="12" cy="12" r="5" />
            {/* 8个方向的光线，均匀分布 */}
            {/* 上 */}
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* 右上 */}
            <line x1="18.36" y1="5.64" x2="16.95" y2="7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* 右 */}
            <line x1="23" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* 右下 */}
            <line x1="18.36" y1="18.36" x2="16.95" y2="16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* 下 */}
            <line x1="12" y1="23" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* 左下 */}
            <line x1="5.64" y1="18.36" x2="7.05" y2="16.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* 左 */}
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* 左上 */}
            <line x1="5.64" y1="5.64" x2="7.05" y2="7.05" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;

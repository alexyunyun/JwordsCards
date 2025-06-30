import React, { useState, useEffect, useCallback } from 'react';
import Card from './components/Card';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import { useWordBank } from './hooks/useWordBank';
import { useTheme } from './hooks/useTheme';
import './styles/App.css';

function App(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [isMacOS, setIsMacOS] = useState(false);

  // 检测操作系统
  useEffect(() => {
    // 通过用户代理字符串检测 macOS
    setIsMacOS(navigator.userAgent.includes('Mac'));
  }, []);
  const { theme, toggleTheme } = useTheme();
  const {
    words,
    currentIndex,
    currentWord,
    bookmarkMode,
    nextWord,
    previousWord,
    toggleBookmark,
    toggleBookmarkMode,
    isBookmarked,
  } = useWordBank();

  useEffect(() => {
    if (words.length > 0) {
      setLoading(false);
    }
  }, [words]);

  // 键盘事件处理
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ': // 空格键
          event.preventDefault();
          nextWord();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          previousWord();
          break;
        case 'b':
        case 'B':
          event.preventDefault();
          if (currentWord) {
            toggleBookmark(currentWord.id);
          }
          break;
        case 'm':
        case 'M':
          event.preventDefault();
          toggleBookmarkMode();
          break;
        case 't':
        case 'T':
          event.preventDefault();
          toggleTheme();
          break;
      }
    },
    [
      nextWord,
      previousWord,
      toggleBookmark,
      toggleBookmarkMode,
      toggleTheme,
      currentWord,
    ],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  if (loading) {
    return <Loading />;
  }

  if (!currentWord) {
    return <ErrorMessage message="没有找到单词数据" />;
  }

  return (
    <div className={`app ${theme}`}>
      <div className="app-container">
        {/* 拖拽区域 */}
        <div
          className="drag-region"
          style={{
            '--drag-left': isMacOS ? '60%' : '50%',
            '--drag-width': isMacOS ? '40%' : '60%',
          } as React.CSSProperties}
        />

        {/* 单词卡片 */}
        <Card
          word={currentWord}
          isBookmarked={isBookmarked(currentWord.id)}
          onBookmark={() => toggleBookmark(currentWord.id)}
          onNext={nextWord}
          onPrevious={previousWord}
          currentIndex={currentIndex}
          totalWords={words.length}
          bookmarkMode={bookmarkMode}
          theme={theme}
          onToggleTheme={toggleTheme}
          onToggleBookmarkMode={toggleBookmarkMode}
          bookmarkCount={words.filter((word) => isBookmarked(word.id)).length}
        />
      </div>
    </div>
  );
}

export default App;

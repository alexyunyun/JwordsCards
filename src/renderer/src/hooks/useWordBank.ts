import { useState, useEffect, useCallback } from 'react';
import wordsData from '../../../data/words.json';
import type { Word, WordBankState } from '../types';

export function useWordBank() {
  const [state, setState] = useState<WordBankState>({
    words: [],
    currentIndex: 0,
    currentWord: null,
    bookmarkMode: false,
  });

  const [bookmarks, setBookmarks] = useState<string[]>([]);

  // 初始化数据
  useEffect(() => {
    const initData = async () => {
      try {
        // 加载单词数据
        const words = wordsData as Word[];

        // 加载书签数据
        const savedBookmarks = (await window.api?.getAllBookmarks()) || [];
        setBookmarks(savedBookmarks);

        // 加载保存的单词位置
        const savedPosition = (await window.api?.getWordPosition?.()) || {
          currentIndex: 0,
          bookmarkMode: false,
        };

        // 获取显示的单词列表
        const displayWords = savedPosition.bookmarkMode
          ? words.filter((word) => savedBookmarks.includes(word.id))
          : words;

        // 确保索引在有效范围内
        const validIndex = Math.min(
          savedPosition.currentIndex,
          Math.max(0, displayWords.length - 1)
        );

        // 设置初始状态
        setState({
          words,
          currentIndex: validIndex,
          currentWord: displayWords[validIndex] || words[0] || null,
          bookmarkMode: savedPosition.bookmarkMode,
        });
      } catch (error) {
        console.error('Failed to load word bank data:', error);
        // 如果 API 不可用，从 localStorage 加载
        const savedBookmarks = JSON.parse(
          localStorage.getItem('bookmarks') || '[]',
        );
        setBookmarks(savedBookmarks);

        const words = wordsData as Word[];
        setState({
          words,
          currentIndex: 0,
          currentWord: words[0] || null,
          bookmarkMode: false,
        });
      }
    };

    initData();
  }, []);

  // 获取当前显示的单词列表（全部或仅书签）
  const getDisplayWords = useCallback(() => {
    if (state.bookmarkMode) {
      return state.words.filter((word) => bookmarks.includes(word.id));
    }
    return state.words;
  }, [state.words, state.bookmarkMode, bookmarks]);

  // 保存当前位置到存储
  const savePosition = useCallback(async (currentIndex: number, bookmarkMode: boolean) => {
    try {
      await window.api?.setWordPosition?.({ currentIndex, bookmarkMode });
    } catch (error) {
      console.error('Failed to save word position:', error);
    }
  }, []);

  // 下一个单词
  const nextWord = useCallback(() => {
    const displayWords = getDisplayWords();
    if (displayWords.length === 0) return;

    setState((prev) => {
      const newIndex = (prev.currentIndex + 1) % displayWords.length;
      const newState = {
        ...prev,
        currentIndex: newIndex,
        currentWord: displayWords[newIndex],
      };
      
      // 保存位置
      savePosition(newIndex, prev.bookmarkMode);
      
      return newState;
    });
  }, [getDisplayWords, savePosition]);

  // 上一个单词
  const previousWord = useCallback(() => {
    const displayWords = getDisplayWords();
    if (displayWords.length === 0) return;

    setState((prev) => {
      const newIndex =
        prev.currentIndex === 0
          ? displayWords.length - 1
          : prev.currentIndex - 1;
      const newState = {
        ...prev,
        currentIndex: newIndex,
        currentWord: displayWords[newIndex],
      };
      
      // 保存位置
      savePosition(newIndex, prev.bookmarkMode);
      
      return newState;
    });
  }, [getDisplayWords, savePosition]);

  // 随机单词
  const randomWord = useCallback(() => {
    const displayWords = getDisplayWords();
    if (displayWords.length === 0) return;

    const randomIndex = Math.floor(Math.random() * displayWords.length);
    setState((prev) => {
      const newState = {
        ...prev,
        currentIndex: randomIndex,
        currentWord: displayWords[randomIndex],
      };
      
      // 保存位置
      savePosition(randomIndex, prev.bookmarkMode);
      
      return newState;
    });
  }, [getDisplayWords, savePosition]);

  // 跳转到指定单词
  const goToWord = useCallback(
    (index: number) => {
      const displayWords = getDisplayWords();
      if (index < 0 || index >= displayWords.length) return;

      setState((prev) => {
        const newState = {
          ...prev,
          currentIndex: index,
          currentWord: displayWords[index],
        };
        
        // 保存位置
        savePosition(index, prev.bookmarkMode);
        
        return newState;
      });
    },
    [getDisplayWords, savePosition],
  );

  // 切换书签
  const toggleBookmark = useCallback(
    async (wordId: string) => {
      const isCurrentlyBookmarked = bookmarks.includes(wordId);
      const newBookmarks = isCurrentlyBookmarked
        ? bookmarks.filter((id) => id !== wordId)
        : [...bookmarks, wordId];

      setBookmarks(newBookmarks);

      try {
        await window.api?.setBookmark(wordId, !isCurrentlyBookmarked);
      } catch (error) {
        // 如果 API 不可用，保存到 localStorage
        localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
      }
    },
    [bookmarks],
  );

  // 切换书签模式
  const toggleBookmarkMode = useCallback(() => {
    setState((prev) => {
      const newBookmarkMode = !prev.bookmarkMode;
      const displayWords = newBookmarkMode
        ? prev.words.filter((word) => bookmarks.includes(word.id))
        : prev.words;

      if (newBookmarkMode && displayWords.length === 0) {
        return prev;
      }

      const newState = {
        ...prev,
        bookmarkMode: newBookmarkMode,
        currentIndex: 0,
        currentWord: displayWords[0] || null,
      };
      
      // 保存位置
      savePosition(0, newBookmarkMode);
      
      return newState;
    });
  }, [bookmarks, savePosition]);

  // 检查是否已收藏
  const isBookmarked = useCallback(
    (wordId: string) => {
      return bookmarks.includes(wordId);
    },
    [bookmarks],
  );

  // 添加新单词（预留功能）
  const addWord = useCallback((word: Omit<Word, 'id'>) => {
    const newWord: Word = {
      ...word,
      id: Date.now().toString(),
    };

    setState((prev) => ({
      ...prev,
      words: [...prev.words, newWord],
    }));
  }, []);

  // 删除单词（预留功能）
  const removeWord = useCallback(
    (wordId: string) => {
      setState((prev) => {
        const newWords = prev.words.filter((word) => word.id !== wordId);
        const displayWords = prev.bookmarkMode
          ? newWords.filter((word) => bookmarks.includes(word.id))
          : newWords;

        const newIndex = Math.min(prev.currentIndex, displayWords.length - 1);

        return {
          ...prev,
          words: newWords,
          currentIndex: Math.max(0, newIndex),
          currentWord: displayWords[Math.max(0, newIndex)] || null,
        };
      });

      // 同时从书签中移除
      if (bookmarks.includes(wordId)) {
        toggleBookmark(wordId);
      }
    },
    [bookmarks, toggleBookmark],
  );

  // 获取学习统计（预留功能）
  const getStats = useCallback(() => {
    return {
      totalWords: state.words.length,
      bookmarkedWords: bookmarks.length,
      currentProgress: state.bookmarkMode
        ? `${state.currentIndex + 1}/${bookmarks.length}`
        : `${state.currentIndex + 1}/${state.words.length}`,
    };
  }, [
    state.words.length,
    state.currentIndex,
    state.bookmarkMode,
    bookmarks.length,
  ]);

  return {
    words: getDisplayWords(),
    allWords: state.words,
    currentIndex: state.currentIndex,
    currentWord: state.currentWord,
    bookmarkMode: state.bookmarkMode,
    bookmarks,
    nextWord,
    previousWord,
    randomWord,
    goToWord,
    toggleBookmark,
    toggleBookmarkMode,
    isBookmarked,
    addWord,
    removeWord,
    getStats,
  };
}

import { useState, useEffect } from 'react';
import type { Theme } from '../types';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  // 初始化主题
  useEffect(() => {
    const initTheme = async () => {
      try {
        // 尝试从 Electron 存储获取主题
        const savedTheme = await window.api?.getSetting('theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setTheme(savedTheme);
        } else {
          // 如果没有保存的主题，使用系统偏好
          const systemTheme = getSystemTheme();
          setTheme(systemTheme);
        }
      } catch (error) {
        // 如果 Electron API 不可用，从 localStorage 获取
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setTheme(savedTheme);
        } else {
          const systemTheme = getSystemTheme();
          setTheme(systemTheme);
        }
      }
    };

    initTheme();
  }, []);

  // 应用主题到 DOM
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // 切换主题
  const toggleTheme = async () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    try {
      // 保存到 Electron 存储
      await window.api?.setSetting('theme', newTheme);
    } catch (error) {
      // 如果 Electron API 不可用，保存到 localStorage
      localStorage.setItem('theme', newTheme);
    }
  };

  // 设置特定主题
  const setSpecificTheme = async (newTheme: Theme) => {
    setTheme(newTheme);

    try {
      await window.api?.setSetting('theme', newTheme);
    } catch (error) {
      localStorage.setItem('theme', newTheme);
    }
  };

  // 获取系统主题偏好
  const getSystemTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'dark'; // 默认暗色主题
  };

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    getSystemTheme,
  };
}

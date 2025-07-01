import { useState, useEffect, useCallback } from 'react';

const OPACITY_STORAGE_KEY = 'jwordcards-background-opacity';
const DEFAULT_OPACITY = 0.95;

export function useOpacity() {
  const [opacity, setOpacity] = useState<number>(DEFAULT_OPACITY);

  // 从localStorage加载背景透明度设置
  useEffect(() => {
    const loadOpacity = () => {
      try {
        const savedOpacity = localStorage.getItem(OPACITY_STORAGE_KEY);
        if (savedOpacity) {
          const parsedOpacity = parseFloat(savedOpacity);
          if (parsedOpacity >= 0.1 && parsedOpacity <= 1) {
            setOpacity(parsedOpacity);
          }
        }
      } catch (error) {
        console.warn(
          'Failed to load background opacity from localStorage:',
          error,
        );
      }
    };
    loadOpacity();
  }, []);

  // 更新背景透明度
  const updateOpacity = useCallback((newOpacity: number) => {
    // 确保透明度在有效范围内
    const clampedOpacity = Math.max(0.1, Math.min(1, newOpacity));
    setOpacity(clampedOpacity);

    // 保存到localStorage
    try {
      localStorage.setItem(OPACITY_STORAGE_KEY, clampedOpacity.toString());
    } catch (error) {
      console.warn('Failed to save background opacity to localStorage:', error);
    }
  }, []);

  return {
    opacity,
    updateOpacity,
  };
}

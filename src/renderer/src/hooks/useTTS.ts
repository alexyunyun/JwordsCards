import { useState, useEffect, useCallback } from 'react';
import type { TTSState } from '../types';

export function useTTS() {
  const [state, setState] = useState<TTSState>({
    isSupported: false,
    isPlaying: false,
    voices: [],
    selectedVoice: null,
  });

  // 检查浏览器支持
  useEffect(() => {
    const checkSupport = () => {
      const isSupported = 'speechSynthesis' in window;
      setState((prev) => ({ ...prev, isSupported }));

      if (isSupported) {
        loadVoices();
      }
    };

    checkSupport();
  }, []);

  // 加载可用语音
  const loadVoices = useCallback(() => {
    const voices = speechSynthesis.getVoices();

    // 优先选择日语语音
    const japaneseVoice = voices.find(
      (voice) =>
        voice.lang.startsWith('ja') ||
        voice.name.toLowerCase().includes('japanese') ||
        voice.name.toLowerCase().includes('japan'),
    );

    setState((prev) => ({
      ...prev,
      voices,
      selectedVoice: japaneseVoice || voices[0] || null,
    }));
  }, []);

  // 监听语音加载完成事件
  useEffect(() => {
    if (state.isSupported) {
      speechSynthesis.addEventListener('voiceschanged', loadVoices);
      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, [state.isSupported, loadVoices]);

  // 说话函数
  const speak = useCallback(
    (
      text: string,
      options?: {
        rate?: number;
        pitch?: number;
        volume?: number;
        voice?: SpeechSynthesisVoice;
      },
    ) => {
      if (!state.isSupported || !text.trim()) {
        return Promise.reject(new Error('TTS not supported or empty text'));
      }

      // 停止当前播放
      speechSynthesis.cancel();

      return new Promise<void>((resolve, reject) => {
        const utterance = new SpeechSynthesisUtterance(text);

        // 设置语音参数
        utterance.rate = options?.rate ?? 1;
        utterance.pitch = options?.pitch ?? 1;
        utterance.volume = options?.volume ?? 1;
        utterance.voice = options?.voice ?? state.selectedVoice;

        // 事件处理
        utterance.onstart = () => {
          setState((prev) => ({ ...prev, isPlaying: true }));
        };

        utterance.onend = () => {
          setState((prev) => ({ ...prev, isPlaying: false }));
          resolve();
        };

        utterance.onerror = (event) => {
          setState((prev) => ({ ...prev, isPlaying: false }));
          reject(new Error(`TTS error: ${event.error}`));
        };

        // 开始播放
        speechSynthesis.speak(utterance);
      });
    },
    [state.isSupported, state.selectedVoice],
  );

  // 停止播放
  const stop = useCallback(() => {
    if (state.isSupported) {
      speechSynthesis.cancel();
      setState((prev) => ({ ...prev, isPlaying: false }));
    }
  }, [state.isSupported]);

  // 暂停播放
  const pause = useCallback(() => {
    if (state.isSupported && state.isPlaying) {
      speechSynthesis.pause();
    }
  }, [state.isSupported, state.isPlaying]);

  // 恢复播放
  const resume = useCallback(() => {
    if (state.isSupported && speechSynthesis.paused) {
      speechSynthesis.resume();
    }
  }, [state.isSupported]);

  // 设置语音
  const setVoice = useCallback((voice: SpeechSynthesisVoice) => {
    setState((prev) => ({ ...prev, selectedVoice: voice }));
  }, []);

  return {
    ...state,
    speak,
    stop,
    pause,
    resume,
    setVoice,
    loadVoices,
  };
}

import { useState, useEffect, useCallback } from 'react';

interface TTSOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

export function useTTS() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    // 检查浏览器支持
    const supported = 'speechSynthesis' in window;
    setIsSupported(supported);

    if (supported) {
      // 加载语音列表
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      // 立即尝试加载
      loadVoices();

      // 监听语音加载完成事件
      window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  const speak = useCallback(async (text: string, options: TTSOptions = {}) => {
    if (!isSupported || !text.trim()) {
      return;
    }

    try {
      // 停止当前播放
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      // 设置参数
      utterance.rate = options.rate || 0.8;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      
      // 设置语音
      if (options.voice) {
        utterance.voice = options.voice;
      } else {
        // 尝试使用日语语音
        const japaneseVoice = voices.find(voice => 
          voice.lang.includes('ja') || voice.lang.includes('jp') ||
          voice.name.toLowerCase().includes('japanese') ||
          voice.name.toLowerCase().includes('japan')
        );
        if (japaneseVoice) {
          utterance.voice = japaneseVoice;
        }
      }

      // 设置事件监听
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      // 开始播放
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('TTS Error:', error);
      setIsPlaying(false);
    }
  }, [isSupported, voices]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  return {
    speak,
    stop,
    isPlaying,
    isSupported,
    voices,
  };
}

import React, { useState, useRef, useEffect } from 'react';
import '../styles/OpacitySlider.css';

interface OpacitySliderProps {
  opacity: number;
  onChange: (opacity: number) => void;
}

const OpacitySlider: React.FC<OpacitySliderProps> = ({ opacity, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleToggleSlider = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  // 点击外部关闭滑块
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    const percentage = Math.max(0, Math.min(1, 1 - y / height));
    const newOpacity = Math.max(0.1, percentage);

    onChange(newOpacity);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    handleSliderClick(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const height = rect.height;
    const percentage = Math.max(0, Math.min(1, 1 - y / height));
    const newOpacity = Math.max(0.1, percentage);

    onChange(newOpacity);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsVisible(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="opacity-control"
      ref={containerRef}
    >
      {/* 透明度图标按钮 */}
      <div
        className="opacity-icon"
        title={`背景透明度: ${Math.round(opacity * 100)}%`}
        onClick={handleToggleSlider}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle
            cx="12"
            cy="12"
            r="3"
          />
          <path d="M12 1v6m0 6v6" />
          <path d="m21 12-6-6-6 6-6-6" />
        </svg>
      </div>

      {/* 垂直滑块 */}
      {isVisible && (
        <div className="opacity-slider-container">
          <div
            className="opacity-slider-track"
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onClick={handleSliderClick}
          >
            <div
              className="opacity-slider-fill"
              style={{ height: `${((opacity - 0.1) / 0.9) * 100}%` }}
            />
            <div
              className="opacity-slider-thumb"
              style={{ bottom: `${((opacity - 0.1) / 0.9) * 100}%` }}
            />
          </div>
          <div className="opacity-value-display">
            {Math.round(opacity * 100)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default OpacitySlider;

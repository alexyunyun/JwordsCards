import React from 'react';
import type { Word } from '../types';

interface CardFaceProps {
  word: Word;
  isBack?: boolean;
}

const CardFace: React.FC<CardFaceProps> = ({ word, isBack = false }) => {
  if (isBack) {
    return (
      <div className="card-back w-full h-full">
        <div className="card-content">
          <div className="text-center max-w-full">
            <h2 className="word-meaning text-gray-800 dark:text-white font-chinese">
              {word.meaning}
            </h2>
            {word.example && (
              <div className="word-example text-gray-700 dark:text-gray-200 mt-3">
                <p className="font-japanese leading-relaxed">
                  {word.example}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-front w-full h-full">
      <div className="card-content">
        <div className="text-center max-w-full">
          <h1 className="word-main text-gray-800 dark:text-white font-japanese">
            {word.word}
          </h1>
          <p className="word-pronunciation text-gray-700 dark:text-gray-200">
            {word.pronunciation.romaji}
          </p>
          <p className="word-katakana text-gray-600 dark:text-gray-300">
            {word.pronunciation.katakana}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardFace;
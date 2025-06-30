import React from 'react';
import type { Word } from '../types';
import '../styles/CardFace.css';

interface CardFaceProps {
  word: Word;
  isBack?: boolean;
}

const CardFace: React.FC<CardFaceProps> = ({ word, isBack = false }) => {
  if (isBack) {
    return (
      <div className="card-face card-back">
        <div className="card-content">
          <div className="card-text-container">
            <h2 className="word-meaning font-chinese">
              {word.meaning}
            </h2>
            {word.example && (
              <div className="word-example">
                <p className="font-japanese">
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
    <div className="card-face card-front">
      <div className="card-content">
        <div className="card-text-container">
          <h1 className="word-main font-japanese">
            {word.word}
          </h1>
          <p className="word-pronunciation">
            {word.pronunciation.romaji}
          </p>
          <p className="word-katakana">
            {word.pronunciation.katakana}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardFace;
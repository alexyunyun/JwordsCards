import React from 'react';
import type { Word } from '../types';
import '../styles/CardFace.css';

interface CardFaceProps {
  word: Word;
}

const CardFace: React.FC<CardFaceProps> = ({ word }) => {
  return (
    <div className="card-face">
      <div className="card-content">
        <div className="card-text-container">
          {/* 日语单词 */}
          <h1 className="word-main font-japanese">
            {word.word}
          </h1>
          
          {/* 假名发音 */}
          <div className="pronunciation-container">
            <p className="word-pronunciation">
              {word.pronunciation.romaji}
            </p>
            <p className="word-katakana">
              {word.pronunciation.katakana}
            </p>
          </div>
          
          {/* 中文释义 */}
          <div className="meaning-container">
            <h2 className="word-meaning font-chinese">
              {word.meaning}
            </h2>
          </div>
          
          {/* 例句 */}
          {word.example && (
            <div className="example-container">
              <p className="word-example font-japanese">
                {word.example}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardFace;
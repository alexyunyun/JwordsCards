import React from 'react';
import { motion } from 'framer-motion';
import CardFace from './CardFace';
import type { Word } from '../types';

interface FlipCardProps {
  word: Word;
  isFlipped: boolean;
  onFlip: () => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ word, isFlipped, onFlip }) => {
  return (
    <motion.div
      className="w-full h-full cursor-pointer card-container"
      onClick={onFlip}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div
        className={`card-flip ${
          isFlipped ? 'flipped' : ''
        } w-full h-full relative`}
      >
        {/* 正面 - 日语单词 */}
        <CardFace word={word} />
        
        {/* 背面 - 中文释义 */}
        <CardFace word={word} isBack />
      </div>
    </motion.div>
  );
};

export default FlipCard;
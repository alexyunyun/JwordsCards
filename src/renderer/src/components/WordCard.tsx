import React from 'react';
import { motion } from 'framer-motion';
import CardFace from './CardFace';
import type { Word } from '../types';
import '../styles/WordCard.css';

interface WordCardProps {
  word: Word;
}

const WordCard: React.FC<WordCardProps> = ({ word }) => {
  return (
    <motion.div
      key={word.id}
      className="word-card-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="card-content-wrapper">
        <CardFace word={word} />
      </div>
    </motion.div>
  );
};

export default WordCard;
import { motion } from 'framer-motion';
import '../styles/Loading.css';

function Loading(): JSX.Element {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.p
          className="loading-text"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          加载中...
        </motion.p>
      </div>
    </div>
  );
}

export default Loading;

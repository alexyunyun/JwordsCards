import { motion } from 'framer-motion';
import '../styles/ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps): JSX.Element {
  return (
    <div className="error-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="error-content"
      >
        <div className="error-icon">
          <svg
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>

        <h3 className="error-title">出现错误</h3>

        <p className="error-message">{message}</p>

        {onRetry && (
          <motion.button
            onClick={onRetry}
            className="error-retry-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            重试
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

export default ErrorMessage;

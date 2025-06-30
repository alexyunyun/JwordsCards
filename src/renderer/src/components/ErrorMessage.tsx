import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps): JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-xl p-8 text-center max-w-md"
      >
        <div className="text-red-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-white mb-2">出现错误</h3>

        <p className="text-white/80 mb-6">{message}</p>

        {onRetry && (
          <motion.button
            onClick={onRetry}
            className="px-6 py-2 bg-blue-500/20 text-blue-300 rounded-lg glass btn-hover transition-all duration-300 hover:bg-blue-500/30"
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

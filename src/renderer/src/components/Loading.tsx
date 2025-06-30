import { motion } from 'framer-motion';

function Loading(): JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="glass rounded-xl p-8 flex flex-col items-center">
        <motion.div
          className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.p
          className="text-white/80 mt-4 text-lg"
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

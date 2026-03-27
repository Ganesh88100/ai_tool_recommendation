import { motion } from "framer-motion";

const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex flex-col items-center justify-center py-16 gap-4"
  >
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-md border border-primary/20" />
      <div className="absolute inset-0 rounded-md border border-transparent border-t-primary animate-spin" />
    </div>
    <div className="font-mono text-xs text-primary animate-flicker">
      {">"} Scanning AI database...
    </div>
  </motion.div>
);

export default LoadingSpinner;

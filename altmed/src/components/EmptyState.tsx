import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

/**
 * Empty State Component
 * Shows helpful guidance when there's no data to display
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      <div className="bg-warm-700/50 p-6 rounded-full mb-6">
        <Icon size={48} className="text-warm-400" />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 font-display">{title}</h3>
      <p className="text-warm-300 mb-6 max-w-md leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="bg-electric-500 hover:bg-electric-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default EmptyState;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send } from 'lucide-react';

interface FirstEntryPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: string) => void;
}

const FirstEntryPrompt: React.FC<FirstEntryPromptProps> = ({ isOpen, onClose, onSubmit }) => {
  const [entry, setEntry] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(entry);
      setEntry('');
      onClose();
    } catch (error) {
      console.error('Error submitting first entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-warm-700 rounded-xl shadow-2xl max-w-2xl w-full p-8 border border-warm-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-electric-500/20 p-3 rounded-lg">
                  <Sparkles className="text-electric-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">
                    Welcome to ThriverHealth.Ai!
                  </h2>
                  <p className="text-warm-300 text-sm mt-1">
                    Let's start your health journey
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-warm-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-warm-200 mb-4 leading-relaxed">
                Tell us about your health journey. Share your diagnosis, symptoms, current treatments, 
                or any health concerns you'd like to explore. Our AI will help you understand your 
                condition and discover personalized treatment options.
              </p>
              <div className="bg-warm-800/50 rounded-lg p-4 border border-warm-600">
                <p className="text-sm text-warm-300 mb-2 font-medium">Examples:</p>
                <ul className="text-sm text-warm-400 space-y-1 list-disc list-inside">
                  <li>"I was diagnosed with prostate cancer 6 months ago. I'm currently on hormone therapy and looking for complementary treatments."</li>
                  <li>"I have type 2 diabetes and want to explore natural ways to manage my blood sugar."</li>
                  <li>"I'm experiencing chronic fatigue and want to understand what might be causing it."</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-warm-300 mb-2">
                  Your Health Story
                </label>
                <textarea
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-warm-800 border border-warm-600 rounded-lg text-white focus:ring-2 focus:ring-electric-400 focus:border-electric-400 outline-none resize-none"
                  placeholder="Share your health journey, diagnosis, symptoms, treatments, or questions..."
                />
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-warm-300 hover:text-white transition-colors"
                  disabled={isSubmitting}
                >
                  Skip for now
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-electric-500 hover:bg-electric-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting || !entry.trim()}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Processing...' : 'Start My Journey'}</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FirstEntryPrompt;


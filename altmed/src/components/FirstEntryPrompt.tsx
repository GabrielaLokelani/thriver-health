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
            className="max-w-2xl w-full p-8 rounded-2xl"
            style={{
              background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 132, 0, 0.05)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="icon-glow">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white font-display">
                    Welcome to ThriverHealth.Ai!
                  </h2>
                  <p className="text-surface-50 text-sm mt-1">
                    Let's start your health journey
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-surface-50 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-surface-50 mb-4 leading-relaxed">
                Tell us about your health journey. Share your diagnosis, symptoms, current treatments, 
                or any health concerns you'd like to explore. Our AI will help you understand your 
                condition and discover personalized treatment options.
              </p>
              <div className="bg-surface-20/50 rounded-xl p-4 border border-surface-30/50">
                <p className="text-sm text-white mb-2 font-medium">Examples:</p>
                <ul className="text-sm text-surface-50 space-y-1 list-disc list-inside">
                  <li>"I was diagnosed with prostate cancer 6 months ago. I'm currently on hormone therapy and looking for complementary treatments."</li>
                  <li>"I have type 2 diabetes and want to explore natural ways to manage my blood sugar."</li>
                  <li>"I'm experiencing chronic fatigue and want to understand what might be causing it."</li>
                </ul>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-50 mb-2">
                  Your Health Story
                </label>
                <textarea
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  required
                  rows={6}
                  className="input-glow resize-none"
                  placeholder="Share your health journey, diagnosis, symptoms, treatments, or questions..."
                />
              </div>
              <div className="flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-surface-50 hover:text-white transition-colors"
                  disabled={isSubmitting}
                >
                  Skip for now
                </button>
                <button
                  type="submit"
                  className="btn-glow flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
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


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);
      onSuccess?.();
      onClose();
    } catch (err: any) {
      let errorMessage = err.message || 'Login failed. Please check your credentials.';
      
      // Check for backend not configured error
      if (errorMessage.includes('UserPool not configured') || 
          errorMessage.includes('not configured') ||
          errorMessage.includes('Backend not configured')) {
        errorMessage = 'Backend not deployed yet. The authentication system needs to be set up first. Please contact support or check Amplify Console to deploy the backend.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-warm-700 rounded-xl shadow-2xl max-w-md w-full p-6 border border-warm-600"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white font-display">Login</h2>
            <button
              onClick={onClose}
              className="text-warm-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-warm-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-warm-800 border border-warm-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-white placeholder-warm-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-warm-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-400" />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-warm-800 border border-warm-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-white placeholder-warm-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LoginModal;


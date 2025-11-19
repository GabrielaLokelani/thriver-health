import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { signUp, confirmSignUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(formData.email, formData.password, formData.name);
      setShowConfirmation(true);
    } catch (err: any) {
      let errorMessage = err.message || 'Sign up failed. Please try again.';
      
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

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await confirmSignUp(formData.email, confirmationCode);
      setShowConfirmation(false);
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Confirmation failed. Please check your code.');
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
            <h2 className="text-2xl font-bold text-white font-display">
              {showConfirmation ? 'Confirm Your Email' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="text-warm-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>

          {!showConfirmation ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-warm-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-warm-800 border border-warm-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-white placeholder-warm-400"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

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
                    placeholder="Create a password (min. 8 characters)"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-warm-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-400" />
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-warm-800 border border-warm-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-white placeholder-warm-400"
                    placeholder="Confirm your password"
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
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleConfirm} className="space-y-4">
              <p className="text-warm-300 mb-4">
                We've sent a confirmation code to <strong>{formData.email}</strong>. Please enter it below.
              </p>
              <div>
                <label className="block text-sm font-medium text-warm-300 mb-2">
                  Confirmation Code
                </label>
                <input
                  type="text"
                  value={confirmationCode}
                  onChange={(e) => setConfirmationCode(e.target.value)}
                  className="w-full px-4 py-3 bg-warm-800 border border-warm-600 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-white placeholder-warm-400"
                  placeholder="Enter 6-digit code"
                  required
                />
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
                {isLoading ? 'Confirming...' : 'Confirm Email'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SignUpModal;


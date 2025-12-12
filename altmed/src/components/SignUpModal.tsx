import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { signUp, confirmSignUp, signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!formData.email || !formData.name) {
      setError('Please fill in all fields');
      return;
    }

    if (!acceptedTerms) {
      setError('You must accept the Terms and Conditions to create an account');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(formData.email, formData.password, formData.name);
      // If we get here, signup was successful and user is signed in
      onSuccess();
      onClose();
    } catch (err: any) {
      console.log('SignUp error:', err);
      console.log('Error message:', err.message);
      console.log('isConfirmationRequired:', err.isConfirmationRequired);
      
      // Check if confirmation is required
      if (err.message === 'CONFIRMATION_REQUIRED' || err.isConfirmationRequired) {
        console.log('Setting needsConfirmation to true');
        setNeedsConfirmation(true);
        setError(null);
        setIsLoading(false);
        // Don't close modal - stay open to show confirmation step
        return;
      } else {
        setError(err.message || 'Sign up failed. Please try again.');
        setIsLoading(false);
      }
    }
  };

  const handleConfirmCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!confirmationCode || confirmationCode.length !== 6) {
      setError('Please enter a valid 6-digit confirmation code');
      return;
    }

    setIsConfirming(true);
    try {
      await confirmSignUp(formData.email, confirmationCode);
      // After confirmation, sign in the user
      await signIn(formData.email, formData.password);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Confirmation failed. Please try again.');
    } finally {
      setIsConfirming(false);
    }
  };

  const handleResendCode = async () => {
    // Note: Amplify doesn't have a direct resend code function in v6
    // Users would need to sign up again or use the forgot password flow
    setError('Please check your email for the confirmation code. If you need a new code, please try signing up again.');
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
          onClick={(e) => {
            // Don't close if we're in confirmation step or confirming
            if (!needsConfirmation && !isConfirming) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-warm-700 rounded-xl shadow-2xl max-w-md w-full p-6 border border-warm-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white font-display">
                {needsConfirmation ? 'Confirm Your Email' : 'Start Your Free Trial'}
              </h2>
              <button
                onClick={onClose}
                className="text-warm-400 hover:text-white transition-colors"
                aria-label="Close modal"
                disabled={isConfirming}
              >
                <X size={24} />
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-sm">
                {error}
              </div>
            )}

            {needsConfirmation ? (
              // Confirmation Code Step
              <div className="space-y-4">
                <div className="bg-electric-500/20 border border-electric-500/30 rounded-lg p-4 mb-4">
                  <p className="text-sm text-white">
                    We've sent a confirmation code to <strong>{formData.email}</strong>. 
                    Please check your email and enter the code below.
                  </p>
                </div>
                
                <form onSubmit={handleConfirmCode} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-warm-300 mb-2">
                      Confirmation Code
                    </label>
                    <input
                      type="text"
                      value={confirmationCode}
                      onChange={(e) => setConfirmationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      required
                      maxLength={6}
                      className="w-full px-4 py-2 bg-warm-800 border border-warm-600 rounded-lg text-white text-center text-2xl tracking-widest focus:ring-2 focus:ring-electric-400 focus:border-electric-400 outline-none"
                      placeholder="000000"
                      autoFocus
                    />
                    <p className="text-xs text-warm-400 mt-2 text-center">
                      Enter the 6-digit code from your email
                    </p>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-electric-500 hover:bg-electric-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isConfirming || confirmationCode.length !== 6}
                  >
                    {isConfirming ? 'Confirming...' : 'Confirm Account'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="w-full text-warm-400 hover:text-white text-sm py-2 transition-colors"
                  >
                    Didn't receive the code? Click here for help
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => {
                      setNeedsConfirmation(false);
                      setConfirmationCode('');
                      setError(null);
                    }}
                    className="w-full text-warm-400 hover:text-white text-sm py-2 transition-colors"
                  >
                    Back to sign up
                  </button>
                </form>
              </div>
            ) : (
              // Sign Up Form
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-warm-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-warm-800 border border-warm-600 rounded-lg text-white focus:ring-2 focus:ring-electric-400 focus:border-electric-400 outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-warm-800 border border-warm-600 rounded-lg text-white focus:ring-2 focus:ring-electric-400 focus:border-electric-400 outline-none"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-300 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-warm-800 border border-warm-600 rounded-lg text-white focus:ring-2 focus:ring-electric-400 focus:border-electric-400 outline-none"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-warm-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-warm-800 border border-warm-600 rounded-lg text-white focus:ring-2 focus:ring-electric-400 focus:border-electric-400 outline-none"
                    placeholder="Confirm your password"
                  />
                </div>
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-electric-500 bg-warm-800 border-warm-600 rounded focus:ring-electric-400 focus:ring-2"
                  />
                  <label htmlFor="terms" className="text-sm text-warm-300">
                    I consent to sharing my user data and medical information with ThriverHealth.Ai for the purpose of providing personalized health recommendations and services. I understand that my data will be used in accordance with the Terms of Service and Privacy Policy.
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-electric-500 hover:bg-electric-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !acceptedTerms}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            {!needsConfirmation && (
              <p className="text-xs text-warm-400 mt-4 text-center">
                By creating an account, you agree to our Terms of Service and Privacy Policy
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignUpModal;


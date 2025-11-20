import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  User, 
  MessageSquare, 
  ShoppingCart,
  TrendingUp,
  Users,
  Sparkles,
  LogOut,
  LogIn
} from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import LoginModal from './components/LoginModal';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import OnboardingWizard from './pages/OnboardingWizard';
import Dashboard from './pages/Dashboard';
import AIAgent from './pages/AIAgent';
import ExploreServices from './pages/ExploreServices';
import WellnessJournal from './pages/WellnessJournal';
import Profile from './pages/Profile';
import SearchAndAnalysis from './pages/SearchAndAnalysis';
import CreateTestimonial from './pages/CreateTestimonial';
import Shop from './pages/Shop';
import SocialNetwork from './pages/SocialNetwork';
import Partners from './pages/Partners';

const Navigation: React.FC = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: TrendingUp },
    { path: '/ai-agent', label: 'AI Agent', icon: Sparkles },
    { path: '/social', label: 'Community', icon: Users },
    { path: '/partners', label: 'Partners', icon: TrendingUp },
    { path: '/create-testimonial', label: 'Share Experience', icon: MessageSquare },
    { path: '/shop', label: 'Products', icon: ShoppingCart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-sm border-b border-sage-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link to="/" className="text-2xl font-bold text-gradient">
                ThriverHealth.Ai
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-8"
            >
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 text-warm-800 hover:text-electric-400 transition-colors duration-200 group"
                >
                  <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-warm-300">
                  <span className="text-warm-700 text-sm">{user?.name || user?.email}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-warm-800 hover:text-red-500 transition-colors duration-200"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 text-warm-800 hover:text-electric-400 transition-colors duration-200 ml-4 pl-4 border-l border-warm-300"
                >
                  <LogIn size={18} />
                  <span className="font-medium">Login</span>
                </button>
              )}
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className="text-warm-800 hover:text-electric-400 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => setShowLoginModal(false)}
      />
    </>
  );
};

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-warm-800">
      <Navigation />
      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingWizard /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/ai-agent" element={<ProtectedRoute><AIAgent /></ProtectedRoute>} />
          <Route path="/explore-services" element={<ProtectedRoute><ExploreServices /></ProtectedRoute>} />
          <Route path="/wellness-journal" element={<ProtectedRoute><WellnessJournal /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/search-analysis" element={<ProtectedRoute><SearchAndAnalysis /></ProtectedRoute>} />
          <Route path="/social" element={<ProtectedRoute><SocialNetwork /></ProtectedRoute>} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/create-testimonial" element={<ProtectedRoute><CreateTestimonial /></ProtectedRoute>} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App; 
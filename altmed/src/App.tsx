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
import Logo from './components/Logo';
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

  // Navigation items for authenticated users
  const authenticatedNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: TrendingUp },
    { path: '/ai-agent', label: 'AI Agent', icon: Sparkles },
    { path: '/social', label: 'Community', icon: Users },
    { path: '/partners', label: 'Partners', icon: TrendingUp },
    { path: '/create-testimonial', label: 'Share Experience', icon: MessageSquare },
    { path: '/shop', label: 'Products', icon: ShoppingCart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  // Navigation items for non-authenticated users
  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
  ];

  return (
    <>
      <nav 
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          background: 'rgba(10, 10, 10, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link to="/" className="flex items-center">
                <Logo size="sm" showText={true} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center space-x-1"
            >
              {(isAuthenticated ? authenticatedNavItems : publicNavItems).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/10">
                  <span className="text-gray-500 text-sm">{user.name || user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                  >
                    <LogOut size={18} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center space-x-2 ml-4 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #ff8400 0%, #ff6b00 100%)',
                    color: '#000',
                    boxShadow: '0 0 20px rgba(255, 132, 0, 0.3)'
                  }}
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
              )}
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className="text-gray-400 hover:text-orange-400 transition-colors p-2"
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
    <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
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
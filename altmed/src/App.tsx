import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  User, 
  BookOpen, 
  MessageSquare, 
  ShoppingCart,
  Database,
  TrendingUp,
  Users
} from 'lucide-react';
import LandingPage from './pages/LandingPage';
import OnboardingWizard from './pages/OnboardingWizard';
import Dashboard from './pages/Dashboard';
import ExploreServices from './pages/ExploreServices';
import WellnessJournal from './pages/WellnessJournal';
import Profile from './pages/Profile';
import SearchAndAnalysis from './pages/SearchAndAnalysis';
import CreateTestimonial from './pages/CreateTestimonial';
import Shop from './pages/Shop';
import SocialNetwork from './pages/SocialNetwork';
import Partners from './pages/Partners';

const App: React.FC = () => {
  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: TrendingUp },
    { path: '/search-analysis', label: 'Research', icon: Database },
    { path: '/explore-services', label: 'Treatments', icon: BookOpen },
    { path: '/social', label: 'Community', icon: Users },
    { path: '/partners', label: 'Partners', icon: TrendingUp },
    { path: '/create-testimonial', label: 'Share Experience', icon: MessageSquare },
    { path: '/shop', label: 'Products', icon: ShoppingCart },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-warm-800">
        {/* Navigation */}
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
              </motion.div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-warm-800 hover:text-electric-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/onboarding" element={<OnboardingWizard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore-services" element={<ExploreServices />} />
            <Route path="/wellness-journal" element={<WellnessJournal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search-analysis" element={<SearchAndAnalysis />} />
            <Route path="/social" element={<SocialNetwork />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/create-testimonial" element={<CreateTestimonial />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 
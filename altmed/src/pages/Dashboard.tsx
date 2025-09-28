import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  Users, 
  Calendar, 
  Target, 
  ArrowRight,
  AlertTriangle,
  Database,
  MessageSquare
} from 'lucide-react';
import { storage } from '../utils/storage';
import RecommendationCard from '../components/RecommendationCard';
import { recommendations } from '../data/recommendations';

interface WellnessMetrics {
  energy: number;
  sleep: number;
  mood: number;
  stress: number;
}

const Dashboard: React.FC = () => {
  const [userProfile] = useState(storage.getUserProfile());
  const [wellnessEntries] = useState(storage.getWellnessEntries());
  const [savedRecommendations, setSavedRecommendations] = useState(storage.getSavedRecommendations());
  const [activeTab, setActiveTab] = useState<'immediate' | 'weekly' | 'long-term'>('immediate');
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const demoMode = localStorage.getItem('altmed_demo_mode');
    setIsDemoMode(demoMode === 'true');
  }, []);

  // const calculateWellnessMetrics = (): WellnessMetrics => {
  //   if (wellnessEntries.length === 0) {
  //     return { energy: 7, sleep: 6, mood: 7, stress: 4 };
  //   }

  //   const recentEntries = wellnessEntries.slice(-7);
  //   const avgEnergy = recentEntries.reduce((sum, entry) => sum + entry.energy, 0) / recentEntries.length;
  //   const avgSleep = recentEntries.reduce((sum, entry) => sum + entry.sleep, 0) / recentEntries.length;
  //   const avgMood = recentEntries.reduce((sum, entry) => sum + entry.mood, 0) / recentEntries.length;
  //   const avgStress = recentEntries.reduce((sum, entry) => sum + entry.stress, 0) / recentEntries.length;

  //   return {
  //     energy: Math.round(avgEnergy),
  //     sleep: Math.round(avgSleep),
  //     mood: Math.round(avgMood),
  //     stress: Math.round(avgStress)
  //   };
  // };

  // const metrics = calculateWellnessMetrics();
  const filteredRecommendations = recommendations.filter(rec => {
    if (activeTab === 'immediate') return rec.urgency === 'immediate';
    if (activeTab === 'weekly') return rec.urgency === 'weekly';
    return rec.urgency === 'long-term';
  });

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-warm-800">
      {/* Hero Section */}
      <section className="bg-electric-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {getGreeting()}, {userProfile?.name || 'Patient'}
              </h1>
              <p className="text-xl opacity-90">
                {getCurrentDate()} • Disease Management Research Dashboard
              </p>
            </div>
            {isDemoMode && (
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                Demo Mode
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Research Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <div className="modern-card p-8 mb-8">
              <h2 className="text-3xl font-bold text-white mb-6">
                Your Disease Research Overview
              </h2>
              <p className="text-lg text-warm-300 mb-8 leading-relaxed">
                Track your alternative medicine research progress and treatment effectiveness for serious diseases. 
                Get free AI-generated recommendations for diet, exercise, and therapy that you can do on your own.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-electric-500/20 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Database size={24} className="text-electric-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">Research Studies</h3>
                  </div>
                  <div className="text-3xl font-bold text-electric-400 mb-2">24</div>
                  <p className="text-warm-300">Studies reviewed this month</p>
                </div>
                
                <div className="bg-lime-500/20 p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Users size={24} className="text-lime-400 mr-3" />
                    <h3 className="text-xl font-semibold text-white">Community Insights</h3>
                  </div>
                  <div className="text-3xl font-bold text-lime-400 mb-2">156</div>
                  <p className="text-warm-300">Patient testimonials analyzed</p>
                  <button className="mt-3 text-sm text-lime-400 hover:text-lime-400 font-medium">
                    Ask Questions →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="modern-card p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-between group">
                  <div className="flex items-center">
                    <Search size={20} className="mr-3" />
                    <span className="font-medium">Search Treatments</span>
                  </div>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="w-full bg-bright-500 hover:bg-bright-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-between group">
                  <div className="flex items-center">
                    <MessageSquare size={20} className="mr-3" />
                    <span className="font-medium">Share Experience</span>
                  </div>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="w-full bg-lime-500 hover:bg-lime-600 text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-between group">
                  <div className="flex items-center">
                    <Users size={20} className="mr-3" />
                    <span className="font-medium">Join Community</span>
                  </div>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Treatment Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="modern-card p-8 mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Your Treatment Plan</h2>
              <p className="text-warm-300 mt-2">Free and AI-generated recommendations for your health journey</p>
            </div>
            <div className="flex space-x-2 bg-warm-700/50 p-1 rounded-lg">
              {[
                { id: 'immediate', label: 'Immediate', icon: AlertTriangle },
                { id: 'weekly', label: 'Weekly', icon: Calendar },
                { id: 'long-term', label: 'Long-term', icon: Target }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center ${
                    activeTab === tab.id
                      ? 'bg-white text-warm-800 shadow-sm'
                      : 'text-warm-800 hover:text-white'
                  }`}
                >
                  <tab.icon size={16} className="mr-2" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Free & AI Recommendations */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold text-sm">$</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Free & AI-Generated Recommendations</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations
                .filter(rec => rec.cost === 'free')
                .slice(0, 6)
                .map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    isSaved={savedRecommendations.includes(recommendation.id)}
                    onSave={() => {
                      const newSaved = savedRecommendations.includes(recommendation.id)
                        ? savedRecommendations.filter(id => id !== recommendation.id)
                        : [...savedRecommendations, recommendation.id];
                      setSavedRecommendations(newSaved);
                      storage.saveRecommendation(recommendation.id);
                    }}
                    onRemove={() => {
                      const newSaved = savedRecommendations.filter(id => id !== recommendation.id);
                      setSavedRecommendations(newSaved);
                      storage.removeRecommendation(recommendation.id);
                    }}
                    className="hover-lift border-l-4 border-green-500"
                  />
                ))}
            </div>
          </div>

          {/* Partner Recommendations */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 bg-electric-500/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-electric-400 font-bold text-sm">P</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Partner Recommendations</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations
                .filter(rec => rec.cost !== 'free')
                .slice(0, 3)
                .map((recommendation) => (
                  <RecommendationCard
                    key={recommendation.id}
                    recommendation={recommendation}
                    isSaved={savedRecommendations.includes(recommendation.id)}
                    onSave={() => {
                      const newSaved = savedRecommendations.includes(recommendation.id)
                        ? savedRecommendations.filter(id => id !== recommendation.id)
                        : [...savedRecommendations, recommendation.id];
                      setSavedRecommendations(newSaved);
                      storage.saveRecommendation(recommendation.id);
                    }}
                    onRemove={() => {
                      const newSaved = savedRecommendations.filter(id => id !== recommendation.id);
                      setSavedRecommendations(newSaved);
                      storage.removeRecommendation(recommendation.id);
                    }}
                    className="hover-lift border-l-4 border-lavender-500"
                  />
                ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="modern-card p-8"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Recent Research Activity</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-4 bg-warm-600/30 rounded-xl">
              <div className="bg-electric-500/20 p-3 rounded-lg">
                <Search size={20} className="text-electric-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">Researched Ivermectin for Cancer</h4>
                <p className="text-warm-300 text-sm mb-2">Found 12 studies and 8 patient testimonials</p>
                <div className="flex items-center text-xs text-warm-400">
                  <Calendar size={14} className="mr-1" />
                  2 hours ago
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-warm-600/30 rounded-xl">
              <div className="bg-lime-500/20 p-3 rounded-lg">
                <MessageSquare size={20} className="text-lime-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">Shared Treatment Experience</h4>
                <p className="text-warm-300 text-sm mb-2">Posted testimonial about methylene blue therapy</p>
                <div className="flex items-center text-xs text-warm-400">
                  <Calendar size={14} className="mr-1" />
                  1 day ago
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-warm-600/30 rounded-xl">
              <div className="bg-orange-500/20 p-3 rounded-lg">
                <BookOpen size={20} className="text-orange-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">Reviewed Research Study</h4>
                <p className="text-warm-300 text-sm mb-2">Analyzed clinical trial on alternative cancer treatments</p>
                <div className="flex items-center text-xs text-warm-400">
                  <Calendar size={14} className="mr-1" />
                  3 days ago
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 
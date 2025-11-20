import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Users, TrendingUp, BookOpen, Zap, Sparkles, Bot, User } from 'lucide-react';
import PlaceholderImage from '../components/PlaceholderImage';
import { loadDemoData } from '../utils/demoData';
import SignUpModal from '../components/SignUpModal';
import { useAuth } from '../hooks/useAuth';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleDemoMode = () => {
    try {
      console.log('Loading demo data...');
      loadDemoData();
      console.log('Demo data loaded successfully!');
    } catch (error) {
      console.error('Error loading demo data:', error);
    }
  };

  const handleStartFreeTrial = () => {
    if (isAuthenticated) {
      navigate('/ai-agent');
    } else {
      setShowSignUpModal(true);
    }
  };

  const handleSignUpSuccess = () => {
    setShowSignUpModal(false);
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('altmed_onboarding_completed') === 'true';
    if (!hasCompletedOnboarding) {
      // Navigate to onboarding first
      navigate('/onboarding');
    } else {
      // Navigate to AI agent with first entry prompt
      navigate('/ai-agent?firstEntry=true');
    }
  };

  return (
    <div className="min-h-screen bg-warm-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-warm-800">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-display">
                Help yourself thrive through disease
                <span className="text-orange-400 block">to reclaim your health</span>
              </h1>
              <p className="text-lg text-warm-300 mb-8 leading-relaxed font-modern max-w-xl">
                Learn faster. Decide smarter. Act with confidence—powered by evidence, experts, and a community of thrivers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartFreeTrial}
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight size={20} className="ml-2" />
                </button>
                <button
                  onClick={handleDemoMode}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-orange-500/25 text-lg flex items-center justify-center"
                >
                  <Zap size={20} className="mr-2" />
                  TRY DEMO
                </button>
              </div>
              <p className="text-sm text-warm-400 mt-4 font-tech">
                Evidence-aligned • Personal plans • Community-powered
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 -z-10 opacity-10">
                <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-400 to-transparent animate-scan" />
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-0 to-transparent animate-scan" />
              </div>
              <PlaceholderImage category="treatment" size="large" className="w-full rounded-2xl shadow-2xl ring-1 ring-surface-20" alt="Alternative Medicine Research" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition - Headline and Bullets */}
      <section className="py-16 bg-surface-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white font-display">
              Help yourself thrive through disease to reclaim your health
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="modern-card p-6 h-full"
            >
              <div className="flex items-start gap-3">
                <div className="bg-electric-500/20 p-2 rounded-lg">
                  <BookOpen size={20} className="text-electric-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Learn about your disease</h3>
                  <p className="text-surface-50 text-sm">Curated knowledge and simplified explainers so you understand options fast.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="modern-card p-6 h-full"
            >
              <div className="flex items-start gap-3">
                <div className="bg-lime-500/20 p-2 rounded-lg">
                  <Shield size={20} className="text-lime-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Research therapies with our AI</h3>
                  <p className="text-surface-50 text-sm">Compare conventional & alternative approaches side‑by‑side with evidence.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="modern-card p-6 h-full"
            >
              <div className="flex items-start gap-3">
                <div className="bg-orange-500/20 p-2 rounded-lg">
                  <Users size={20} className="text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Connect with leaders & thrivers</h3>
                  <p className="text-surface-50 text-sm">Find specialists, practitioners, thought leaders, and peers with the same condition.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="modern-card p-6 h-full"
            >
              <div className="flex items-start gap-3">
                <div className="bg-primary-0/20 p-2 rounded-lg">
                  <TrendingUp size={20} className="text-primary-0" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Create a plan & track your journey</h3>
                  <p className="text-surface-50 text-sm">Build a personal plan, log metrics, and see progress over time.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Condensed value already shown above */}

      {/* AI Agent Feature Highlight */}
      <section className="py-20 bg-gradient-to-br from-electric-500/10 via-primary-0/10 to-lime-500/10 border-y border-primary-0/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-0/20 border border-primary-0/30 rounded-full mb-6">
                <Sparkles size={18} className="text-primary-0" />
                <span className="text-primary-0 font-tech text-sm">AI-POWERED RESEARCH ASSISTANT</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
                Your intelligent health research assistant
              </h2>
              <p className="text-xl text-warm-300 mb-8 leading-relaxed font-modern">
                Chat with our AI agent to research diseases, explore treatments, get personalized summaries, and discover relevant videos and studies—all in one place.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-0 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold">Research treatments</span>
                    <span className="text-warm-300"> — Ask about conventional and alternative therapies</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-0 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold">Get condition summaries</span>
                    <span className="text-warm-300"> — AI analyzes your health journey</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-0 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <span className="text-white font-semibold">Discover content</span>
                    <span className="text-warm-300"> — Find videos, studies, and recommendations automatically</span>
                  </div>
                </li>
              </ul>
              <Link
                to="/ai-agent"
                className="btn-primary inline-flex items-center text-lg px-8 py-4"
              >
                <Sparkles size={20} className="mr-2" />
                Try AI Agent Now
                <ArrowRight size={20} className="ml-2" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="modern-card p-8 bg-surface-10/80 backdrop-blur-sm border-2 border-primary-0/30">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-4 border-b border-surface-20">
                    <div className="w-10 h-10 rounded-xl bg-primary-0 flex items-center justify-center">
                      <Sparkles size={20} className="text-black" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Thriver AI</h3>
                      <p className="text-xs text-surface-50">Online</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-0 flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-black" />
                      </div>
                      <div className="bg-surface-20 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm text-white">Hello! I can help you research treatments and understand your condition. What would you like to explore?</p>
                      </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                      <div className="bg-primary-0 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm text-black">Can you summarize my condition?</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-surface-20 flex items-center justify-center flex-shrink-0">
                        <User size={14} className="text-primary-0" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof - Thrivers Testimonials */}
      <section className="py-20 bg-surface-tonal-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display">What thrivers are saying</h2>
            <p className="text-surface-50 mt-2">Real stories from people using Thriver to navigate serious disease</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="modern-card p-6 h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-lime-500/20 border border-lime-500/30 flex items-center justify-center font-tech text-lime-400">A</div>
                <div>
                  <h4 className="text-white font-semibold">Alex • Cancer</h4>
                  <span className="text-xs text-surface-50">Thriver since 2024</span>
                </div>
              </div>
              <p className="text-warm-300">“Thriver helped me cut through noise and find options that actually made sense alongside my standard care. The plan & tracking gave me clarity and calm.”</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="modern-card p-6 h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-electric-500/20 border border-electric-500/30 flex items-center justify-center font-tech text-electric-400">D</div>
                <div>
                  <h4 className="text-white font-semibold">Dana • Diabetes</h4>
                  <span className="text-xs text-surface-50">Thriver since 2023</span>
                </div>
              </div>
              <p className="text-warm-300">“I learned more in two weeks here than months of searching. The community and expert content made all the difference for my day‑to‑day.”</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="modern-card p-6 h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center font-tech text-orange-400">M</div>
                <div>
                  <h4 className="text-white font-semibold">Morgan • MS</h4>
                  <span className="text-xs text-surface-50">Thriver since 2022</span>
                </div>
              </div>
              <p className="text-warm-300">“The blend of conventional and alternative insights helped me build a plan that felt mine. Tracking kept me honest and hopeful.”</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Comprehensive Disease Management Platform
            </h2>
            <p className="text-xl text-warm-300 max-w-4xl mx-auto leading-relaxed">
              From research studies to personalized treatment plans, we provide everything you need to make informed decisions about alternative therapies for serious diseases.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-electric-500/20 p-3 rounded-lg">
                    <BookOpen size={24} className="text-electric-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Research Database</h3>
                    <p className="text-warm-300 leading-relaxed">
                      Access thousands of studies on alternative therapies for cancer, autoimmune diseases, and other serious conditions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-lime-500/20 p-3 rounded-lg">
                    <TrendingUp size={24} className="text-lime-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Treatment Analysis</h3>
                    <p className="text-warm-300 leading-relaxed">
                      AI-powered analysis of treatment effectiveness, side effects, and patient outcomes for alternative therapies.
                    </p>
                  </div>
                </div>

                                 <div className="flex items-start space-x-4">
                   <div className="bg-orange-500/20 p-3 rounded-lg">
                     <Users size={24} className="text-orange-400" />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-white mb-2">Patient Testimonials</h3>
                     <p className="text-warm-300 leading-relaxed">
                       Real experiences from patients who have tried alternative treatments for serious diseases.
                     </p>
                   </div>
                 </div>

                 <div className="flex items-start space-x-4">
                   <div className="bg-lime-500/20 p-3 rounded-lg">
                     <TrendingUp size={24} className="text-lime-400" />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-white mb-2">Partner Network</h3>
                     <p className="text-warm-300 leading-relaxed">
                       Connect with thought leaders like Dr. Makis, share content, and earn commissions through our social network.
                     </p>
                   </div>
                 </div>
               </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
                             <PlaceholderImage category="condition" size="large" className="w-full rounded-2xl shadow-2xl" alt="Medical Research" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-electric-500">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Explore Alternative Therapies?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of patients who are taking control of their health journey with verified alternative medicine information, AI-generated recommendations, and a thriving community of thought leaders and patients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartFreeTrial}
                className="bg-white text-electric-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-warm-600/30 transition-all duration-300 flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight size={20} className="ml-2" />
              </button>
              <button
                onClick={handleDemoMode}
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                <Zap size={20} className="mr-2" />
                Quick Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-12 bg-warm-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Important Legal Notice</h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-warm-300 leading-relaxed mb-4">
                <strong>Disclaimer:</strong> This platform provides information only and does not constitute medical advice. 
                We are not recommending treatments but reflecting community experiences and research data.
              </p>
              <p className="text-base text-warm-300 leading-relaxed">
                Always consult with healthcare professionals before starting any treatment. 
                The information provided is for educational purposes and should not replace professional medical guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-warm-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ThriverHealth.Ai</h3>
              <p className="text-warm-400 leading-relaxed">
                Your trusted source for alternative medicine knowledge and personalized health plans.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-warm-400">
                <li><Link to="/search-analysis" className="hover:text-white transition-colors">Research Database</Link></li>
                <li><Link to="/explore-services" className="hover:text-white transition-colors">Treatment Options</Link></li>
                <li><Link to="/social" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link to="/partners" className="hover:text-white transition-colors">Partners</Link></li>
                <li><Link to="/create-testimonial" className="hover:text-white transition-colors">Share Experience</Link></li>
                <li><Link to="/shop" className="hover:text-white transition-colors">Product Directory</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-warm-400">
                <li><button className="hover:text-white transition-colors text-left">Help Center</button></li>
                <li><button className="hover:text-white transition-colors text-left">Contact Us</button></li>
                <li><button className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors text-left">Terms of Service</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <p className="text-sm text-warm-400 leading-relaxed">
                This platform provides information only and does not constitute medical advice. 
                Always consult with healthcare professionals before starting any treatment.
              </p>
            </div>
          </div>
          <div className="border-t border-sage-700 mt-8 pt-8 text-center text-warm-400">
            <p>&copy; 2024 ThriverHealth.Ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <SignUpModal 
        isOpen={showSignUpModal} 
        onClose={() => setShowSignUpModal(false)}
        onSuccess={handleSignUpSuccess}
      />
    </div>
  );
};

export default LandingPage; 
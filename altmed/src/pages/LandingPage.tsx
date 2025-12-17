import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Users, TrendingUp, BookOpen, Zap, Sparkles, Bot, User, Check } from 'lucide-react';
import PlaceholderImage from '../components/PlaceholderImage';
import { loadDemoData } from '../utils/demoData';
import SignUpModal from '../components/SignUpModal';
import { useAuth } from '../hooks/useAuth';
import Logo from '../components/Logo';

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
    navigate('/onboarding');
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1510 50%, #0a0a0a 100%)'
      }}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 132, 0, 0.15) 0%, transparent 50%)'
          }}
        />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Help yourself thrive through disease
                <span 
                  className="block mt-2"
                  style={{
                    background: 'linear-gradient(90deg, #ff8400, #ffae66)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  to reclaim your health
                </span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
                Learn faster. Decide smarter. Act with confidence—powered by evidence, experts, and a community of thrivers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStartFreeTrial}
                  className="text-lg px-8 py-4 flex items-center justify-center rounded-xl font-semibold transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #ff8400 0%, #ff6b00 100%)',
                    color: '#000',
                    boxShadow: '0 0 30px rgba(255, 132, 0, 0.4), 0 4px 15px rgba(255, 132, 0, 0.3)'
                  }}
                >
                  Start Free Trial
                  <ArrowRight size={20} className="ml-2" />
                </button>
                <button
                  onClick={handleDemoMode}
                  className="text-lg px-8 py-4 flex items-center justify-center rounded-xl font-medium transition-all duration-300"
                  style={{
                    background: 'rgba(255, 132, 0, 0.15)',
                    border: '1px solid rgba(255, 132, 0, 0.3)',
                    color: '#ff8400'
                  }}
                >
                  <Zap size={20} className="mr-2" />
                  TRY DEMO
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-6 font-mono tracking-wider">
                Evidence-aligned • Personal plans • Community-powered
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="rounded-2xl overflow-hidden"
                style={{
                  border: '1px solid rgba(255, 132, 0, 0.2)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 132, 0, 0.1)'
                }}
              >
                <PlaceholderImage category="treatment" size="large" className="w-full" alt="Alternative Medicine Research" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section 
        className="py-20"
        style={{
          background: 'linear-gradient(180deg, rgba(26, 21, 16, 0.5) 0%, rgba(10, 10, 10, 0.8) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Everything you need to{' '}
              <span style={{ color: '#ff8400' }}>thrive</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: 'Learn about your disease', desc: 'Curated knowledge and simplified explainers so you understand options fast.', color: '#4077d1' },
              { icon: Shield, title: 'Research therapies with AI', desc: 'Compare conventional & alternative approaches side‑by‑side with evidence.', color: '#47d5a6' },
              { icon: Users, title: 'Connect with thrivers', desc: 'Find specialists, practitioners, thought leaders, and peers with the same condition.', color: '#ff8400' },
              { icon: TrendingUp, title: 'Track your journey', desc: 'Build a personal plan, log metrics, and see progress over time.', color: '#ff8400' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a 0%, #141414 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${item.color}20`,
                    boxShadow: `0 0 20px ${item.color}30`
                  }}
                >
                  <item.icon size={24} style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agent Section */}
      <section 
        className="py-24"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 132, 0, 0.05) 0%, rgba(64, 119, 209, 0.05) 100%)',
          borderTop: '1px solid rgba(255, 132, 0, 0.1)',
          borderBottom: '1px solid rgba(255, 132, 0, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{
                  background: 'rgba(255, 132, 0, 0.15)',
                  border: '1px solid rgba(255, 132, 0, 0.3)'
                }}
              >
                <Sparkles size={18} style={{ color: '#ff8400' }} />
                <span style={{ color: '#ff8400' }} className="font-mono text-sm tracking-wider">AI-POWERED RESEARCH ASSISTANT</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your intelligent health research assistant
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Chat with our AI agent to research diseases, explore treatments, get personalized summaries, and discover relevant videos and studies—all in one place.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { title: 'Research treatments', desc: 'Ask about conventional and alternative therapies' },
                  { title: 'Get condition summaries', desc: 'AI analyzes your health journey' },
                  { title: 'Discover content', desc: 'Find videos, studies, and recommendations automatically' }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div 
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: '#ff8400' }}
                    >
                      <Check size={14} className="text-black" />
                    </div>
                    <div>
                      <span className="text-white font-semibold">{item.title}</span>
                      <span className="text-gray-400"> — {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                to="/ai-agent"
                className="inline-flex items-center text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #ff8400 0%, #ff6b00 100%)',
                  color: '#000',
                  boxShadow: '0 0 30px rgba(255, 132, 0, 0.4)'
                }}
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
            >
              <div 
                className="p-8 rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a 0%, #0f0f0f 100%)',
                  border: '1px solid rgba(255, 132, 0, 0.2)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 132, 0, 0.1)'
                }}
              >
                <div className="flex items-center gap-3 pb-4 border-b border-gray-800 mb-4">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: '#ff8400' }}
                  >
                    <Sparkles size={20} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Thriver AI</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-xs text-gray-500">Online</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#ff8400' }}
                    >
                      <Bot size={14} className="text-black" />
                    </div>
                    <div 
                      className="rounded-2xl px-4 py-3 max-w-[80%]"
                      style={{ background: '#2a2a2a' }}
                    >
                      <p className="text-sm text-white">Hello! I can help you research treatments and understand your condition. What would you like to explore?</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div 
                      className="rounded-2xl px-4 py-3 max-w-[80%]"
                      style={{
                        background: 'linear-gradient(135deg, #ff8400 0%, #ff6b00 100%)',
                        boxShadow: '0 4px 15px rgba(255, 132, 0, 0.3)'
                      }}
                    >
                      <p className="text-sm text-black font-medium">Can you summarize my condition?</p>
                    </div>
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#2a2a2a' }}
                    >
                      <User size={14} style={{ color: '#ff8400' }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        className="py-20"
        style={{ background: '#0a0a0a' }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">What thrivers are saying</h2>
            <p className="text-gray-500 mt-2">Real stories from people using Thriver to navigate serious disease</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Alex', condition: 'Cancer', year: '2024', color: '#47d5a6', quote: '"Thriver helped me cut through noise and find options that actually made sense alongside my standard care. The plan & tracking gave me clarity and calm."' },
              { name: 'Dana', condition: 'Diabetes', year: '2023', color: '#4077d1', quote: '"I learned more in two weeks here than months of searching. The community and expert content made all the difference for my day‑to‑day."' },
              { name: 'Morgan', condition: 'MS', year: '2022', color: '#ff8400', quote: '"The blend of conventional and alternative insights helped me build a plan that felt mine. Tracking kept me honest and hopeful."' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-2xl"
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a 0%, #141414 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono"
                    style={{
                      background: `${item.color}20`,
                      border: `1px solid ${item.color}40`,
                      color: item.color
                    }}
                  >
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{item.name} • {item.condition}</h4>
                    <span className="text-xs text-gray-500">Thriver since {item.year}</span>
                  </div>
                </div>
                <p className="text-gray-400">{item.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-24"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 132, 0, 0.1) 0%, rgba(10, 10, 10, 1) 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to take control of your health?
            </h2>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed">
              Join thousands of patients who are taking control of their health journey with verified alternative medicine information and AI-powered research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleStartFreeTrial}
                className="px-10 py-5 rounded-xl font-semibold text-lg transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #ff8400 0%, #ff6b00 100%)',
                  color: '#000',
                  boxShadow: '0 0 40px rgba(255, 132, 0, 0.5)'
                }}
              >
                Start Free Trial
                <ArrowRight size={20} className="inline ml-2" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section 
        className="py-12"
        style={{
          background: '#0f0f0f',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Important Legal Notice</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            <strong className="text-gray-400">Disclaimer:</strong> This platform provides information only and does not constitute medical advice. 
            We are not recommending treatments but reflecting community experiences and research data.
            Always consult with healthcare professionals before starting any treatment.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-16"
        style={{
          background: '#0a0a0a',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo size="sm" showText={true} className="mb-4" />
              <p className="text-gray-500 text-sm">
                Your trusted source for alternative medicine knowledge and personalized health plans.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><Link to="/search-analysis" className="hover:text-orange-400 transition-colors">Research Database</Link></li>
                <li><Link to="/explore-services" className="hover:text-orange-400 transition-colors">Treatment Options</Link></li>
                <li><Link to="/social" className="hover:text-orange-400 transition-colors">Community</Link></li>
                <li><Link to="/partners" className="hover:text-orange-400 transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li><button className="hover:text-orange-400 transition-colors">Help Center</button></li>
                <li><button className="hover:text-orange-400 transition-colors">Contact Us</button></li>
                <li><button className="hover:text-orange-400 transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-orange-400 transition-colors">Terms of Service</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <p className="text-sm text-gray-500">
                This platform provides information only and does not constitute medical advice.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
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

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Database, Users, TrendingUp, BookOpen, Zap } from 'lucide-react';
import PlaceholderImage from '../components/PlaceholderImage';
import { loadDemoData } from '../utils/demoData';

const LandingPage: React.FC = () => {
  const handleDemoMode = () => {
    try {
      console.log('Loading demo data...');
      loadDemoData();
      console.log('Demo data loaded successfully!');
    } catch (error) {
      console.error('Error loading demo data:', error);
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
                ThriverHealth.Ai
                <span className="text-orange-400 block">Disease Management Platform</span>
              </h1>
              <p className="text-xl text-warm-300 mb-8 leading-relaxed font-modern">
                Access verified alternative therapies, research studies, and community experiences for life-threatening diseases like cancer, MS, and autoimmune conditions. 
                Connect with thought leaders like Dr. Makis, share your journey, and earn rewards through our social network and referral program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/onboarding"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center"
                >
                  Start Free Trial
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <button
                  onClick={handleDemoMode}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-orange-500/25 text-lg flex items-center justify-center"
                >
                  <Zap size={20} className="mr-2" />
                  TRY DEMO
                </button>
              </div>
              <p className="text-sm text-warm-400 mt-4 font-tech">
                Free to browse • Paid personalized plans • Community-driven insights
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
                             <PlaceholderImage category="treatment" size="large" className="w-full rounded-2xl shadow-2xl" alt="Alternative Medicine Research" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-warm-700/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6 font-display">
              The Problem We Solve
            </h2>
            <p className="text-xl text-warm-300 max-w-4xl mx-auto leading-relaxed font-modern">
              Alternative medicine information is scattered across the web. AI models focus on mainstream treatments, 
              leaving patients without access to verified alternative therapies for serious conditions like cancer, MS, and autoimmune diseases.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="modern-card p-8 text-center"
            >
              <Database size={48} className="mx-auto mb-6 text-electric-400" />
              <h3 className="text-2xl font-bold text-white mb-4">Centralized Knowledge</h3>
              <p className="text-warm-300 leading-relaxed">
                Comprehensive database of alternative therapies, research studies, and community experiences for serious diseases.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="modern-card p-8 text-center"
            >
              <Shield size={48} className="mx-auto mb-6 text-lime-400" />
              <h3 className="text-2xl font-bold text-white mb-4">Verified Information</h3>
              <p className="text-warm-300 leading-relaxed">
                Curated and verified alternative medicine research, testimonials, and treatment protocols from trusted sources.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="modern-card p-8 text-center"
            >
              <Users size={48} className="mx-auto mb-6 text-orange-400" />
              <h3 className="text-2xl font-bold text-white mb-4">Community-Driven</h3>
              <p className="text-warm-300 leading-relaxed">
                Real patient experiences and outcomes shared by those who have tried alternative therapies for serious conditions.
              </p>
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
              <Link
                to="/onboarding"
                className="bg-white text-electric-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-warm-600/30 transition-all duration-300 flex items-center justify-center"
              >
                Start Free Trial
                <ArrowRight size={20} className="ml-2" />
              </Link>
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
    </div>
  );
};

export default LandingPage; 
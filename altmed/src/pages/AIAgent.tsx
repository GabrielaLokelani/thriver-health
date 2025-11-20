import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Video, 
  BookOpen, 
  FileText, 
  TrendingUp,
  X,
  Maximize2,
  Minimize2,
  Loader
} from 'lucide-react';
import { profileService } from '../services/dataService';
import { recommendations } from '../data/recommendations';
import { partnerContent } from '../data/social';
import FirstEntryPrompt from '../components/FirstEntryPrompt';
import { useAuth } from '../hooks/useAuth';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  relatedContent?: {
    videos?: any[];
    research?: any[];
    recommendations?: any[];
  };
}

const AIAgent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showFirstEntryPrompt, setShowFirstEntryPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Check if this is first entry after signup
    const isFirstEntry = searchParams.get('firstEntry') === 'true';
    const hasCompletedFirstEntry = localStorage.getItem('altmed_first_entry_completed') === 'true';
    
    if (isFirstEntry && !hasCompletedFirstEntry) {
      setShowFirstEntryPrompt(true);
      // Remove query param from URL
      navigate('/ai-agent', { replace: true });
    }

    // Load user profile
    const loadProfile = async () => {
      const profile = await profileService.get();
      setUserProfile(profile);
      
      // If user has data, show initial welcome with summary option
      if (profile && (profile.diagnosis || profile.trackingMetrics?.length > 0)) {
        setMessages([{
          id: 'welcome',
          role: 'assistant',
          content: `Welcome back, ${profile.name}! I'm your Thriver AI assistant. I can help you research treatments, understand your condition, and track your journey. Would you like me to summarize your current health status?`,
          timestamp: new Date()
        }]);
      } else {
        setMessages([{
          id: 'welcome',
          role: 'assistant',
          content: `Hello! I'm your Thriver AI assistant. I can help you research diseases, treatments, and create a personalized health plan. How can I assist you today?`,
          timestamp: new Date()
        }]);
      }
    };
    
    loadProfile();
  }, [searchParams, navigate]);

  const generateConditionSummary = () => {
    if (!userProfile) return '';
    
    let summary = `## Health Summary for ${userProfile.name}\n\n`;
    
    if (userProfile.diagnosis) {
      const condition = userProfile.diagnosis.customCondition || userProfile.diagnosis.condition;
      summary += `**Primary Condition:** ${condition}\n\n`;
      
      if (userProfile.diagnosis.symptoms && userProfile.diagnosis.symptoms.length > 0) {
        summary += `**Symptoms:** ${userProfile.diagnosis.symptoms.join(', ')}\n\n`;
      }
    }
    
    if (userProfile.medications && userProfile.medications.length > 0) {
      summary += `**Current Medications:** ${userProfile.medications.map((m: any) => `${m.name} (${m.dosage})`).join(', ')}\n\n`;
    }
    
    if (userProfile.treatments && userProfile.treatments.length > 0) {
      summary += `**Alternative Treatments:** ${userProfile.treatments.map((t: any) => t.name).join(', ')}\n\n`;
    }
    
    if (userProfile.trackingMetrics && userProfile.trackingMetrics.length > 0) {
      summary += `**Tracking Metrics:** ${userProfile.trackingMetrics.length} metrics being monitored\n\n`;
    }
    
    return summary;
  };

  const getRelatedContent = (query: string) => {
    // Simulate AI-powered content matching
    const relatedVideos = partnerContent.filter(c => 
      c.type === 'video' && 
      (query.toLowerCase().includes('video') || Math.random() > 0.7)
    ).slice(0, 3);
    
    const relatedResearch = recommendations.filter(r => 
      query.toLowerCase().includes(r.category.toLowerCase()) || 
      query.toLowerCase().includes('research') ||
      Math.random() > 0.6
    ).slice(0, 3);
    
    return {
      videos: relatedVideos,
      research: relatedResearch,
      recommendations: recommendations.slice(0, 3)
    };
  };

  const simulateAIResponse = (userMessage: string): Promise<Message> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const lowerMessage = userMessage.toLowerCase();
        let response = '';
        let relatedContent = null;
        
        if (lowerMessage.includes('summary') || lowerMessage.includes('condition') || lowerMessage.includes('status')) {
          response = generateConditionSummary();
          relatedContent = getRelatedContent(userMessage);
        } else if (lowerMessage.includes('treatment') || lowerMessage.includes('therapy')) {
          response = `I can help you research treatments. Based on your profile, here are some relevant options:\n\n`;
          if (userProfile?.diagnosis) {
            response += `For ${userProfile.diagnosis.condition || 'your condition'}, I recommend exploring both conventional and alternative approaches. Let me find some specific resources for you.`;
          } else {
            response += `I'd be happy to help you research treatments. Could you tell me more about your condition or specific symptoms you're looking to address?`;
          }
          relatedContent = getRelatedContent(userMessage);
        } else if (lowerMessage.includes('research') || lowerMessage.includes('study')) {
          response = `I found several research studies and evidence-based resources that might be relevant:\n\n`;
          response += `1. Look into peer-reviewed studies on alternative therapies\n`;
          response += `2. Review patient outcomes and testimonials\n`;
          response += `3. Explore protocols from leading practitioners\n\n`;
          response += `Would you like me to dive deeper into any specific area?`;
          relatedContent = getRelatedContent(userMessage);
        } else if (lowerMessage.includes('video') || lowerMessage.includes('watch')) {
          response = `Here are some relevant videos and content from our partner network:`;
          relatedContent = getRelatedContent(userMessage);
        } else {
          response = `I understand you're asking about "${userMessage}". Let me help you with that. I can:\n\n`;
          response += `• Research your condition and treatments\n`;
          response += `• Summarize your health journey\n`;
          response += `• Find relevant videos and studies\n`;
          response += `• Help track your progress\n\n`;
          response += `What would you like to explore?`;
          relatedContent = getRelatedContent(userMessage);
        }
        
        resolve({
          id: Date.now().toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          relatedContent: relatedContent || undefined
        });
      }, 1000 + Math.random() * 1000); // Simulate AI thinking time
    });
  };

  const handleFirstEntry = async (entry: string) => {
    // Mark first entry as completed
    localStorage.setItem('altmed_first_entry_completed', 'true');
    
    // Send the first entry as a message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: entry,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Generate AI response
    const aiResponse = await simulateAIResponse(entry);
    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    const aiResponse = await simulateAIResponse(input);
    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    const parts = content.split(/(\*\*.*?\*\*|##.*?\n|•|1\.)/g);
    return parts.map((part, i) => {
      if (part.startsWith('##')) {
        return <h3 key={i} className="text-xl font-bold text-white mt-4 mb-2">{part.replace(/##\s*/, '')}</h3>;
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('•') || /^\d+\./.test(part)) {
        return <li key={i} className="ml-4">{part}</li>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="h-screen bg-surface-0 flex flex-col overflow-hidden">
      {/* Header */}
      <section className="bg-gradient-to-r from-electric-500 to-electric-600 text-white py-4 border-b border-electric-400/30 shadow-lg flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-primary-0 flex items-center justify-center shadow-lg shadow-primary-0/30">
                  <Sparkles size={22} className="text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success-10 rounded-full border-2 border-electric-500 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold font-display tracking-tight">Thriver AI Agent</h1>
                <p className="text-xs opacity-95 font-modern">Your intelligent health research assistant</p>
              </div>
            </div>
            <button
              onClick={() => setShowSummary(!showSummary)}
              className="px-4 py-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm rounded-lg text-xs font-medium transition-all duration-200 border border-white/20 hover:border-white/30 shadow-sm"
              aria-label={showSummary ? "Hide summary" : "Show summary"}
            >
              {showSummary ? <><Minimize2 size={14} className="inline mr-1.5" />Hide</> : <><Maximize2 size={14} className="inline mr-1.5" />Summary</>}
            </button>
          </div>
        </div>
      </section>

      <div className="flex-1 overflow-hidden max-w-7xl mx-auto w-full px-4 py-4">
        <div className="grid lg:grid-cols-3 gap-4 h-full">
          {/* Main Chat Interface */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-surface-10 rounded-2xl border border-surface-20/50 h-full flex flex-col shadow-strong overflow-hidden">
              {/* Messages Area */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-surface-10 to-surface-0"
              >
                {messages.length === 0 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center px-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-0 to-primary-10 flex items-center justify-center mb-4 shadow-xl shadow-primary-0/30">
                      <Sparkles size={32} className="text-black" />
                    </div>
                    <h2 className="text-xl font-bold text-white mb-2">Welcome to Thriver AI Agent</h2>
                    <p className="text-surface-50 max-w-md mb-6 text-sm leading-relaxed">
                      I'm here to help you research your condition, understand treatments, and find relevant content. 
                      Ask me anything about your health journey.
                    </p>
                    <div className="grid grid-cols-2 gap-2 max-w-md">
                      <button
                        onClick={() => setInput('Tell me about my condition')}
                        className="px-3 py-2 bg-surface-20 hover:bg-surface-30 border border-surface-30/50 rounded-lg text-xs text-white transition-all"
                      >
                        About My Condition
                      </button>
                      <button
                        onClick={() => setInput('Research treatments')}
                        className="px-3 py-2 bg-surface-20 hover:bg-surface-30 border border-surface-30/50 rounded-lg text-xs text-white transition-all"
                      >
                        Research Treatments
                      </button>
                    </div>
                  </motion.div>
                )}
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {message.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-0 to-primary-10 flex items-center justify-center flex-shrink-0 shadow-md shadow-primary-0/20">
                          <Bot size={16} className="text-black" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-xl p-3.5 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-primary-0 to-primary-10 text-black shadow-md shadow-primary-0/20'
                            : 'bg-surface-20 text-white border border-surface-30/50 shadow-md'
                        }`}
                      >
                        <div className="prose prose-invert max-w-none">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {formatMessage(message.content)}
                          </div>
                        </div>
                        {message.relatedContent && (
                          <div className="mt-3 pt-3 border-t border-surface-30/50">
                            <div className="space-y-3">
                              {message.relatedContent.videos && message.relatedContent.videos.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1 bg-primary-0/20 rounded">
                                      <Video size={12} className="text-primary-0" />
                                    </div>
                                    <h4 className="text-xs font-bold text-white tracking-wide">RELATED VIDEOS</h4>
                                  </div>
                                  <div className="space-y-1.5">
                                    {message.relatedContent.videos.map((video: any) => (
                                      <a
                                        key={video.id}
                                        href={video.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block p-2 bg-surface-10/80 hover:bg-surface-20 rounded-lg text-xs text-surface-50 hover:text-white transition-all duration-200 border border-surface-30/30 hover:border-primary-0/30"
                                      >
                                        <div className="flex items-start gap-1.5">
                                          <Video size={12} className="text-primary-0 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                          <span className="flex-1">{video.title}</span>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {message.relatedContent.research && message.relatedContent.research.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1 bg-success-10/20 rounded">
                                      <FileText size={12} className="text-success-10" />
                                    </div>
                                    <h4 className="text-xs font-bold text-white tracking-wide">RESEARCH & STUDIES</h4>
                                  </div>
                                  <div className="space-y-1.5">
                                    {message.relatedContent.research.map((item: any) => (
                                      <a
                                        key={item.id}
                                        href={item.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block p-2 bg-surface-10/80 hover:bg-surface-20 rounded-lg text-xs text-surface-50 hover:text-white transition-all duration-200 border border-surface-30/30 hover:border-success-10/30"
                                      >
                                        <div className="flex items-start gap-1.5">
                                          <FileText size={12} className="text-success-10 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                          <span className="flex-1">{item.title}</span>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {message.relatedContent.recommendations && message.relatedContent.recommendations.length > 0 && (
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="p-1 bg-info-10/20 rounded">
                                      <TrendingUp size={12} className="text-info-10" />
                                    </div>
                                    <h4 className="text-xs font-bold text-white tracking-wide">RECOMMENDATIONS</h4>
                                  </div>
                                  <div className="space-y-1.5">
                                    {message.relatedContent.recommendations.map((rec: any) => (
                                      <a
                                        key={rec.id}
                                        href={rec.externalLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block p-2 bg-surface-10/80 hover:bg-surface-20 rounded-lg text-xs text-surface-50 hover:text-white transition-all duration-200 border border-surface-30/30 hover:border-info-10/30"
                                      >
                                        <div className="flex items-start gap-1.5">
                                          <TrendingUp size={12} className="text-info-10 mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                                          <span className="flex-1">{rec.title}</span>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-surface-20 to-surface-30 flex items-center justify-center flex-shrink-0 border border-surface-30/50 shadow-md">
                          <User size={16} className="text-primary-0" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex gap-2"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-0 to-primary-10 flex items-center justify-center shadow-md shadow-primary-0/20">
                      <Bot size={16} className="text-black" />
                    </div>
                    <div className="bg-surface-20 rounded-xl p-3 border border-surface-30/50 shadow-md">
                      <div className="flex items-center gap-2">
                        <Loader size={16} className="animate-spin text-primary-0" />
                        <span className="text-xs text-surface-50 font-medium">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-surface-20/50 bg-surface-10 p-3 flex-shrink-0">
                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your condition, treatments, or research..."
                      className="w-full px-3 py-2.5 bg-surface-0 border-2 border-surface-30 rounded-xl focus:ring-2 focus:ring-primary-0 focus:border-primary-0 text-white placeholder-surface-40 resize-none text-sm leading-relaxed transition-all duration-200"
                      rows={1}
                      maxLength={500}
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-0 to-primary-10 text-black disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-md shadow-primary-0/20 hover:shadow-lg hover:shadow-primary-0/30 transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5 px-1">
                  <p className="text-[10px] text-surface-50">
                    Press <kbd className="px-1 py-0.5 bg-surface-20 rounded text-surface-30 border border-surface-30/50 text-[10px]">Enter</kbd> to send
                  </p>
                  <span className="text-[10px] text-surface-40 font-tech">{input.length}/500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Summary & Quick Actions */}
          <div className="h-full overflow-y-auto custom-scrollbar space-y-3">
            {showSummary && userProfile && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-surface-10 rounded-2xl border border-surface-20/50 p-4 shadow-strong"
              >
                <div className="flex items-center justify-between mb-3 pb-3 border-b border-surface-20/50">
                  <h3 className="text-sm font-bold text-white">Your Health Summary</h3>
                  <button
                    onClick={() => setShowSummary(false)}
                    className="text-surface-50 hover:text-white p-1 hover:bg-surface-20 rounded transition-colors"
                    aria-label="Close summary"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  {userProfile.diagnosis && (
                    <div className="p-2 bg-surface-20/50 rounded-lg border border-surface-30/30">
                      <span className="text-surface-50 text-[10px] font-medium tracking-wide block mb-0.5">CONDITION</span>
                      <p className="text-white font-semibold text-sm">
                        {userProfile.diagnosis.customCondition || userProfile.diagnosis.condition}
                      </p>
                    </div>
                  )}
                  {userProfile.medications && userProfile.medications.length > 0 && (
                    <div className="p-2 bg-surface-20/50 rounded-lg border border-surface-30/30">
                      <span className="text-surface-50 text-[10px] font-medium tracking-wide block mb-0.5">MEDICATIONS</span>
                      <p className="text-white font-semibold">{userProfile.medications.length} active</p>
                    </div>
                  )}
                  {userProfile.treatments && userProfile.treatments.length > 0 && (
                    <div className="p-2 bg-surface-20/50 rounded-lg border border-surface-30/30">
                      <span className="text-surface-50 text-[10px] font-medium tracking-wide block mb-0.5">TREATMENTS</span>
                      <p className="text-white font-semibold">{userProfile.treatments.length} tracked</p>
                    </div>
                  )}
                  {userProfile.trackingMetrics && userProfile.trackingMetrics.length > 0 && (
                    <div className="p-2 bg-surface-20/50 rounded-lg border border-surface-30/30">
                      <span className="text-surface-50 text-[10px] font-medium tracking-wide block mb-0.5">TRACKING METRICS</span>
                      <p className="text-white font-semibold">{userProfile.trackingMetrics.length} metrics</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    const summary = generateConditionSummary();
                    setInput(`Please summarize my condition and treatment journey. ${summary}`);
                  }}
                  className="w-full mt-3 px-3 py-2 bg-surface-20 hover:bg-surface-30 border border-surface-30/50 hover:border-primary-0/30 text-white font-medium rounded-lg transition-all duration-200 text-xs shadow-sm hover:shadow-md"
                >
                  Ask AI to Summarize
                </button>
              </motion.div>
            )}

            {/* Quick Actions */}
            <div className="bg-surface-10 rounded-2xl border border-surface-20/50 p-4 shadow-strong">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-surface-20/50">
                <Sparkles size={14} className="text-primary-0" />
                <h3 className="text-sm font-bold text-white">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setInput('Summarize my current condition and treatment journey')}
                  className="w-full text-left px-3 py-2.5 bg-surface-20/80 hover:bg-surface-30 border border-surface-30/30 hover:border-primary-0/30 rounded-lg text-white text-xs transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-primary-0/20 group-hover:bg-primary-0/30 flex items-center justify-center transition-colors">
                      <FileText size={12} className="text-primary-0" />
                    </div>
                    <span className="font-medium">Get Health Summary</span>
                  </div>
                </button>
                <button
                  onClick={() => setInput('Research treatments for my condition')}
                  className="w-full text-left px-3 py-2.5 bg-surface-20/80 hover:bg-surface-30 border border-surface-30/30 hover:border-info-10/30 rounded-lg text-white text-xs transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-info-10/20 group-hover:bg-info-10/30 flex items-center justify-center transition-colors">
                      <TrendingUp size={12} className="text-info-10" />
                    </div>
                    <span className="font-medium">Research Treatments</span>
                  </div>
                </button>
                <button
                  onClick={() => setInput('Find relevant videos and educational content')}
                  className="w-full text-left px-3 py-2.5 bg-surface-20/80 hover:bg-surface-30 border border-surface-30/30 hover:border-primary-0/30 rounded-lg text-white text-xs transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-primary-0/20 group-hover:bg-primary-0/30 flex items-center justify-center transition-colors">
                      <Video size={12} className="text-primary-0" />
                    </div>
                    <span className="font-medium">Find Videos</span>
                  </div>
                </button>
                <button
                  onClick={() => setInput('Show me research studies related to my condition')}
                  className="w-full text-left px-3 py-2.5 bg-surface-20/80 hover:bg-surface-30 border border-surface-30/30 hover:border-success-10/30 rounded-lg text-white text-xs transition-all duration-200 shadow-sm hover:shadow-md group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-success-10/20 group-hover:bg-success-10/30 flex items-center justify-center transition-colors">
                      <BookOpen size={12} className="text-success-10" />
                    </div>
                    <span className="font-medium">View Studies</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FirstEntryPrompt
        isOpen={showFirstEntryPrompt}
        onClose={() => setShowFirstEntryPrompt(false)}
        onSubmit={handleFirstEntry}
      />
    </div>
  );
};

export default AIAgent;


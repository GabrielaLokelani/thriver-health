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
  Loader,
  Plus,
  Pin,
  PinOff,
  Trash2,
  Edit2,
  MessageSquare,
  MoreVertical,
  Search,
  Calendar
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

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  metadata?: {
    messageCount: number;
    lastActivity: string;
  };
}

const STORAGE_KEY = 'altmed_ai_chats';

const AIAgent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showFirstEntryPrompt, setShowFirstEntryPrompt] = useState(false);
  const [isBannerCollapsed, setIsBannerCollapsed] = useState(false);
  const [showChatSidebar, setShowChatSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showQuickSwitcher, setShowQuickSwitcher] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'created' | 'alphabetical' | 'messages'>('recent');
  const [groupByDate, setGroupByDate] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const quickSwitcherInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Handle banner collapse on scroll
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const handleScroll = () => {
      const scrollTop = chatContainer.scrollTop;
      setIsBannerCollapsed(scrollTop > 50);
    };

    // Set initial state
    handleScroll();
    
    chatContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => chatContainer.removeEventListener('scroll', handleScroll);
  }, []);

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
    };
    
    loadProfile();
    
    // Load chats from localStorage (this will create initial chat if needed)
    loadChats();
  }, [searchParams, navigate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K - Quick switcher
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowQuickSwitcher(true);
      }
      
      // Cmd/Ctrl + N - New chat
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        createNewChat();
      }
      
      // Escape - Close quick switcher
      if (e.key === 'Escape' && showQuickSwitcher) {
        setShowQuickSwitcher(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showQuickSwitcher]);

  // Focus quick switcher input when opened
  useEffect(() => {
    if (showQuickSwitcher && quickSwitcherInputRef.current) {
      setTimeout(() => quickSwitcherInputRef.current?.focus(), 100);
    }
  }, [showQuickSwitcher]);

  // Load chats from localStorage
  const loadChats = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedChats: Chat[] = JSON.parse(stored);
        setChats(parsedChats);
        
        // If there are chats, load the most recent one (or first pinned)
        if (parsedChats.length > 0) {
          const pinnedChat = parsedChats.find(c => c.pinned);
          const chatToLoad = pinnedChat || parsedChats.sort((a, b) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          )[0];
          setCurrentChatId(chatToLoad.id);
          setMessages(chatToLoad.messages);
        } else {
          // Create initial chat
          createNewChat();
        }
      } else {
        // Create initial chat
        createNewChat();
      }
    } catch (error) {
      console.error('Error loading chats:', error);
      createNewChat();
    }
  };

  // Save chats to localStorage
  const saveChats = (updatedChats: Chat[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedChats));
      setChats(updatedChats);
    } catch (error) {
      console.error('Error saving chats:', error);
    }
  };

  // Create new chat
  const createNewChat = () => {
    const newChat: Chat = {
      id: `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: 'New Chat',
      messages: [],
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updatedChats = [newChat, ...chats];
    saveChats(updatedChats);
    setCurrentChatId(newChat.id);
    setMessages([]); // Start with empty messages - show empty state
  };

  // Switch to a different chat
  const switchChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      setMessages(chat.messages);
      setInput('');
    }
  };

  // Update messages in current chat
  const updateChatMessages = (chatId: string, newMessages: Message[]) => {
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        // Auto-generate title from first user message if it's still "New Chat"
        let title = chat.title;
        if (title === 'New Chat' && newMessages.length > 0) {
          const firstUserMessage = newMessages.find(m => m.role === 'user');
          if (firstUserMessage) {
            title = firstUserMessage.content.substring(0, 50).trim();
            if (title.length < firstUserMessage.content.length) title += '...';
          }
        }
        
        return {
          ...chat,
          messages: newMessages,
          title,
          updatedAt: new Date().toISOString(),
          metadata: {
            messageCount: newMessages.length,
            lastActivity: new Date().toISOString()
          }
        };
      }
      return chat;
    });
    saveChats(updatedChats);
  };

  // Pin/unpin chat
  const togglePinChat = (chatId: string) => {
    const updatedChats = chats.map(chat => 
      chat.id === chatId ? { ...chat, pinned: !chat.pinned } : chat
    );
    // Sort: pinned first, then by updatedAt
    updatedChats.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    saveChats(updatedChats);
  };

  // Delete chat
  const deleteChat = (chatId: string) => {
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      const updatedChats = chats.filter(chat => chat.id !== chatId);
      saveChats(updatedChats);
      
      if (chatId === currentChatId) {
        if (updatedChats.length > 0) {
          switchChat(updatedChats[0].id);
        } else {
          createNewChat();
        }
      }
    }
  };

  // Rename chat
  const renameChat = (chatId: string, newTitle: string) => {
    if (newTitle.trim()) {
      const updatedChats = chats.map(chat => 
        chat.id === chatId ? { ...chat, title: newTitle.trim() } : chat
      );
      saveChats(updatedChats);
    }
    setEditingChatId(null);
    setEditingTitle('');
  };

  // Get filtered and sorted chats
  const getFilteredChats = () => {
    let filtered = chats;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = chats.filter(chat => 
        chat.title.toLowerCase().includes(query) ||
        chat.messages.some(m => m.content.toLowerCase().includes(query))
      );
    }
    
    // Sort chats
    const sorted = [...filtered].sort((a, b) => {
      // Always put pinned chats first
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      
      // Then apply selected sort
      switch (sortBy) {
        case 'recent':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'messages':
          return b.messages.length - a.messages.length;
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });
    
    return sorted;
  };

  // Group chats by date
  const groupChatsByDate = (chats: Chat[]) => {
    if (!groupByDate) return { all: chats };
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const thisWeek = new Date(today);
    thisWeek.setDate(thisWeek.getDate() - 7);
    const thisMonth = new Date(today);
    thisMonth.setMonth(thisMonth.getMonth() - 1);
    
    const groups: { [key: string]: Chat[] } = {
      today: [],
      yesterday: [],
      thisWeek: [],
      thisMonth: [],
      older: []
    };
    
    chats.forEach(chat => {
      const chatDate = new Date(chat.updatedAt);
      
      if (chatDate >= today) {
        groups.today.push(chat);
      } else if (chatDate >= yesterday) {
        groups.yesterday.push(chat);
      } else if (chatDate >= thisWeek) {
        groups.thisWeek.push(chat);
      } else if (chatDate >= thisMonth) {
        groups.thisMonth.push(chat);
      } else {
        groups.older.push(chat);
      }
    });
    
    return groups;
  };

  // Format relative date
  const formatRelativeDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return date.toLocaleDateString();
  };

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
      const metricNames = userProfile.trackingMetrics.map((m: any) => m.name).filter(Boolean);
      if (metricNames.length > 0) {
        summary += `**Tracking Metrics:** ${metricNames.join(', ')}\n\n`;
      } else {
        summary += `**Tracking Metrics:** ${userProfile.trackingMetrics.length} metrics being monitored\n\n`;
      }
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
    if (!input.trim() || isLoading || !currentChatId) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    updateChatMessages(currentChatId, newMessages);
    setInput('');
    setIsLoading(true);
    
    const aiResponse = await simulateAIResponse(input);
    const finalMessages = [...newMessages, aiResponse];
    setMessages(finalMessages);
    updateChatMessages(currentChatId, finalMessages);
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
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: '#000' }}>
      {/* Quick Switcher Modal */}
      <AnimatePresence>
        {showQuickSwitcher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center z-50 pt-20 px-4"
            onClick={() => setShowQuickSwitcher(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="rounded-2xl p-4"
                style={{
                  background: 'linear-gradient(145deg, #111111 0%, #0a0a0a 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Search size={20} className="text-gray-400" />
                  <input
                    ref={quickSwitcherInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search chats... (Press Enter to open, Esc to close)"
                    className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const filtered = getFilteredChats();
                        if (filtered.length > 0) {
                          switchChat(filtered[0].id);
                          setShowQuickSwitcher(false);
                          setSearchQuery('');
                        }
                      }
                    }}
                  />
                  <button
                    onClick={() => setShowQuickSwitcher(false)}
                    className="text-gray-400 hover:text-white"
                    aria-label="Close quick switcher"
                    title="Close quick switcher"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto space-y-1">
                  {getFilteredChats().slice(0, 10).map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => {
                        switchChat(chat.id);
                        setShowQuickSwitcher(false);
                        setSearchQuery('');
                      }}
                      className="p-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {chat.pinned && <Pin size={12} className="text-orange-400" fill="currentColor" />}
                          <span className="text-white font-medium truncate">{chat.title}</span>
                        </div>
                        {chat.messages.length > 0 && (
                          <p className="text-xs text-gray-500 truncate">
                            {chat.messages[chat.messages.length - 1]?.content.substring(0, 60)}...
                          </p>
                        )}
                      </div>
                      <span className="text-xs text-gray-600 ml-4">
                        {formatRelativeDate(chat.updatedAt)}
                      </span>
                    </div>
                  ))}
                  {getFilteredChats().length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No chats found
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
                  <kbd className="px-2 py-1 rounded bg-gray-800">⌘K</kbd> to open • <kbd className="px-2 py-1 rounded bg-gray-800">⌘N</kbd> for new chat • <kbd className="px-2 py-1 rounded bg-gray-800">Esc</kbd> to close
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header - Sticky and Collapsible */}
      <motion.section 
        className="sticky top-0 z-30 flex-shrink-0 transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 132, 0, 0.15) 0%, rgba(64, 119, 209, 0.15) 100%)',
          borderBottom: '1px solid rgba(255, 132, 0, 0.2)',
          backdropFilter: 'blur(10px)',
          pointerEvents: 'auto'
        }}
        animate={{
          paddingTop: isBannerCollapsed ? '0.5rem' : '1rem',
          paddingBottom: isBannerCollapsed ? '0.5rem' : '1rem'
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-3"
              animate={{
                scale: isBannerCollapsed ? 0.9 : 1
              }}
            >
              <div className="relative">
                <div 
                  className="rounded-xl flex items-center justify-center"
                  style={{
                    width: isBannerCollapsed ? '2.5rem' : '3rem',
                    height: isBannerCollapsed ? '2.5rem' : '3rem',
                    background: 'linear-gradient(135deg, #ff8400, #ff6b00)',
                    boxShadow: '0 4px 15px rgba(255, 132, 0, 0.3)'
                  }}
                >
                  <Sparkles size={isBannerCollapsed ? 18 : 22} className="text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black animate-pulse"></div>
              </div>
              <motion.div
                animate={{
                  opacity: isBannerCollapsed ? 0.8 : 1
                }}
              >
                <h1 className="text-xl font-bold text-white tracking-tight">Thriver AI Agent</h1>
                {!isBannerCollapsed && (
                  <p className="text-xs text-gray-400">Your intelligent health research assistant</p>
                )}
              </motion.div>
            </motion.div>
            <div className="flex items-center gap-2">
              {!showChatSidebar && (
                <button
                  onClick={() => setShowChatSidebar(true)}
                  className="px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                  style={{
                    background: 'rgba(255, 132, 0, 0.15)',
                    border: '1px solid rgba(255, 132, 0, 0.3)',
                    color: '#ff8400'
                  }}
                  aria-label="Show chat sidebar"
                >
                  <MessageSquare size={14} className="inline mr-1.5" />
                  Chats
                </button>
              )}
              <button
                onClick={() => setShowSummary(!showSummary)}
                className="px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  background: 'rgba(255, 132, 0, 0.15)',
                  border: '1px solid rgba(255, 132, 0, 0.3)',
                  color: '#ff8400'
                }}
                aria-label={showSummary ? "Hide summary" : "Show summary"}
              >
                {showSummary ? <><Minimize2 size={14} className="inline mr-1.5" />Hide</> : <><Maximize2 size={14} className="inline mr-1.5" />Summary</>}
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="flex-1 overflow-hidden max-w-7xl mx-auto w-full px-4 py-4 min-h-0">
        <div className="flex gap-4 h-full min-h-0">
          {/* Chat Sidebar */}
          {showChatSidebar && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 flex-shrink-0 h-full min-h-0 flex flex-col"
            >
              <div 
                className="rounded-2xl h-full flex flex-col overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #111111 0%, #0a0a0a 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Sidebar Header */}
                <div 
                  className="p-4 border-b flex items-center justify-between"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <h3 className="text-sm font-bold text-white">Chats</h3>
                  <button
                    onClick={() => setShowChatSidebar(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                    aria-label="Hide sidebar"
                  >
                    <X size={16} />
                  </button>
                </div>
                
                {/* New Chat Button */}
                <div className="p-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <button
                    onClick={createNewChat}
                    className="btn-glow w-full py-2.5 text-sm flex items-center justify-center"
                  >
                    <Plus size={16} className="mr-2" />
                    New Chat
                  </button>
                </div>
                
                {/* Search */}
                <div className="p-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <div className="relative mb-2">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search chats... (⌘K)"
                      className="input-glow w-full pl-9 pr-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="flex-1 input-glow text-xs py-1.5 px-2"
                      aria-label="Sort chats by"
                      title="Sort chats by"
                    >
                      <option value="recent">Recent</option>
                      <option value="created">Created</option>
                      <option value="alphabetical">A-Z</option>
                      <option value="messages">Messages</option>
                    </select>
                    <button
                      onClick={() => setGroupByDate(!groupByDate)}
                      className={`px-2 py-1.5 rounded text-xs transition-colors ${
                        groupByDate
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-gray-700 text-gray-400 border border-gray-600'
                      }`}
                      title="Group by date"
                    >
                      <Calendar size={14} />
                    </button>
                  </div>
                </div>
                
                {/* Chat List */}
                <div className="flex-1 overflow-y-auto min-h-0" style={{ scrollBehavior: 'smooth' }}>
                  {getFilteredChats().length === 0 ? (
                    <div className="p-4 text-center">
                      <MessageSquare size={32} className="mx-auto mb-2 text-gray-600" />
                      <p className="text-sm text-gray-500">No chats found</p>
                    </div>
                  ) : (
                    <div className="p-2 space-y-2">
                      {/* Pinned Chats Section */}
                      {getFilteredChats().filter(c => c.pinned).length > 0 && (
                        <div>
                          <div className="px-2 py-1.5 mb-1">
                            <div className="flex items-center gap-1.5">
                              <Pin size={12} className="text-orange-400" fill="currentColor" />
                              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Pinned</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            {getFilteredChats().filter(c => c.pinned).map((chat) => (
                              <div
                                key={chat.id}
                                className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                                  currentChatId === chat.id
                                    ? 'bg-orange-500/25 border border-orange-500/40'
                                    : 'bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/15'
                                }`}
                                onClick={() => switchChat(chat.id)}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    {editingChatId === chat.id ? (
                                      <input
                                        type="text"
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        onBlur={() => renameChat(chat.id, editingTitle)}
                                        onKeyPress={(e) => {
                                          if (e.key === 'Enter') {
                                            renameChat(chat.id, editingTitle);
                                          } else if (e.key === 'Escape') {
                                            setEditingChatId(null);
                                            setEditingTitle('');
                                          }
                                        }}
                                        className="input-glow w-full px-2 py-1 text-sm"
                                        autoFocus
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label="Chat title"
                                        placeholder="Enter chat title"
                                      />
                                    ) : (
                                      <>
                                        <div className="flex items-center gap-2 mb-1">
                                          <Pin size={12} className="text-orange-400 flex-shrink-0" fill="currentColor" />
                                          <h4 className="text-sm font-medium text-orange-300 truncate">
                                            {chat.title}
                                          </h4>
                                          {chat.messages.length > 0 && (
                                            <span className="text-xs text-orange-600 bg-orange-500/20 px-1.5 py-0.5 rounded">
                                              {chat.messages.length}
                                            </span>
                                          )}
                                        </div>
                                        {chat.messages.length > 0 && (
                                          <p className="text-xs text-gray-500 truncate mb-1">
                                            {chat.messages[chat.messages.length - 1]?.content.substring(0, 50)}...
                                          </p>
                                        )}
                                        <p className="text-xs text-gray-600">
                                          {formatRelativeDate(chat.updatedAt)}
                                        </p>
                                      </>
                                    )}
                                  </div>
                                  
                                  {/* Actions Menu - Pin button always visible, others on hover */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        togglePinChat(chat.id);
                                      }}
                                      className="p-1.5 rounded transition-colors bg-orange-500/20 hover:bg-orange-500/30 text-orange-400"
                                      title="Unpin conversation"
                                    >
                                      <Pin size={14} className="text-orange-400" fill="currentColor" />
                                    </button>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingChatId(chat.id);
                                          setEditingTitle(chat.title);
                                        }}
                                        className="p-1.5 rounded hover:bg-white/10 transition-colors"
                                        title="Rename"
                                      >
                                        <Edit2 size={14} className="text-gray-400" />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteChat(chat.id);
                                        }}
                                        className="p-1.5 rounded hover:bg-red-500/20 transition-colors"
                                        title="Delete"
                                      >
                                        <Trash2 size={14} className="text-red-400" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Unpinned Chats Section */}
                      {(() => {
                        const unpinnedChats = getFilteredChats().filter(c => !c.pinned);
                        if (unpinnedChats.length === 0) return null;
                        
                        if (groupByDate) {
                          const grouped = groupChatsByDate(unpinnedChats);
                          const dateLabels: { [key: string]: string } = {
                            today: 'Today',
                            yesterday: 'Yesterday',
                            thisWeek: 'This Week',
                            thisMonth: 'This Month',
                            older: 'Older'
                          };
                          
                          return (
                            <div>
                              {getFilteredChats().filter(c => c.pinned).length > 0 && (
                                <div className="px-2 py-1.5 mb-1 mt-3">
                                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recent</span>
                                </div>
                              )}
                              {Object.entries(grouped).map(([key, chats]) => {
                                if (chats.length === 0) return null;
                                return (
                                  <div key={key} className="mb-3">
                                    <div className="px-2 py-1.5 mb-1">
                                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        {dateLabels[key]}
                                      </span>
                                    </div>
                                    <div className="space-y-1">
                                      {chats.map((chat) => (
                                        <div
                                          key={chat.id}
                                          className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                                            currentChatId === chat.id
                                              ? 'bg-orange-500/20 border border-orange-500/30'
                                              : 'hover:bg-white/5 border border-transparent'
                                          }`}
                                          onClick={() => switchChat(chat.id)}
                                        >
                                          <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                              {editingChatId === chat.id ? (
                                                <input
                                                  type="text"
                                                  value={editingTitle}
                                                  onChange={(e) => setEditingTitle(e.target.value)}
                                                  onBlur={() => renameChat(chat.id, editingTitle)}
                                                  onKeyPress={(e) => {
                                                    if (e.key === 'Enter') {
                                                      renameChat(chat.id, editingTitle);
                                                    } else if (e.key === 'Escape') {
                                                      setEditingChatId(null);
                                                      setEditingTitle('');
                                                    }
                                                  }}
                                                  className="input-glow w-full px-2 py-1 text-sm"
                                                  autoFocus
                                                  onClick={(e) => e.stopPropagation()}
                                                  aria-label="Chat title"
                                                  placeholder="Enter chat title"
                                                />
                                              ) : (
                                                <>
                                                  <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="text-sm font-medium text-white truncate">
                                                      {chat.title}
                                                    </h4>
                                                    {chat.messages.length > 0 && (
                                                      <span className="text-xs text-gray-600 bg-gray-700 px-1.5 py-0.5 rounded">
                                                        {chat.messages.length}
                                                      </span>
                                                    )}
                                                  </div>
                                                  {chat.messages.length > 0 && (
                                                    <p className="text-xs text-gray-500 truncate mb-1">
                                                      {chat.messages[chat.messages.length - 1]?.content.substring(0, 50)}...
                                                    </p>
                                                  )}
                                                  <p className="text-xs text-gray-600">
                                                    {formatRelativeDate(chat.updatedAt)}
                                                  </p>
                                                </>
                                              )}
                                            </div>
                                            
                                            <div className="flex items-center gap-1">
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  togglePinChat(chat.id);
                                                }}
                                                className="opacity-0 group-hover:opacity-100 p-1.5 rounded transition-all hover:bg-white/10 text-gray-400"
                                                title="Pin conversation"
                                              >
                                                <Pin size={14} className="text-gray-400" />
                                              </button>
                                              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingChatId(chat.id);
                                                    setEditingTitle(chat.title);
                                                  }}
                                                  className="p-1.5 rounded hover:bg-white/10 transition-colors"
                                                  title="Rename"
                                                >
                                                  <Edit2 size={14} className="text-gray-400" />
                                                </button>
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteChat(chat.id);
                                                  }}
                                                  className="p-1.5 rounded hover:bg-red-500/20 transition-colors"
                                                  title="Delete"
                                                >
                                                  <Trash2 size={14} className="text-red-400" />
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        } else {
                          return (
                            <div>
                              {getFilteredChats().filter(c => c.pinned).length > 0 && (
                                <div className="px-2 py-1.5 mb-1 mt-3">
                                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Recent</span>
                                </div>
                              )}
                              <div className="space-y-1">
                                {unpinnedChats.map((chat) => (
                                  <div
                                    key={chat.id}
                                    className={`group relative p-3 rounded-lg cursor-pointer transition-all ${
                                      currentChatId === chat.id
                                        ? 'bg-orange-500/20 border border-orange-500/30'
                                        : 'hover:bg-white/5 border border-transparent'
                                    }`}
                                    onClick={() => switchChat(chat.id)}
                                  >
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1 min-w-0">
                                        {editingChatId === chat.id ? (
                                          <input
                                            type="text"
                                            value={editingTitle}
                                            onChange={(e) => setEditingTitle(e.target.value)}
                                            onBlur={() => renameChat(chat.id, editingTitle)}
                                            onKeyPress={(e) => {
                                              if (e.key === 'Enter') {
                                                renameChat(chat.id, editingTitle);
                                              } else if (e.key === 'Escape') {
                                                setEditingChatId(null);
                                                setEditingTitle('');
                                              }
                                            }}
                                            className="input-glow w-full px-2 py-1 text-sm"
                                            autoFocus
                                            onClick={(e) => e.stopPropagation()}
                                            aria-label="Chat title"
                                            placeholder="Enter chat title"
                                          />
                                        ) : (
                                          <>
                                            <div className="flex items-center gap-2 mb-1">
                                              <h4 className="text-sm font-medium text-white truncate">
                                                {chat.title}
                                              </h4>
                                              {chat.messages.length > 0 && (
                                                <span className="text-xs text-gray-600 bg-gray-700 px-1.5 py-0.5 rounded">
                                                  {chat.messages.length}
                                                </span>
                                              )}
                                            </div>
                                            {chat.messages.length > 0 && (
                                              <p className="text-xs text-gray-500 truncate mb-1">
                                                {chat.messages[chat.messages.length - 1]?.content.substring(0, 50)}...
                                              </p>
                                            )}
                                            <p className="text-xs text-gray-600">
                                              {formatRelativeDate(chat.updatedAt)}
                                            </p>
                                          </>
                                        )}
                                      </div>
                                      
                                      {/* Actions Menu - Pin button always visible, others on hover */}
                                      <div className="flex items-center gap-1">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            togglePinChat(chat.id);
                                          }}
                                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded transition-all hover:bg-white/10 text-gray-400"
                                          title="Pin conversation"
                                        >
                                          <Pin size={14} className="text-gray-400" />
                                        </button>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setEditingChatId(chat.id);
                                              setEditingTitle(chat.title);
                                            }}
                                            className="p-1.5 rounded hover:bg-white/10 transition-colors"
                                            title="Rename"
                                          >
                                            <Edit2 size={14} className="text-gray-400" />
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              deleteChat(chat.id);
                                            }}
                                            className="p-1.5 rounded hover:bg-red-500/20 transition-colors"
                                            title="Delete"
                                          >
                                            <Trash2 size={14} className="text-red-400" />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                      })()}
                    </div>
                  )}
                </div>
                
                {/* Quick Actions - Always Visible */}
                <div 
                  className="border-t p-3"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} style={{ color: '#ff8400' }} />
                    <h3 className="text-xs font-bold text-white">Quick Actions</h3>
                  </div>
                  <div className="space-y-1.5">
                    <button
                      onClick={() => {
                        if (!currentChatId) createNewChat();
                        setInput('Summarize my current condition and treatment journey');
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-lg text-white text-xs transition-all duration-200 group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 132, 0, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 132, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FileText size={12} style={{ color: '#ff8400' }} />
                        <span className="font-medium">Health Summary</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        if (!currentChatId) createNewChat();
                        setInput('Research treatments for my condition');
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-lg text-white text-xs transition-all duration-200 group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(64, 119, 209, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(64, 119, 209, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <TrendingUp size={12} style={{ color: '#4077d1' }} />
                        <span className="font-medium">Research Treatments</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        if (!currentChatId) createNewChat();
                        setInput('Find relevant videos and educational content');
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-lg text-white text-xs transition-all duration-200 group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 132, 0, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(255, 132, 0, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Video size={12} style={{ color: '#ff8400' }} />
                        <span className="font-medium">Find Videos</span>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        if (!currentChatId) createNewChat();
                        setInput('Show me research studies related to my condition');
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-lg text-white text-xs transition-all duration-200 group"
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(71, 213, 166, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(71, 213, 166, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen size={12} style={{ color: '#47d5a6' }} />
                        <span className="font-medium">View Studies</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Main Chat Interface */}
          <div className={`${showChatSidebar ? 'flex-1' : 'w-full'} ${showSummary ? '' : ''} h-full min-h-0 flex flex-col`}>
            <div 
              className="rounded-2xl h-full flex flex-col overflow-hidden min-h-0"
              style={{
                background: 'linear-gradient(145deg, #111111 0%, #0a0a0a 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Messages Area */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
                style={{
                  scrollBehavior: 'smooth',
                  WebkitOverflowScrolling: 'touch',
                  touchAction: 'pan-y',
                  overscrollBehavior: 'contain'
                }}
              >
                {messages.length === 0 && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full px-6 py-12"
                  >
                    <div className="w-full max-w-2xl">
                      {/* Welcome Header */}
                      <div className="text-center mb-8">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                          style={{
                            background: 'linear-gradient(135deg, #ff8400, #ff6b00)',
                            boxShadow: '0 4px 20px rgba(255, 132, 0, 0.3)'
                          }}
                        >
                          <Sparkles size={24} className="text-black" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                          {userProfile?.name ? `Welcome back, ${userProfile.name}!` : 'Welcome to Thriver AI'}
                        </h2>
                        <p className="text-gray-400 text-sm">
                          How can I help you today?
                        </p>
                      </div>

                      {/* Suggested Prompts */}
                      <div className="space-y-3">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-1">
                          Suggested Prompts
                        </h3>
                        
                        {/* Health Summary */}
                        {userProfile && (userProfile.diagnosis || userProfile.trackingMetrics?.length > 0) && (
                          <button
                            onClick={() => {
                              const summary = generateConditionSummary();
                              setInput(`Please summarize my condition and treatment journey. ${summary}`);
                            }}
                            className="w-full text-left p-4 rounded-xl transition-all duration-200 group hover:scale-[1.02]"
                            style={{
                              background: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 132, 0, 0.1)';
                              e.currentTarget.style.borderColor = 'rgba(255, 132, 0, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div 
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: 'rgba(255, 132, 0, 0.15)' }}
                              >
                                <FileText size={16} style={{ color: '#ff8400' }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-white font-semibold text-sm mb-1">Get Health Summary</h4>
                                <p className="text-gray-400 text-xs">Review your condition, treatments, and tracking metrics</p>
                              </div>
                            </div>
                          </button>
                        )}

                        {/* Research Treatments */}
                        <button
                          onClick={() => setInput('Research treatments for my condition')}
                          className="w-full text-left p-4 rounded-xl transition-all duration-200 group hover:scale-[1.02]"
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(64, 119, 209, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(64, 119, 209, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(64, 119, 209, 0.15)' }}
                            >
                              <TrendingUp size={16} style={{ color: '#4077d1' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold text-sm mb-1">Research Treatments</h4>
                              <p className="text-gray-400 text-xs">Explore conventional and alternative treatment options</p>
                            </div>
                          </div>
                        </button>

                        {/* Find Videos */}
                        <button
                          onClick={() => setInput('Find relevant videos and educational content')}
                          className="w-full text-left p-4 rounded-xl transition-all duration-200 group hover:scale-[1.02]"
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 132, 0, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(255, 132, 0, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(255, 132, 0, 0.15)' }}
                            >
                              <Video size={16} style={{ color: '#ff8400' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold text-sm mb-1">Find Videos</h4>
                              <p className="text-gray-400 text-xs">Discover educational videos and content</p>
                            </div>
                          </div>
                        </button>

                        {/* View Studies */}
                        <button
                          onClick={() => setInput('Show me research studies related to my condition')}
                          className="w-full text-left p-4 rounded-xl transition-all duration-200 group hover:scale-[1.02]"
                          style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(71, 213, 166, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(71, 213, 166, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(71, 213, 166, 0.15)' }}
                            >
                              <BookOpen size={16} style={{ color: '#47d5a6' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white font-semibold text-sm mb-1">View Studies</h4>
                              <p className="text-gray-400 text-xs">Access research studies and evidence</p>
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Helper Text */}
                      <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500">
                          Type your question below or select a prompt above to get started
                        </p>
                      </div>
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
                        <div 
                          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                          style={{
                            background: 'linear-gradient(135deg, #ff8400, #ff6b00)',
                            boxShadow: '0 4px 15px rgba(255, 132, 0, 0.25)'
                          }}
                        >
                          <Bot size={16} className="text-black" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-xl p-3.5 ${
                          message.role === 'user'
                            ? 'text-black shadow-md'
                            : 'text-white border shadow-md'
                        }`}
                        style={
                          message.role === 'user'
                            ? {
                                background: 'linear-gradient(135deg, #ff8400, #ff6b00)',
                                boxShadow: '0 4px 15px rgba(255, 132, 0, 0.25)'
                              }
                            : {
                                background: 'linear-gradient(145deg, #1a1a1a 0%, #141414 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.05)'
                              }
                        }
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
                        <div 
                          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
                          style={{
                            background: 'linear-gradient(145deg, #1a1a1a 0%, #141414 100%)',
                            border: '1px solid rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <User size={16} style={{ color: '#ff8400' }} />
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
                    <div 
                      className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md"
                      style={{
                        background: 'linear-gradient(135deg, #ff8400, #ff6b00)',
                        boxShadow: '0 4px 15px rgba(255, 132, 0, 0.25)'
                      }}
                    >
                      <Bot size={16} className="text-black" />
                    </div>
                    <div 
                      className="rounded-xl p-3 shadow-md"
                      style={{
                        background: 'linear-gradient(145deg, #1a1a1a 0%, #141414 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Loader size={16} className="animate-spin" style={{ color: '#ff8400' }} />
                        <span className="text-xs text-gray-400 font-medium">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div 
                className="border-t p-3 flex-shrink-0"
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.05)',
                  background: 'rgba(17, 17, 17, 0.8)'
                }}
              >
                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about your condition, treatments, or research..."
                      className="input-glow w-full px-3 py-2.5 rounded-xl resize-none text-sm leading-relaxed"
                      rows={1}
                      maxLength={500}
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="w-11 h-11 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                    style={{
                      background: 'linear-gradient(135deg, #ff8400 0%, #ff6b00 100%)',
                      color: '#000000',
                      boxShadow: '0 4px 15px rgba(255, 132, 0, 0.25)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 132, 0, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 132, 0, 0.25)';
                    }}
                    aria-label="Send message"
                  >
                    <Send size={18} stroke="#000000" strokeWidth={2.5} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5 px-1">
                  <p className="text-[10px] text-gray-500">
                    Press <kbd className="px-1 py-0.5 rounded text-[10px]" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>Enter</kbd> to send
                  </p>
                  <span className="text-[10px] text-gray-500 font-mono">{input.length}/500</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          {showSummary && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-80 flex-shrink-0 h-full min-h-0 flex flex-col"
            >
              <div className="h-full overflow-y-auto space-y-3 min-h-0" style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
            {showSummary && userProfile && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl p-4"
                style={{
                  background: 'linear-gradient(145deg, #111111 0%, #0a0a0a 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div className="flex items-center justify-between mb-3 pb-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                  <h3 className="text-sm font-bold text-white">Your Health Summary</h3>
                  <button
                    onClick={() => setShowSummary(false)}
                    className="text-gray-400 hover:text-white p-1 rounded transition-colors"
                    style={{ background: 'rgba(255, 255, 255, 0.05)' }}
                    aria-label="Close summary"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  {userProfile.diagnosis && (
                    <div className="p-2 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <span className="text-gray-500 text-[10px] font-medium tracking-wide block mb-0.5">CONDITION</span>
                      <p className="text-white font-semibold text-sm">
                        {userProfile.diagnosis.customCondition || userProfile.diagnosis.condition}
                      </p>
                    </div>
                  )}
                  {userProfile.medications && userProfile.medications.length > 0 && (
                    <div className="p-2 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <span className="text-gray-500 text-[10px] font-medium tracking-wide block mb-0.5">MEDICATIONS</span>
                      <p className="text-white font-semibold">{userProfile.medications.length} active</p>
                    </div>
                  )}
                  {userProfile.treatments && userProfile.treatments.length > 0 && (
                    <div className="p-2 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <span className="text-gray-500 text-[10px] font-medium tracking-wide block mb-0.5">TREATMENTS</span>
                      <p className="text-white font-semibold">{userProfile.treatments.length} tracked</p>
                    </div>
                  )}
                  {userProfile.trackingMetrics && userProfile.trackingMetrics.length > 0 && (
                    <div className="p-2 rounded-lg" style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <span className="text-gray-500 text-[10px] font-medium tracking-wide block mb-0.5">TRACKING METRICS</span>
                      <div className="space-y-1">
                        {userProfile.trackingMetrics.map((metric: any, index: number) => (
                          <p key={index} className="text-white font-semibold text-xs">
                            {metric.name || `Metric ${index + 1}`}
                            {metric.unit && <span className="text-gray-400 ml-1">({metric.unit})</span>}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    const summary = generateConditionSummary();
                    setInput(`Please summarize my condition and treatment journey. ${summary}`);
                  }}
                  className="btn-secondary w-full mt-3 px-3 py-2 font-medium rounded-lg transition-all duration-200 text-xs"
                >
                  Ask AI to Summarize
                </button>
              </motion.div>
            )}

            {/* Quick Actions */}
            <div 
              className="rounded-2xl p-4"
              style={{
                background: 'linear-gradient(145deg, #111111 0%, #0a0a0a 100%)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="flex items-center gap-2 mb-3 pb-3 border-b" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                <Sparkles size={14} style={{ color: '#ff8400' }} />
                <h3 className="text-sm font-bold text-white">Quick Actions</h3>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setInput('Summarize my current condition and treatment journey')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-white text-xs transition-all duration-200 group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 132, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 132, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center transition-colors" style={{ background: 'rgba(255, 132, 0, 0.15)' }}>
                      <FileText size={12} style={{ color: '#ff8400' }} />
                    </div>
                    <span className="font-medium">Get Health Summary</span>
                  </div>
                </button>
                <button
                  onClick={() => setInput('Research treatments for my condition')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-white text-xs transition-all duration-200 group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(64, 119, 209, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(64, 119, 209, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center transition-colors" style={{ background: 'rgba(64, 119, 209, 0.15)' }}>
                      <TrendingUp size={12} style={{ color: '#4077d1' }} />
                    </div>
                    <span className="font-medium">Research Treatments</span>
                  </div>
                </button>
                <button
                  onClick={() => setInput('Find relevant videos and educational content')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-white text-xs transition-all duration-200 group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 132, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 132, 0, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center transition-colors" style={{ background: 'rgba(255, 132, 0, 0.15)' }}>
                      <Video size={12} style={{ color: '#ff8400' }} />
                    </div>
                    <span className="font-medium">Find Videos</span>
                  </div>
                </button>
                <button
                  onClick={() => setInput('Show me research studies related to my condition')}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-white text-xs transition-all duration-200 group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(71, 213, 166, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(71, 213, 166, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded flex items-center justify-center transition-colors" style={{ background: 'rgba(71, 213, 166, 0.15)' }}>
                      <BookOpen size={12} style={{ color: '#47d5a6' }} />
                    </div>
                    <span className="font-medium">View Studies</span>
                  </div>
                </button>
              </div>
            </div>
              </div>
            </motion.div>
          )}
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


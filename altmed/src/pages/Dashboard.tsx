import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles,
  Heart,
  MessageSquare,
  Activity,
  Edit3,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  Users,
  ThumbsUp,
  Plus,
  Calendar,
  Target,
  Save,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Moon,
  Brain,
  Settings,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { storage } from '../utils/storage';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userProfile] = useState(storage.getUserProfile());
  const [isDemoMode, setIsDemoMode] = useState(false);
  
  // Mindset tracking
  const [mindsetData, setMindsetData] = useState({
    feeling: '',
    gratitude: '',
    intention: ''
  });

  // Today's tasks
  const [todaysTasks, setTodaysTasks] = useState([
    { id: 1, task: 'Morning meditation', status: 'done', category: 'wellness' },
    { id: 2, task: 'Fenbendazole 222mg', status: 'done', category: 'medication' },
    { id: 3, task: 'Vitamin D supplement', status: 'pending', category: 'supplement' },
    { id: 4, task: '30 min walk', status: 'pending', category: 'activity' },
    { id: 5, task: 'Track PSA levels', status: 'pending', category: 'tracking' },
    { id: 6, task: 'Evening gratitude', status: 'upcoming', category: 'wellness' }
  ]);

  // Gratitude streak (mock data)
  const [gratitudeStreak, setGratitudeStreak] = useState(7);

  // Modal states
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(false);
  const [selectedMetricKey, setSelectedMetricKey] = useState<string | null>(null);
  const [newDataValue, setNewDataValue] = useState('');

  // Visible metrics (stored in localStorage)
  const [visibleMetrics, setVisibleMetrics] = useState<string[]>(() => {
    const saved = localStorage.getItem('altmed_visible_metrics');
    return saved ? JSON.parse(saved) : ['energy', 'sleep', 'stress', 'mood'];
  });

  // Wellness metrics data (7 days) - this could be pulled from storage in production
  const [wellnessMetrics, setWellnessMetrics] = useState({
    energy: {
      label: 'Energy',
      icon: Zap,
      color: 'primary-0',
      current: 7,
      trend: 'up',
      data: [5, 6, 5, 7, 6, 8, 7],
      target: 8
    },
    sleep: {
      label: 'Sleep Quality',
      icon: Moon,
      color: 'info-10',
      current: 8,
      trend: 'up',
      data: [6, 7, 6, 7, 7, 8, 8],
      target: 8
    },
    stress: {
      label: 'Stress Management',
      icon: Brain,
      color: 'success-10',
      current: 7,
      trend: 'stable',
      data: [8, 7, 8, 7, 7, 7, 7],
      target: 7,
      inverse: true // Lower is better
    },
    mood: {
      label: 'Mood',
      icon: Heart,
      color: 'warning-10',
      current: 8,
      trend: 'up',
      data: [6, 7, 7, 7, 8, 8, 8],
      target: 8
    }
  });

  // Save visible metrics to localStorage when changed
  useEffect(() => {
    localStorage.setItem('altmed_visible_metrics', JSON.stringify(visibleMetrics));
  }, [visibleMetrics]);

  useEffect(() => {
    const demoMode = localStorage.getItem('altmed_demo_mode');
    setIsDemoMode(demoMode === 'true');
    
    // Load saved mindset data from localStorage
    const savedMindset = localStorage.getItem('altmed_mindset_today');
    if (savedMindset) {
      setMindsetData(JSON.parse(savedMindset));
    }
  }, []);

  const saveMindset = () => {
    localStorage.setItem('altmed_mindset_today', JSON.stringify(mindsetData));
    setGratitudeStreak(prev => prev + 1);
    alert('Mindset saved! Keep thriving! 🌟');
  };

  const toggleTaskStatus = (taskId: number) => {
    setTodaysTasks(tasks =>
      tasks.map(t =>
        t.id === taskId
          ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
          : t
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'text-success-10';
      case 'pending': return 'text-warning-10';
      case 'missed': return 'text-danger-10';
      default: return 'text-surface-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'done': return 'Done';
      case 'pending': return 'Due';
      case 'missed': return 'Missed';
      default: return 'Tonight';
    }
  };

  // Mini line graph component
  const MiniLineGraph = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 100;
    const height = 40;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    // Map color names to actual hex values
    const colorMap: { [key: string]: string } = {
      'primary-0': '#ff8400',
      'info-10': '#4077d1',
      'success-10': '#47d5a6',
      'warning-10': '#d7ac61'
    };
    
    const hexColor = colorMap[color] || '#ff8400';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={hexColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={hexColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={`0,${height} ${points} ${width},${height}`}
          fill={`url(#gradient-${color})`}
          stroke="none"
        />
        <polyline
          points={points}
          fill="none"
          stroke={hexColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * width;
          const y = height - ((value - min) / range) * height;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2.5"
              fill={hexColor}
              className="opacity-80"
            />
          );
        })}
      </svg>
    );
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="text-success-10" />;
      case 'down': return <TrendingDown size={16} className="text-danger-10" />;
      default: return <Minus size={16} className="text-surface-50" />;
    }
  };

  // Toggle metric visibility
  const toggleMetricVisibility = (metricKey: string) => {
    setVisibleMetrics(prev => {
      if (prev.includes(metricKey)) {
        return prev.filter(k => k !== metricKey);
      } else {
        return [...prev, metricKey];
      }
    });
  };

  // Open data entry modal
  const openDataEntry = (metricKey: string) => {
    setSelectedMetricKey(metricKey);
    setNewDataValue('');
    setIsDataEntryOpen(true);
  };

  // Add new data point to metric
  const addDataPoint = () => {
    if (!selectedMetricKey || !newDataValue) return;
    
    const value = parseInt(newDataValue);
    if (isNaN(value) || value < 1 || value > 10) {
      alert('Please enter a value between 1 and 10');
      return;
    }

    setWellnessMetrics(prev => ({
      ...prev,
      [selectedMetricKey]: {
        ...prev[selectedMetricKey as keyof typeof prev],
        current: value,
        data: [...prev[selectedMetricKey as keyof typeof prev].data.slice(1), value],
        trend: value > prev[selectedMetricKey as keyof typeof prev].current ? 'up' 
             : value < prev[selectedMetricKey as keyof typeof prev].current ? 'down' 
             : 'stable'
      }
    }));

    setIsDataEntryOpen(false);
    setNewDataValue('');
  };

  if (!userProfile && !isDemoMode) {
    return (
      <div className="min-h-screen bg-surface-0 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface-10 rounded-2xl p-8 text-center border border-surface-20 shadow-strong">
          <Activity size={48} className="text-primary-0 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-4">Complete Your Profile</h2>
          <p className="text-surface-50 mb-6">
            Set up your health profile to get personalized insights and track your wellness journey.
          </p>
          <Link
            to="/onboarding"
            className="btn-primary inline-flex items-center"
          >
            Start Setup
            <Plus size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  const displayProfile = userProfile || {
    name: 'Demo User',
    dateOfBirth: '1970-01-01',
    diagnosis: { condition: 'Prostate Cancer', symptoms: [] },
    medications: [],
    treatments: [],
    trackingMetrics: [],
    lifestyle: {
      diet: 'Balanced diet with whole foods',
      movement: 'Meditation, Walking, Exercise',
      digitalUsage: 'Moderate'
    }
  };

  return (
    <div className="min-h-screen bg-surface-0 pb-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-electric-500 to-electric-600 text-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold font-display mb-3">
              Welcome Back, {displayProfile.name}!
            </h1>
            <p className="text-lg opacity-95 mb-4">
              Your personalized hub for mindset, plans, and community success stories
            </p>
            
            {displayProfile.diagnosis && (
              <div className="inline-block bg-success-10/20 border border-success-10/30 px-6 py-2 rounded-full mb-5">
                <span className="font-semibold">Health Status: </span>
                <strong>Stable & Thriving</strong>
                <span className="ml-3 opacity-75">| Last Update: {new Date().toLocaleDateString()}</span>
              </div>
            )}

            {/* Primary CTAs */}
            <div className="flex justify-center gap-4 flex-wrap mb-4">
              <button
                onClick={() => navigate('/ai-agent')}
                className="btn-primary btn-lg inline-flex items-center"
              >
                <Sparkles size={20} className="mr-2" />
                Chat with AI Advisor
              </button>
              <button
                onClick={() => navigate('/profile?tab=health')}
                className="bg-white hover:bg-gray-100 text-electric-500 font-semibold px-6 py-3 rounded-xl transition-all inline-flex items-center shadow-lg"
              >
                <FileText size={20} className="mr-2" />
                View Full Health Profile
              </button>
            </div>

            {/* Gratitude Streak Badge */}
            <div className="inline-block bg-primary-0 text-black px-5 py-2 rounded-full font-bold text-sm shadow-lg">
              <Heart size={16} className="inline mr-2" />
              Gratitude Streak: {gratitudeStreak} Days
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        {/* Wellness Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white font-display">Wellness Analytics</h2>
              <span className="text-xs text-surface-50">Last 7 days</span>
            </div>
            <button
              onClick={() => setIsMetricsModalOpen(true)}
              className="btn-secondary text-sm flex items-center gap-2"
            >
              <Settings size={16} />
              Customize Metrics
            </button>
          </div>
          <div className={`grid gap-4 ${visibleMetrics.length === 1 ? 'md:grid-cols-1' : visibleMetrics.length === 2 ? 'md:grid-cols-2' : visibleMetrics.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
            {Object.entries(wellnessMetrics)
              .filter(([key]) => visibleMetrics.includes(key))
              .map(([key, metric], idx) => {
              const Icon = metric.icon;
              const progress = (metric.current / 10) * 100;
              
              // Define color classes
              const getColorClasses = (color: string) => {
                switch (color) {
                  case 'primary-0': return { bg: 'bg-primary-0/20', text: 'text-primary-0', gradient: 'from-primary-0 to-primary-10' };
                  case 'info-10': return { bg: 'bg-info-10/20', text: 'text-info-10', gradient: 'from-info-10 to-info-0' };
                  case 'success-10': return { bg: 'bg-success-10/20', text: 'text-success-10', gradient: 'from-success-10 to-success-0' };
                  case 'warning-10': return { bg: 'bg-warning-10/20', text: 'text-warning-10', gradient: 'from-warning-10 to-warning-0' };
                  default: return { bg: 'bg-primary-0/20', text: 'text-primary-0', gradient: 'from-primary-0 to-primary-10' };
                }
              };
              
              const colorClasses = getColorClasses(metric.color);
              
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-surface-10 rounded-2xl border border-surface-20/50 p-5 shadow-strong hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group"
                >
                  {/* Add Data Button - Appears on Hover */}
                  <button
                    onClick={() => openDataEntry(key)}
                    className="absolute top-3 right-3 p-2 bg-primary-0 text-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105"
                    aria-label="Add new data point"
                  >
                    <Plus size={16} />
                  </button>

                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl ${colorClasses.bg}`}>
                      <Icon size={20} className={colorClasses.text} />
                    </div>
                    {getTrendIcon(metric.trend)}
                  </div>
                  
                  <h3 className="text-sm font-semibold text-surface-50 mb-2">{metric.label}</h3>
                  
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-white">{metric.current}</span>
                    <span className="text-sm text-surface-50">/10</span>
                  </div>

                  {/* Mini Line Graph */}
                  <div className="mb-4">
                    <MiniLineGraph data={metric.data} color={metric.color} />
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="h-2 bg-surface-20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 + 0.3 }}
                        className={`h-full bg-gradient-to-r ${colorClasses.gradient} rounded-full relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </motion.div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-surface-50">
                        Target: {metric.target}/10
                      </span>
                      <span className={`text-xs font-semibold ${
                        metric.current >= metric.target ? 'text-success-10' : 'text-warning-10'
                      }`}>
                        {metric.current >= metric.target ? 'On Track' : 'Keep Going'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Row 1: Mindset Tracker + Social Activity */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Mindset Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-surface-10 rounded-2xl border border-surface-20/50 shadow-strong overflow-hidden"
          >
            <div className="bg-gradient-to-r from-success-10 to-success-0 p-4 border-b border-surface-20/50">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Heart size={20} className="mr-2" />
                Mindset Tracker
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  How are you feeling today?
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-surface-0 border border-surface-30 rounded-xl focus:ring-2 focus:ring-success-10 text-white placeholder-surface-40 resize-none text-sm"
                  rows={2}
                  placeholder="Energized and ready for the day!"
                  value={mindsetData.feeling}
                  onChange={(e) => setMindsetData({ ...mindsetData, feeling: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Daily Gratitude
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-surface-0 border border-surface-30 rounded-xl focus:ring-2 focus:ring-success-10 text-white placeholder-surface-40 resize-none text-sm"
                  rows={2}
                  placeholder="Grateful for my health and loved ones..."
                  value={mindsetData.gratitude}
                  onChange={(e) => setMindsetData({ ...mindsetData, gratitude: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  What will make today great?
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-surface-0 border border-surface-30 rounded-xl focus:ring-2 focus:ring-success-10 text-white placeholder-surface-40 resize-none text-sm"
                  rows={2}
                  placeholder="A walk in nature and quality time with family..."
                  value={mindsetData.intention}
                  onChange={(e) => setMindsetData({ ...mindsetData, intention: e.target.value })}
                />
              </div>
              <button
                onClick={saveMindset}
                className="w-full bg-success-10 hover:bg-success-0 text-black font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center"
              >
                <Save size={18} className="mr-2" />
                Save & Share Win
              </button>
            </div>
          </motion.div>

          {/* Social Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-surface-10 rounded-2xl border border-surface-20/50 shadow-strong overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary-0 to-primary-10 p-4 border-b border-surface-20/50">
              <h3 className="text-lg font-bold text-black flex items-center">
                <Users size={20} className="mr-2" />
                Social Activity
              </h3>
            </div>
            <div className="p-5">
              <p className="font-semibold text-white mb-4">Your Thriving Network</p>
              <ul className="space-y-3 mb-5">
                <li className="flex items-center text-surface-50">
                  <MessageSquare size={16} className="text-primary-0 mr-3" />
                  <span>3 Posts Shared This Week</span>
                </li>
                <li className="flex items-center text-surface-50">
                  <MessageSquare size={16} className="text-info-10 mr-3" />
                  <span>5 New Messages</span>
                </li>
                <li className="flex items-center text-surface-50">
                  <ThumbsUp size={16} className="text-success-10 mr-3" />
                  <span>12 Likes on Your Recent Story</span>
                </li>
                <li className="flex items-center text-surface-50">
                  <Users size={16} className="text-warning-10 mr-3" />
                  <span>24 Thrivers in Your Network</span>
                </li>
              </ul>
              <button
                onClick={() => navigate('/social')}
                className="w-full bg-surface-20 hover:bg-surface-30 border border-surface-30 hover:border-primary-0/30 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center"
              >
                <MessageSquare size={18} className="mr-2" />
                Post a Win
              </button>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Master Plan + Today's Plan */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Master Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface-10 rounded-2xl border border-surface-20/50 shadow-strong overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary-0 via-warning-10 to-warning-0 p-4 border-b border-surface-20/50">
              <h3 className="text-lg font-bold text-black flex items-center">
                <Target size={20} className="mr-2" />
                Thriver Master Plan
              </h3>
            </div>
            <div className="p-5">
              <div className="space-y-3 text-sm text-surface-50">
                <div>
                  <span className="text-white font-semibold">Activities:</span>
                  <p className="ml-4 mt-1">
                    {displayProfile.lifestyle?.movement || 'Meditation, Walking, Exercise'}
                  </p>
                </div>
                <div>
                  <span className="text-white font-semibold">Meals:</span>
                  <p className="ml-4 mt-1">
                    {displayProfile.lifestyle?.diet || 'Balanced diet with whole foods'}
                  </p>
                </div>
                {displayProfile.treatments && displayProfile.treatments.length > 0 && (
                  <div>
                    <span className="text-white font-semibold">Treatments:</span>
                    <ul className="ml-4 mt-1 space-y-1">
                      {displayProfile.treatments.slice(0, 3).map((treatment, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary-0 mr-2">•</span>
                          <span>{treatment.name} - {treatment.frequency}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {displayProfile.medications && displayProfile.medications.length > 0 && (
                  <div>
                    <span className="text-white font-semibold">Medications:</span>
                    <ul className="ml-4 mt-1 space-y-1">
                      {displayProfile.medications.slice(0, 3).map((med, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-success-10 mr-2">•</span>
                          <span>{med.name} - {med.dosage} {med.frequency}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {displayProfile.trackingMetrics && displayProfile.trackingMetrics.length > 0 && (
                  <div>
                    <span className="text-white font-semibold">Tracking:</span>
                    <ul className="ml-4 mt-1 space-y-1">
                      {displayProfile.trackingMetrics.slice(0, 3).map((metric, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-info-10 mr-2">•</span>
                          <span>{metric.name} ({metric.unit}) - {metric.frequency}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate('/profile?tab=health')}
                className="w-full mt-5 bg-surface-20 hover:bg-surface-30 border border-warning-10/30 hover:border-warning-10 text-white font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center"
              >
                <Edit3 size={18} className="mr-2" />
                Customize Master Plan
              </button>
            </div>
          </motion.div>

          {/* Today's Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-surface-10 rounded-2xl border border-surface-20/50 shadow-strong overflow-hidden"
          >
            <div className="bg-gradient-to-r from-electric-500 to-info-10 p-4 border-b border-surface-20/50">
              <h3 className="text-lg font-bold text-white flex items-center">
                <Calendar size={20} className="mr-2" />
                Today's Plan for Thriving
              </h3>
            </div>
            <div className="p-5">
              <ul className="space-y-2 mb-4">
                {todaysTasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-surface-20/50 rounded-lg border border-surface-30/30 hover:bg-surface-20 transition-colors cursor-pointer"
                    onClick={() => toggleTaskStatus(task.id)}
                  >
                    <span className="text-white text-sm flex items-center">
                      {task.status === 'done' ? (
                        <CheckCircle size={16} className="text-success-10 mr-2 flex-shrink-0" />
                      ) : task.status === 'missed' ? (
                        <XCircle size={16} className="text-danger-10 mr-2 flex-shrink-0" />
                      ) : (
                        <Clock size={16} className="text-warning-10 mr-2 flex-shrink-0" />
                      )}
                      {task.task}
                    </span>
                    <span className={`text-xs font-semibold ${getStatusColor(task.status)}`}>
                      {getStatusText(task.status)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-center">
                <button
                  onClick={() => navigate('/profile?tab=metrics')}
                  className="bg-surface-20 hover:bg-surface-30 border border-surface-30 hover:border-electric-500/30 text-white font-medium py-2 px-6 rounded-lg transition-all text-sm"
                >
                  <Edit3 size={14} className="inline mr-2" />
                  Edit Tasks
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Community Success Stories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-surface-10 rounded-2xl border border-surface-20/50 shadow-strong overflow-hidden"
        >
          <div className="bg-gradient-to-r from-electric-500 to-success-10 p-4 border-b border-surface-20/50 flex items-center justify-between flex-wrap gap-3">
            <h3 className="text-lg font-bold text-white flex items-center">
              <Users size={20} className="mr-2" />
              Community Success Stories
            </h3>
            <Link
              to="/social"
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              View All Stories
            </Link>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Sample success stories */}
              <div className="p-4 bg-surface-20/50 rounded-xl border-l-4 border-success-10">
                <h4 className="font-semibold text-white mb-2">Stage 4 Prostate - PSA Improvement</h4>
                <p className="text-sm text-surface-50 mb-2">
                  <em>Protocol:</em> Fenbendazole + Ivermectin
                </p>
                <p className="text-sm text-surface-50 mb-2">
                  <em>Result:</em> PSA 156 → 4.2 (6 months)
                </p>
                <p className="text-sm text-success-10 font-semibold italic">
                  "Energy levels restored - back to daily walks!"
                </p>
                <button className="mt-3 bg-success-10/20 hover:bg-success-10/30 text-success-10 px-4 py-1.5 rounded-lg text-xs font-medium transition-all">
                  Full Story
                </button>
              </div>
              
              <div className="p-4 bg-surface-20/50 rounded-xl border-l-4 border-info-10">
                <h4 className="font-semibold text-white mb-2">Stage 3 Breast - Tumor Reduction</h4>
                <p className="text-sm text-surface-50 mb-2">
                  <em>Protocol:</em> IV Vitamin C + Curcumin + Keto
                </p>
                <p className="text-sm text-surface-50 mb-2">
                  <em>Result:</em> 7cm → 1.5cm (3 months)
                </p>
                <p className="text-sm text-info-10 font-semibold italic">
                  "Back to yoga and feeling stronger every day!"
                </p>
                <button className="mt-3 bg-info-10/20 hover:bg-info-10/30 text-info-10 px-4 py-1.5 rounded-lg text-xs font-medium transition-all">
                  Full Story
                </button>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link
                to="/create-testimonial"
                className="btn-primary inline-flex items-center"
              >
                <MessageSquare size={18} className="mr-2" />
                Share Your Success Story
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Customize Metrics Modal */}
        {isMetricsModalOpen && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-10 rounded-2xl border border-surface-20 p-6 w-full max-w-md shadow-strong"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Customize Metrics</h3>
                  <p className="text-sm text-surface-50 mt-1">Choose which metrics to display on your dashboard</p>
                </div>
                <button
                  onClick={() => setIsMetricsModalOpen(false)}
                  className="text-surface-50 hover:text-white p-2 hover:bg-surface-20 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {Object.entries(wellnessMetrics).map(([key, metric]) => {
                  const Icon = metric.icon;
                  const isVisible = visibleMetrics.includes(key);
                  
                  return (
                    <button
                      key={key}
                      onClick={() => toggleMetricVisibility(key)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                        isVisible
                          ? 'bg-primary-0/10 border-2 border-primary-0/30 hover:bg-primary-0/15'
                          : 'bg-surface-20 border-2 border-surface-30 hover:bg-surface-30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isVisible ? 'bg-primary-0/20' : 'bg-surface-30'}`}>
                          <Icon size={18} className={isVisible ? 'text-primary-0' : 'text-surface-50'} />
                        </div>
                        <span className={`font-medium ${isVisible ? 'text-white' : 'text-surface-50'}`}>
                          {metric.label}
                        </span>
                      </div>
                      {isVisible ? (
                        <Eye size={20} className="text-primary-0" />
                      ) : (
                        <EyeOff size={20} className="text-surface-50" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setIsMetricsModalOpen(false)}
                  className="btn-primary flex-1"
                >
                  Done
                </button>
              </div>

              <p className="text-xs text-surface-50 text-center mt-4">
                At least one metric must be visible
              </p>
            </motion.div>
          </div>
        )}

        {/* Data Entry Modal */}
        {isDataEntryOpen && selectedMetricKey && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-10 rounded-2xl border border-surface-20 p-6 w-full max-w-md shadow-strong"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Add {wellnessMetrics[selectedMetricKey as keyof typeof wellnessMetrics]?.label} Data
                  </h3>
                  <p className="text-sm text-surface-50 mt-1">Rate your current level (1-10)</p>
                </div>
                <button
                  onClick={() => setIsDataEntryOpen(false)}
                  className="text-surface-50 hover:text-white p-2 hover:bg-surface-20 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-white mb-3">
                  Current Value
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newDataValue}
                  onChange={(e) => setNewDataValue(e.target.value)}
                  placeholder="Enter 1-10"
                  className="w-full px-4 py-3 bg-surface-0 border-2 border-surface-30 rounded-xl focus:ring-2 focus:ring-primary-0 focus:border-primary-0 text-white placeholder-surface-40 text-center text-2xl font-bold"
                  autoFocus
                />
                
                {/* Visual scale */}
                <div className="mt-4 flex justify-between text-xs text-surface-50">
                  <span>1 - Low</span>
                  <span>5 - Moderate</span>
                  <span>10 - Excellent</span>
                </div>

                {/* Quick select buttons */}
                <div className="mt-4 grid grid-cols-10 gap-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => setNewDataValue(num.toString())}
                      className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                        newDataValue === num.toString()
                          ? 'bg-primary-0 text-black shadow-lg scale-110'
                          : 'bg-surface-20 text-surface-50 hover:bg-surface-30 hover:text-white'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsDataEntryOpen(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={addDataPoint}
                  disabled={!newDataValue}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={18} className="mr-2 inline" />
                  Save
                </button>
              </div>

              <p className="text-xs text-surface-50 text-center mt-4">
                This will update your {wellnessMetrics[selectedMetricKey as keyof typeof wellnessMetrics]?.label.toLowerCase()} tracking
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

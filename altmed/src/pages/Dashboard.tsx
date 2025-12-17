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
import { profileService, wellnessService, metricService } from '../services/dataService';
import EmptyState from '../components/EmptyState';
import { LucideIcon } from 'lucide-react';

// Type for wellness metric
interface WellnessMetric {
  label: string;
  icon: LucideIcon;
  color: string;
  current: number;
  trend: 'up' | 'down' | 'stable';
  data: number[];
  target: number;
  inverse?: boolean;
}

// Type for wellness metrics object
type WellnessMetrics = {
  energy: WellnessMetric;
  sleep: WellnessMetric;
  stress: WellnessMetric;
  mood: WellnessMetric;
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(false);
  const [wellnessEntries, setWellnessEntries] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Load user profile
      const profile = await profileService.get();
      setUserProfile(profile);
      
      // Load wellness entries for the last 7 days
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const startDate = sevenDaysAgo.toISOString().split('T')[0];
      const endDate = today.toISOString().split('T')[0];
      
      const entries = await wellnessService.getByDateRange(startDate, endDate);
      setWellnessEntries(entries);
      
      // Check if user just completed onboarding
      const hasCompletedOnboarding = localStorage.getItem('altmed_onboarding_completed') === 'true';
      const hasSeenWelcome = localStorage.getItem('altmed_welcome_banner_seen') === 'true';
      if (hasCompletedOnboarding && !hasSeenWelcome && profile) {
        setShowWelcomeBanner(true);
      }
      
      setIsLoading(false);
    };
    loadData();
  }, []);
  
  // Mindset tracking
  const [mindsetData, setMindsetData] = useState({
    feeling: '',
    gratitude: '',
    intention: ''
  });

  // Generate tasks from user profile
  const generateTasksFromProfile = (profile: any) => {
    if (!profile) return [];
    
    const tasks: any[] = [];
    let taskId = 1;
    
    // Add medication tasks
    if (profile.medications && profile.medications.length > 0) {
      profile.medications.forEach((med: any) => {
        tasks.push({
          id: taskId++,
          task: `${med.name} ${med.dosage || ''}`.trim(),
          status: 'pending',
          category: 'medication'
        });
      });
    }
    
    // Add treatment/supplement tasks
    if (profile.treatments && profile.treatments.length > 0) {
      profile.treatments.forEach((treatment: any) => {
        tasks.push({
          id: taskId++,
          task: `${treatment.name} ${treatment.dosage || ''}`.trim(),
          status: 'pending',
          category: 'supplement'
        });
      });
    }
    
    // Add tracking metric tasks
    if (profile.trackingMetrics && profile.trackingMetrics.length > 0) {
      profile.trackingMetrics.forEach((metric: any) => {
        if (metric.frequency === 'Daily' || metric.frequency === 'daily') {
          tasks.push({
            id: taskId++,
            task: `Track ${metric.name}`,
            status: 'pending',
            category: 'tracking'
          });
        }
      });
    }
    
    // Add lifestyle/activity tasks if available
    if (profile.lifestyle?.movement) {
      tasks.push({
        id: taskId++,
        task: profile.lifestyle.movement,
        status: 'pending',
        category: 'activity'
      });
    }
    
    return tasks;
  };
  
  const [todaysTasks, setTodaysTasks] = useState<any[]>([]);
  
  // Update tasks when profile loads
  useEffect(() => {
    if (userProfile) {
      const generatedTasks = generateTasksFromProfile(userProfile);
      setTodaysTasks(generatedTasks);
    }
  }, [userProfile]);

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

  // Calculate wellness metrics from real data
  const calculateWellnessMetrics = (entries: any[], profile: any): WellnessMetrics => {
    // Get last 7 days of data, pad with profile defaults if needed
    const today = new Date();
    const last7Days: any[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const entry = entries.find(e => e.date === dateStr);
      
      last7Days.push({
        date: dateStr,
        energy: entry?.energy || profile?.energyLevel || 5,
        sleep: entry?.sleep || profile?.sleepQuality || 5,
        stress: entry?.stress || profile?.stressLevel || 5,
        mood: entry?.mood || 5
      });
    }
    
    const calculateMetric = (key: string, inverse: boolean = false): { current: number; trend: 'up' | 'down' | 'stable'; data: number[] } => {
      const values = last7Days.map(d => d[key]);
      const current = values[values.length - 1];
      const previous = values.length > 1 ? values[values.length - 2] : current;
      
      let trend: 'up' | 'down' | 'stable' = 'stable';
      if (inverse) {
        trend = current < previous ? 'up' : current > previous ? 'down' : 'stable';
      } else {
        trend = current > previous ? 'up' : current < previous ? 'down' : 'stable';
      }
      
      return {
        current,
        trend,
        data: values
      };
    };
    
    return {
      energy: {
        label: 'Energy',
        icon: Zap,
        color: 'primary-0',
        ...calculateMetric('energy'),
        target: profile?.energyLevel || 7
      },
      sleep: {
        label: 'Sleep Quality',
        icon: Moon,
        color: 'info-10',
        ...calculateMetric('sleep'),
        target: profile?.sleepQuality || 7
      },
      stress: {
        label: 'Stress Management',
        icon: Brain,
        color: 'success-10',
        ...calculateMetric('stress', true),
        inverse: true,
        target: profile?.stressLevel || 5
      },
      mood: {
        label: 'Mood',
        icon: Heart,
        color: 'warning-10',
        ...calculateMetric('mood'),
        target: 7
      }
    };
  };
  
  const [wellnessMetrics, setWellnessMetrics] = useState<WellnessMetrics>({
    energy: { label: 'Energy', icon: Zap, color: 'primary-0', current: 5, trend: 'stable', data: [5, 5, 5, 5, 5, 5, 5], target: 7 },
    sleep: { label: 'Sleep Quality', icon: Moon, color: 'info-10', current: 5, trend: 'stable', data: [5, 5, 5, 5, 5, 5, 5], target: 7 },
    stress: { label: 'Stress Management', icon: Brain, color: 'success-10', current: 5, trend: 'stable', data: [5, 5, 5, 5, 5, 5, 5], target: 5, inverse: true },
    mood: { label: 'Mood', icon: Heart, color: 'warning-10', current: 5, trend: 'stable', data: [5, 5, 5, 5, 5, 5, 5], target: 7 }
  });
  
  // Update wellness metrics when entries or profile change
  useEffect(() => {
    if (userProfile || wellnessEntries.length > 0) {
      const metrics = calculateWellnessMetrics(wellnessEntries, userProfile);
      setWellnessMetrics(metrics);
    }
  }, [wellnessEntries, userProfile]);

  // Save visible metrics to localStorage when changed
  useEffect(() => {
    localStorage.setItem('altmed_visible_metrics', JSON.stringify(visibleMetrics));
  }, [visibleMetrics]);

  useEffect(() => {
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
    // Save task status to localStorage (could be saved to backend in future)
    const updatedTasks = todaysTasks.map(t =>
      t.id === taskId
        ? { ...t, status: t.status === 'done' ? 'pending' : 'done' }
        : t
    );
    localStorage.setItem('altmed_todays_tasks', JSON.stringify(updatedTasks));
  };
  
  // Load saved task statuses on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('altmed_todays_tasks');
    if (savedTasks && userProfile) {
      try {
        const parsed = JSON.parse(savedTasks);
        // Merge saved statuses with generated tasks
        setTodaysTasks(prevTasks => {
          return prevTasks.map(task => {
            const saved = parsed.find((t: any) => t.task === task.task);
            return saved ? { ...task, status: saved.status } : task;
          });
        });
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, [userProfile]);

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

    setWellnessMetrics((prev: WellnessMetrics) => ({
      ...prev,
      [selectedMetricKey]: {
        ...prev[selectedMetricKey as keyof WellnessMetrics],
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#000' }}>
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#000' }}>
        <EmptyState
          icon={Activity}
          title="Welcome to ThriverHealth.Ai!"
          description="Complete your profile setup to get personalized health insights, track your wellness journey, and connect with our AI assistant."
          actionLabel="Start Setup"
          onAction={() => navigate('/onboarding')}
        />
      </div>
    );
  }

  if (!userProfile) {
    return null; // This shouldn't happen due to the check above, but TypeScript needs it
  }
  
  const displayProfile = userProfile;

  return (
    <div className="min-h-screen pb-8" style={{ background: 'linear-gradient(180deg, #000 0%, #0a0805 50%, #000 100%)' }}>
      {/* Welcome Banner for New Users */}
      {showWelcomeBanner && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-4"
          style={{
            background: 'linear-gradient(90deg, rgba(255, 132, 0, 0.15) 0%, rgba(255, 132, 0, 0.05) 50%, rgba(255, 132, 0, 0.15) 100%)',
            borderBottom: '1px solid rgba(255, 132, 0, 0.3)'
          }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="icon-glow p-2">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold">Welcome, {displayProfile.name || 'there'}! 🎉</h3>
                <p className="text-gray-400 text-sm">Your profile is set up. Start exploring your personalized health journey.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowWelcomeBanner(false);
                localStorage.setItem('altmed_welcome_banner_seen', 'true');
              }}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss welcome banner"
            >
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section 
        className="text-white py-8"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% -20%, rgba(255, 132, 0, 0.15) 0%, transparent 50%)',
          borderBottom: '1px solid rgba(255, 132, 0, 0.2)'
        }}
      >
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
              <div 
                className="inline-block px-6 py-2 rounded-full mb-5"
                style={{
                  background: 'rgba(71, 213, 166, 0.15)',
                  border: '1px solid rgba(71, 213, 166, 0.3)',
                  boxShadow: '0 0 30px rgba(71, 213, 166, 0.1)'
                }}
              >
                <span className="font-semibold text-green-400">Health Status: </span>
                <strong className="text-white">Stable & Thriving</strong>
                <span className="ml-3 text-gray-400">| Last Update: {new Date().toLocaleDateString()}</span>
              </div>
            )}

            {/* Primary CTAs */}
            <div className="flex justify-center gap-4 flex-wrap mb-4">
              <button
                onClick={() => navigate('/ai-agent')}
                className="btn-glow inline-flex items-center"
              >
                <Sparkles size={20} className="mr-2" />
                Chat with AI Advisor
              </button>
              <button
                onClick={() => navigate('/profile?tab=health')}
                className="btn-secondary inline-flex items-center"
              >
                <FileText size={20} className="mr-2" />
                View Full Health Profile
              </button>
            </div>

            {/* Gratitude Streak Badge */}
            <div 
              className="inline-block px-5 py-2 rounded-full font-bold text-sm"
              style={{
                background: 'linear-gradient(135deg, #ff8400, #ff6b00)',
                color: '#000',
                boxShadow: '0 0 30px rgba(255, 132, 0, 0.5)'
              }}
            >
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
              const metricTyped = metric as WellnessMetric;
              const Icon = metricTyped.icon;
              const progress = (metricTyped.current / 10) * 100;
              
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
              
              const colorClasses = getColorClasses(metricTyped.color);
              
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
                      {displayProfile.treatments.slice(0, 3).map((treatment: any, idx: number) => (
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
                      {displayProfile.medications.slice(0, 3).map((med: any, idx: number) => (
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
                      {displayProfile.trackingMetrics.slice(0, 3).map((metric: any, idx: number) => (
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
                  const metricTyped = metric as WellnessMetric;
                  const Icon = metricTyped.icon;
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
                          {metricTyped.label}
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

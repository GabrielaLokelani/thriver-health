import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Shield, 
  Download, 
  Trash2, 
  Edit3, 
  Camera, 
  Save, 
  X,
  Heart,
  BookOpen,
  TrendingUp,
  Award,
  MapPin,
  Activity,
  Pill,
  Stethoscope,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Calendar,
  BarChart3,
  Target
} from 'lucide-react';
import { storage, UserProfile, calculateAge, MetricDataEntry } from '../utils/storage';
import { demoUserProfile } from '../utils/demoData';
import ReferralDashboard from '../components/ReferralDashboard';

interface UserSettings {
  soundEnabled: boolean;
  animationsEnabled: boolean;
  dashboardLayout: 'grid' | 'list';
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    email: boolean;
    push: boolean;
    reminders: boolean;
  };
  privacy: {
    shareData: boolean;
    showProfile: boolean;
    allowAnalytics: boolean;
  };
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'health' | 'metrics' | 'referrals' | 'settings' | 'privacy' | 'data'>('overview');
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    diagnosis: true,
    symptoms: false,
    medications: false,
    alternativeTreatments: false,
    conventionalTreatments: false,
    trackingMetrics: false,
  });
  const [isEditingMetric, setIsEditingMetric] = useState(false);
  const [editingMetric, setEditingMetric] = useState<any>(null);
  const [isDataEntryOpen, setIsDataEntryOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  const [settings, setSettings] = useState<UserSettings>({
    soundEnabled: true,
    animationsEnabled: true,
    dashboardLayout: 'grid',
    theme: 'light',
    notifications: {
      email: true,
      push: true,
      reminders: true
    },
    privacy: {
      shareData: true,
      showProfile: true,
      allowAnalytics: true
    }
  });

  useEffect(() => {
    const profile = storage.getUserProfile();
    const savedSettings = storage.getUserSettings();
    
    setUserProfile(profile);
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...savedSettings }));
    }
    
    // Check if this is demo mode
    if (profile && profile.id === demoUserProfile.id) {
      setIsDemoMode(true);
    }

    // Check for URL parameters to set active tab
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    if (tab && ['overview', 'health', 'metrics', 'referrals', 'settings', 'privacy', 'data'].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, []);

  const handleSaveProfile = (updatedProfile: Partial<UserProfile>) => {
    if (userProfile) {
      const newProfile = {
        ...userProfile,
        ...updatedProfile,
        updatedAt: new Date().toISOString()
      };
      storage.saveUserProfile(newProfile);
      setUserProfile(newProfile);
      setIsEditing(false);
    }
  };

  const handleSaveSettings = (newSettings: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    storage.saveUserSettings(updatedSettings);
  };

  const exportUserData = () => {
    const data = {
      profile: userProfile,
      wellnessEntries: storage.getWellnessEntries(),
      savedRecommendations: storage.getSavedRecommendations(),
      settings: settings,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `altmed-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      storage.clearAllData();
      window.location.href = '/';
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const addNewMetric = () => {
    setEditingMetric({
      name: '',
      unit: '',
      targetRange: '',
      frequency: 'Daily',
      category: 'Custom'
    });
    setIsEditingMetric(true);
  };

  const editMetric = (metric: any) => {
    setEditingMetric({ ...metric });
    setIsEditingMetric(true);
  };

  const saveMetric = (metricData: any) => {
    if (userProfile) {
      let updatedMetrics;
      if (editingMetric && editingMetric.name) {
        // Editing existing metric
        updatedMetrics = userProfile.trackingMetrics.map(m => 
          m.name === editingMetric.name ? metricData : m
        );
      } else {
        // Adding new metric
        updatedMetrics = [...userProfile.trackingMetrics, metricData];
      }
      
      const updatedProfile = {
        ...userProfile,
        trackingMetrics: updatedMetrics,
        updatedAt: new Date().toISOString()
      };
      
      storage.saveUserProfile(updatedProfile);
      setUserProfile(updatedProfile);
      setIsEditingMetric(false);
      setEditingMetric(null);
    }
  };

  const deleteMetric = (metricName: string) => {
    if (userProfile && window.confirm('Are you sure you want to delete this metric?')) {
      const updatedMetrics = userProfile.trackingMetrics.filter(m => m.name !== metricName);
      const updatedProfile = {
        ...userProfile,
        trackingMetrics: updatedMetrics,
        updatedAt: new Date().toISOString()
      };
      
      storage.saveUserProfile(updatedProfile);
      setUserProfile(updatedProfile);
    }
  };

  const openDataEntry = (metric: any) => {
    setSelectedMetric(metric);
    setIsDataEntryOpen(true);
  };

  const closeDataEntry = () => {
    setIsDataEntryOpen(false);
    setSelectedMetric(null);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'health', label: 'Health Info', icon: Stethoscope },
    { id: 'metrics', label: 'Tracking Metrics', icon: BarChart3 },
    { id: 'referrals', label: 'Referrals', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'data', label: 'Data', icon: Download }
  ];

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-warm-800 flex items-center justify-center">
        <div className="card max-w-md w-full text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-600 mx-auto mb-4"></div>
          <p className="text-warm-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Profile & Settings
              </h1>
              <p className="text-warm-300">
                Manage your account, preferences, and wellness data
              </p>
              {isDemoMode && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-lavender-100 to-rose-100 text-electric-400 border border-lavender-200">
                    🎭 Demo Mode
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-8"
            >
              {/* Profile Card */}
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-lavender-400 to-rose-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
                    <Camera size={16} className="text-warm-300" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-white mb-1">
                  {userProfile.name}
                </h2>
                <p className="text-warm-300 text-sm mb-3">
                  Member since {new Date(userProfile.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-center text-warm-400 text-sm">
                  <MapPin size={14} className="mr-1" />
                  {userProfile.location}
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center px-6 py-4 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-electric-500/20 text-electric-400 border-lavender-200'
                        : 'text-warm-300 hover:bg-warm-600/30 hover:text-white'
                    }`}
                  >
                    <tab.icon size={20} className="mr-3" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card p-8"
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      Profile Overview
                    </h3>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="btn-secondary flex items-center px-6 py-3"
                    >
                      <Edit3 size={18} className="mr-2" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>

                  {isEditing ? (
                    <ProfileEditForm 
                      userProfile={userProfile} 
                      onSave={handleSaveProfile}
                      onCancel={() => setIsEditing(false)}
                    />
                  ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-base font-medium text-warm-300 mb-2">Full Name</label>
                          <p className="text-white text-base">{userProfile.name}</p>
                        </div>
                        <div>
                          <label className="block text-base font-medium text-warm-300 mb-2">Age</label>
                          <p className="text-white text-base">{calculateAge(userProfile.dateOfBirth)} years old</p>
                        </div>
                        <div>
                          <label className="block text-base font-medium text-warm-300 mb-2">Sex</label>
                          <p className="text-white text-base">{userProfile.sex}</p>
                        </div>
                        <div>
                          <label className="block text-base font-medium text-warm-300 mb-2">Location</label>
                          <p className="text-white text-base">{userProfile.location}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-base font-medium text-warm-300 mb-2">Energy Level</label>
                          <div className="flex items-center">
                            <div className="flex-1 bg-warm-600 rounded-full h-2 mr-3">
                              <div 
                                className="bg-electric-500/200 h-2 rounded-full" 
                                style={{ width: `${userProfile.energyLevel * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-warm-300">{userProfile.energyLevel}/10</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-warm-300 mb-1">Sleep Quality</label>
                          <div className="flex items-center">
                            <div className="flex-1 bg-warm-600 rounded-full h-2 mr-3">
                              <div 
                                className="bg-orange-500/200 h-2 rounded-full" 
                                style={{ width: `${userProfile.sleepQuality * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-warm-300">{userProfile.sleepQuality}/10</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-warm-300 mb-1">Stress Level</label>
                          <div className="flex items-center">
                            <div className="flex-1 bg-warm-600 rounded-full h-2 mr-3">
                              <div 
                                className="bg-lime-500/200 h-2 rounded-full" 
                                style={{ width: `${userProfile.stressLevel * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-warm-300">{userProfile.stressLevel}/10</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-warm-300 mb-1">Mental Clarity</label>
                          <div className="flex items-center">
                            <div className="flex-1 bg-warm-600 rounded-full h-2 mr-3">
                              <div 
                                className="bg-warm-600/300 h-2 rounded-full" 
                                style={{ width: `${userProfile.mentalClarity * 10}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-warm-300">{userProfile.mentalClarity}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Wellness Stats */}
                  <div className="border-t border-sage-200 pt-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Wellness Statistics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-electric-500/20 rounded-lg">
                        <Heart size={24} className="text-electric-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-electric-400">
                          {storage.getWellnessEntries().length}
                        </div>
                        <div className="text-sm text-warm-300">Journal Entries</div>
                      </div>
                      <div className="text-center p-4 bg-orange-500/20 rounded-lg">
                        <BookOpen size={24} className="text-orange-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-orange-400">
                          {storage.getSavedRecommendations().length}
                        </div>
                        <div className="text-sm text-warm-300">Saved Recommendations</div>
                      </div>
                      <div className="text-center p-4 bg-lime-500/20 rounded-lg">
                        <TrendingUp size={24} className="text-lime-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-lime-400">
                          {Math.floor((Date.now() - new Date(userProfile.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                        </div>
                        <div className="text-sm text-warm-300">Days Active</div>
                      </div>
                      <div className="text-center p-4 bg-warm-600/30 rounded-lg">
                        <Award size={24} className="text-warm-300 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-warm-300">
                          {userProfile.diagnosis?.symptoms?.length || 0}
                        </div>
                        <div className="text-sm text-warm-300">Symptoms Tracked</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Metrics Tab */}
              {activeTab === 'metrics' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Tracking Metrics
                      </h3>
                      <p className="text-warm-300">
                        Manage your health data tracking settings
                      </p>
                    </div>
                    <button
                      onClick={addNewMetric}
                      className="btn-primary flex items-center px-6 py-3"
                    >
                      <BarChart3 size={18} className="mr-2" />
                      Add Metric
                    </button>
                  </div>

                  {userProfile.trackingMetrics && userProfile.trackingMetrics.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {userProfile.trackingMetrics.map((metric, index) => (
                        <div key={index} className="modern-card p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                metric.category === 'Health Marker' ? 'bg-primary-0/20 text-primary-0 border border-primary-0/30' :
                                metric.category === 'Wellness' ? 'bg-success-10/20 text-success-10 border border-success-10/30' :
                                metric.category === 'Activity' ? 'bg-info-10/20 text-info-10 border border-info-10/30' :
                                'bg-warning-10/20 text-warning-10 border border-warning-10/30'
                              }`}>
                                {metric.category}
                              </span>
                              <h4 className="text-lg font-semibold text-white">{metric.name}</h4>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => editMetric(metric)}
                                className="text-primary-0 hover:text-primary-10 text-sm"
                                aria-label={`Edit ${metric.name} metric`}
                              >
                                <Edit3 size={16} />
                              </button>
                              <button
                                onClick={() => openDataEntry(metric)}
                                className="text-success-10 hover:text-success-0 text-sm"
                                aria-label={`Add data for ${metric.name}`}
                              >
                                <BarChart3 size={16} />
                              </button>
                              <button
                                onClick={() => deleteMetric(metric.name)}
                                className="text-danger-10 hover:text-danger-0 text-sm"
                                aria-label={`Delete ${metric.name} metric`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-surface-50">Unit:</span>
                                <p className="text-white font-medium">{metric.unit}</p>
                              </div>
                              <div>
                                <span className="text-surface-50">Frequency:</span>
                                <p className="text-white font-medium">{metric.frequency}</p>
                              </div>
                            </div>
                            {metric.targetRange && (
                              <div>
                                <span className="text-surface-50">Target Range:</span>
                                <p className="text-white font-medium">{metric.targetRange} {metric.unit}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BarChart3 size={48} className="text-surface-50 mx-auto mb-4" />
                      <h4 className="text-lg font-semibold text-white mb-2">No Metrics Yet</h4>
                      <p className="text-surface-50 mb-6">Start tracking your health data by adding your first metric.</p>
                      <button
                        onClick={addNewMetric}
                        className="btn-primary flex items-center mx-auto"
                      >
                        <BarChart3 size={18} className="mr-2" />
                        Add Your First Metric
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Health Info Tab */}
              {activeTab === 'health' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Health Information
                    </h3>
                    <p className="text-warm-300">
                      Your complete medical profile from onboarding
                    </p>
                  </div>

                  {/* Diagnosis */}
                  {userProfile.diagnosis && (
                    <div className="modern-card p-6">
                      <button
                        onClick={() => toggleSection('diagnosis')}
                        className="w-full flex items-center justify-between mb-4"
                        aria-label="Toggle diagnosis section"
                        aria-expanded={expandedSections.diagnosis}
                      >
                        <div className="flex items-center">
                          <AlertCircle className="text-primary-0 mr-3" size={24} />
                          <h4 className="text-xl font-semibold text-white">Primary Diagnosis</h4>
                        </div>
                        {expandedSections.diagnosis ? <ChevronUp className="text-surface-50" /> : <ChevronDown className="text-surface-50" />}
                      </button>
                      
                      {expandedSections.diagnosis && (
                        <div className="space-y-4 mt-4 pl-9">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-medium text-surface-50 mb-2">Condition</label>
                              <p className="text-white text-lg font-medium">
                                {userProfile.diagnosis.condition === 'Other' && userProfile.diagnosis.customCondition 
                                  ? userProfile.diagnosis.customCondition 
                                  : userProfile.diagnosis.condition}
                              </p>
                            </div>
                            {userProfile.diagnosis.diagnosisDate && (
                              <div>
                                <label className="block text-sm font-medium text-surface-50 mb-2">Diagnosis Date</label>
                                <div className="flex items-center">
                                  <Calendar size={16} className="text-primary-0 mr-2" />
                                  <p className="text-white">{new Date(userProfile.diagnosis.diagnosisDate).toLocaleDateString()}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Symptoms */}
                  {userProfile.diagnosis?.symptoms && userProfile.diagnosis.symptoms.length > 0 && (
                    <div className="modern-card p-6">
                      <button
                        onClick={() => toggleSection('symptoms')}
                        className="w-full flex items-center justify-between mb-4"
                        aria-label="Toggle symptoms section"
                        aria-expanded={expandedSections.symptoms}
                      >
                        <div className="flex items-center">
                          <Activity className="text-warning-10 mr-3" size={24} />
                          <div className="text-left">
                            <h4 className="text-xl font-semibold text-white">Symptoms</h4>
                            <p className="text-sm text-surface-50">{userProfile.diagnosis.symptoms.length} symptoms tracked</p>
                          </div>
                        </div>
                        {expandedSections.symptoms ? <ChevronUp className="text-surface-50" /> : <ChevronDown className="text-surface-50" />}
                      </button>
                      
                      {expandedSections.symptoms && (
                        <div className="mt-4 pl-9">
                          <div className="flex flex-wrap gap-2">
                            {userProfile.diagnosis.symptoms.map((symptom, index) => (
                              <span
                                key={index}
                                className="px-3 py-2 bg-warning-0/10 border border-warning-10/30 rounded-lg text-sm text-white"
                              >
                                {symptom}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Medications */}
                  {userProfile.medications && userProfile.medications.length > 0 && (
                    <div className="modern-card p-6">
                      <button
                        onClick={() => toggleSection('medications')}
                        className="w-full flex items-center justify-between mb-4"
                        aria-label="Toggle medications section"
                        aria-expanded={expandedSections.medications}
                      >
                        <div className="flex items-center">
                          <Pill className="text-danger-10 mr-3" size={24} />
                          <div className="text-left">
                            <h4 className="text-xl font-semibold text-white">Current Medications</h4>
                            <p className="text-sm text-surface-50">{userProfile.medications.length} medications</p>
                          </div>
                        </div>
                        {expandedSections.medications ? <ChevronUp className="text-surface-50" /> : <ChevronDown className="text-surface-50" />}
                      </button>
                      
                      {expandedSections.medications && (
                        <div className="space-y-3 mt-4 pl-9">
                          {userProfile.medications.map((med, index) => (
                            <div key={index} className="bg-surface-tonal-10 p-4 rounded-lg border border-surface-tonal-20">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="text-white font-semibold text-lg mb-2">{med.name}</h5>
                                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                                    <div>
                                      <span className="text-surface-50">Dosage:</span>
                                      <span className="text-white ml-2">{med.dosage}</span>
                                    </div>
                                    <div>
                                      <span className="text-surface-50">Frequency:</span>
                                      <span className="text-white ml-2">{med.frequency}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Conventional Treatments */}
                  {userProfile.conventionalTreatments && userProfile.conventionalTreatments.length > 0 && (
                    <div className="modern-card p-6">
                      <button
                        onClick={() => toggleSection('conventionalTreatments')}
                        className="w-full flex items-center justify-between mb-4"
                        aria-label="Toggle conventional treatments section"
                        aria-expanded={expandedSections.conventionalTreatments}
                      >
                        <div className="flex items-center">
                          <Stethoscope className="text-info-10 mr-3" size={24} />
                          <div className="text-left">
                            <h4 className="text-xl font-semibold text-white">Conventional Treatments</h4>
                            <p className="text-sm text-surface-50">{userProfile.conventionalTreatments.length} treatments</p>
                          </div>
                        </div>
                        {expandedSections.conventionalTreatments ? <ChevronUp className="text-surface-50" /> : <ChevronDown className="text-surface-50" />}
                      </button>
                      
                      {expandedSections.conventionalTreatments && (
                        <div className="space-y-3 mt-4 pl-9">
                          {userProfile.conventionalTreatments.map((treatment, index) => (
                            <div key={index} className="bg-info-10/10 p-4 rounded-lg border border-info-10/30">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <h5 className="text-white font-semibold text-lg mb-1">{treatment.name}</h5>
                                  <span className="inline-flex items-center px-2 py-1 bg-info-10/20 border border-info-10/30 rounded text-xs text-info-10">
                                    {treatment.type}
                                  </span>
                                </div>
                                {treatment.status && (
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    treatment.status === 'Completed' ? 'bg-success-10/20 text-success-10 border border-success-10/30' :
                                    treatment.status === 'Ongoing' ? 'bg-primary-0/20 text-primary-0 border border-primary-0/30' :
                                    treatment.status === 'Scheduled' ? 'bg-info-10/20 text-info-10 border border-info-10/30' :
                                    'bg-surface-20 text-surface-50 border border-surface-30'
                                  }`}>
                                    {treatment.status}
                                  </span>
                                )}
                              </div>
                              <div className="space-y-2 text-sm">
                                {treatment.date && (
                                  <div className="flex items-center">
                                    <Calendar size={14} className="text-surface-50 mr-2" />
                                    <span className="text-surface-50">Date:</span>
                                    <span className="text-white ml-2">{new Date(treatment.date).toLocaleDateString()}</span>
                                  </div>
                                )}
                                {treatment.notes && (
                                  <div>
                                    <span className="text-surface-50">Notes:</span>
                                    <p className="text-white mt-1">{treatment.notes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Alternative Treatments */}
                  {userProfile.treatments && userProfile.treatments.length > 0 && (
                    <div className="modern-card p-6">
                      <button
                        onClick={() => toggleSection('alternativeTreatments')}
                        className="w-full flex items-center justify-between mb-4"
                        aria-label="Toggle alternative treatments section"
                        aria-expanded={expandedSections.alternativeTreatments}
                      >
                        <div className="flex items-center">
                          <Heart className="text-success-10 mr-3" size={24} />
                          <div className="text-left">
                            <h4 className="text-xl font-semibold text-white">Alternative Treatments</h4>
                            <p className="text-sm text-surface-50">{userProfile.treatments.length} treatments</p>
                          </div>
                        </div>
                        {expandedSections.alternativeTreatments ? <ChevronUp className="text-surface-50" /> : <ChevronDown className="text-surface-50" />}
                      </button>
                      
                      {expandedSections.alternativeTreatments && (
                        <div className="space-y-3 mt-4 pl-9">
                          {userProfile.treatments.map((treatment, index) => (
                            <div key={index} className="bg-success-10/10 p-4 rounded-lg border border-success-10/30">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h5 className="text-white font-semibold text-lg mb-1">{treatment.name}</h5>
                                  <span className="inline-flex items-center px-2 py-1 bg-success-10/20 border border-success-10/30 rounded text-xs text-success-10">
                                    {treatment.type}
                                  </span>
                                </div>
                              </div>
                              <div className="grid md:grid-cols-2 gap-3 text-sm mt-3">
                                {treatment.dosage && (
                                  <div>
                                    <span className="text-surface-50">Dosage:</span>
                                    <span className="text-white ml-2">{treatment.dosage}</span>
                                  </div>
                                )}
                                <div>
                                  <span className="text-surface-50">Frequency:</span>
                                  <span className="text-white ml-2">{treatment.frequency}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tracking Metrics */}
                  {userProfile.trackingMetrics && userProfile.trackingMetrics.length > 0 && (
                    <div className="modern-card p-6">
                      <button
                        onClick={() => toggleSection('trackingMetrics')}
                        className="w-full flex items-center justify-between mb-4"
                        aria-label="Toggle tracking metrics section"
                        aria-expanded={expandedSections.trackingMetrics}
                      >
                        <div className="flex items-center">
                          <BarChart3 className="text-primary-0 mr-3" size={24} />
                          <div className="text-left">
                            <h4 className="text-xl font-semibold text-white">Tracking Metrics</h4>
                            <p className="text-sm text-surface-50">{userProfile.trackingMetrics.length} metrics to track</p>
                          </div>
                        </div>
                        {expandedSections.trackingMetrics ? <ChevronUp className="text-surface-50" /> : <ChevronDown className="text-surface-50" />}
                      </button>
                      
                      {expandedSections.trackingMetrics && (
                        <div className="grid md:grid-cols-2 gap-4 mt-4 pl-9">
                          {userProfile.trackingMetrics.map((metric, index) => (
                            <div key={index} className="bg-surface-tonal-10 p-4 rounded-lg border border-surface-tonal-20">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="text-white font-semibold">{metric.name}</h5>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  metric.category === 'Health Marker' ? 'bg-primary-0/20 text-primary-0 border border-primary-0/30' :
                                  metric.category === 'Wellness' ? 'bg-success-10/20 text-success-10 border border-success-10/30' :
                                  metric.category === 'Activity' ? 'bg-info-10/20 text-info-10 border border-info-10/30' :
                                  'bg-warning-10/20 text-warning-10 border border-warning-10/30'
                                }`}>
                                  {metric.category}
                                </span>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-surface-50">Unit:</span>
                                  <span className="text-white ml-2">{metric.unit}</span>
                                </div>
                                {metric.targetRange && (
                                  <div>
                                    <span className="text-surface-50">Target:</span>
                                    <span className="text-white ml-2">{metric.targetRange} {metric.unit}</span>
                                  </div>
                                )}
                                <div>
                                  <span className="text-surface-50">Track:</span>
                                  <span className="text-white ml-2">{metric.frequency}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Lifestyle & Goals Summary */}
                  <div className="modern-card p-6">
                    <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <BookOpen className="text-primary-0 mr-3" size={24} />
                      Lifestyle & Goals
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-50 mb-2">Diet</label>
                        <p className="text-white">{userProfile.lifestyle.diet}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-50 mb-2">Movement & Exercise</label>
                        <p className="text-white">{userProfile.lifestyle.movement}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-50 mb-2">Digital Usage</label>
                        <p className="text-white">{userProfile.lifestyle.digitalUsage}</p>
                      </div>
                      
                      {userProfile.goals.shortTerm.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-surface-50 mb-2">Short-term Goals</label>
                          <div className="flex flex-wrap gap-2">
                            {userProfile.goals.shortTerm.map((goal, index) => (
                              <span key={index} className="px-3 py-1 bg-primary-0/10 border border-primary-0/30 rounded-full text-sm text-white">
                                {goal}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {userProfile.goals.longTerm && (
                        <div>
                          <label className="block text-sm font-medium text-surface-50 mb-2">Long-term Vision</label>
                          <p className="text-white">{userProfile.goals.longTerm}</p>
                        </div>
                      )}
                      
                      {userProfile.customNotes && (
                        <div>
                          <label className="block text-sm font-medium text-surface-50 mb-2">Additional Notes</label>
                          <p className="text-white">{userProfile.customNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    App Settings
                  </h3>

                  <div className="space-y-6">
                    {/* Display Settings */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Display & Interface</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium text-white">Theme</label>
                            <p className="text-sm text-warm-300">Choose your preferred color scheme</p>
                          </div>
                          <select
                            value={settings.theme}
                            onChange={(e) => handleSaveSettings({ theme: e.target.value as any })}
                            className="px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-lavender-500"
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                            <option value="auto">Auto</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium text-white">Dashboard Layout</label>
                            <p className="text-sm text-warm-300">Choose how your dashboard is organized</p>
                          </div>
                          <select
                            value={settings.dashboardLayout}
                            onChange={(e) => handleSaveSettings({ dashboardLayout: e.target.value as any })}
                            className="px-3 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-lavender-500"
                          >
                            <option value="grid">Grid</option>
                            <option value="list">List</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium text-white">Animations</label>
                            <p className="text-sm text-warm-300">Enable smooth animations and transitions</p>
                          </div>
                          <button
                            onClick={() => handleSaveSettings({ animationsEnabled: !settings.animationsEnabled })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.animationsEnabled ? 'bg-electric-500' : 'bg-warm-500'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Sound Settings */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Sound & Audio</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="font-medium text-white">Sound Effects</label>
                          <p className="text-sm text-warm-300">Play sounds for notifications and interactions</p>
                        </div>
                        <button
                          onClick={() => handleSaveSettings({ soundEnabled: !settings.soundEnabled })}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            settings.soundEnabled ? 'bg-electric-500' : 'bg-warm-500'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Notification Settings */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Notifications</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium text-white">Email Notifications</label>
                            <p className="text-sm text-warm-300">Receive updates and reminders via email</p>
                          </div>
                          <button
                            onClick={() => handleSaveSettings({ 
                              notifications: { ...settings.notifications, email: !settings.notifications.email }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.notifications.email ? 'bg-electric-500' : 'bg-warm-500'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium text-white">Push Notifications</label>
                            <p className="text-sm text-warm-300">Receive notifications on your device</p>
                          </div>
                          <button
                            onClick={() => handleSaveSettings({ 
                              notifications: { ...settings.notifications, push: !settings.notifications.push }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.notifications.push ? 'bg-electric-500' : 'bg-warm-500'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium text-white">Wellness Reminders</label>
                            <p className="text-sm text-warm-300">Daily reminders to log your wellness</p>
                          </div>
                          <button
                            onClick={() => handleSaveSettings({ 
                              notifications: { ...settings.notifications, reminders: !settings.notifications.reminders }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.notifications.reminders ? 'bg-electric-500' : 'bg-warm-500'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.notifications.reminders ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    Privacy & Security
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Data Sharing</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium text-white">Share Wellness Data</label>
                            <p className="text-sm text-warm-300">Allow your data to be used for research and community insights</p>
                          </div>
                          <button
                            onClick={() => handleSaveSettings({ 
                              privacy: { ...settings.privacy, shareData: !settings.privacy.shareData }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy.shareData ? 'bg-electric-500' : 'bg-warm-500'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.privacy.shareData ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium text-white">Public Profile</label>
                            <p className="text-sm text-warm-300">Allow other users to see your profile information</p>
                          </div>
                          <button
                            onClick={() => handleSaveSettings({ 
                              privacy: { ...settings.privacy, showProfile: !settings.privacy.showProfile }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy.showProfile ? 'bg-electric-500' : 'bg-warm-500'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.privacy.showProfile ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <label className="font-medium text-white">Analytics</label>
                            <p className="text-sm text-warm-300">Help us improve by allowing anonymous usage analytics</p>
                          </div>
                          <button
                            onClick={() => handleSaveSettings({ 
                              privacy: { ...settings.privacy, allowAnalytics: !settings.privacy.allowAnalytics }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              settings.privacy.allowAnalytics ? 'bg-electric-500' : 'bg-warm-500'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                settings.privacy.allowAnalytics ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-warm-600/30 border border-sage-200 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Your Privacy Rights</h5>
                      <p className="text-sm text-warm-300 mb-3">
                        You have the right to access, modify, or delete your personal data at any time. 
                        Your wellness data is encrypted and stored securely.
                      </p>
                      <div className="flex space-x-3">
                        <button className="text-sm text-electric-400 hover:text-electric-400 font-medium">
                          View Data Policy
                        </button>
                        <button className="text-sm text-electric-400 hover:text-electric-400 font-medium">
                          Contact Support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Referrals Tab */}
              {activeTab === 'referrals' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    Referral Program
                  </h3>
                  <p className="text-warm-300">
                    Track your referrals, earn commissions, and grow our community. Share your referral link to earn rewards when others join and engage with our platform.
                  </p>
                  <ReferralDashboard userId={userProfile.id} />
                </div>
              )}

              {/* Data Tab */}
              {activeTab === 'data' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">
                    Data Management
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Export & Backup</h4>
                      <div className="space-y-4">
                        <div className="bg-electric-500/20 border border-lavender-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-semibold text-white mb-1">Export Your Data</h5>
                              <p className="text-sm text-warm-300 mb-3">
                                Download all your wellness data, including profile, journal entries, and settings.
                              </p>
                            </div>
                            <Download size={20} className="text-electric-400" />
                          </div>
                          <button
                            onClick={exportUserData}
                            className="btn-primary flex items-center"
                          >
                            <Download size={16} className="mr-2" />
                            Export Data
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Account Actions</h4>
                      <div className="space-y-4">
                        <div className="bg-lime-500/20 border border-rose-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h5 className="font-semibold text-white mb-1">Delete Account</h5>
                              <p className="text-sm text-warm-300 mb-3">
                                Permanently delete your account and all associated data. This action cannot be undone.
                              </p>
                            </div>
                            <Trash2 size={20} className="text-lime-400" />
                          </div>
                          <button
                            onClick={deleteAccount}
                            className="bg-lime-500 hover:bg-lime-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h5 className="font-semibold text-white mb-2">Data Summary</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-warm-300">Profile Created:</span>
                          <p className="font-medium">{new Date(userProfile.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-warm-300">Last Updated:</span>
                          <p className="font-medium">{new Date(userProfile.updatedAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <span className="text-warm-300">Journal Entries:</span>
                          <p className="font-medium">{storage.getWellnessEntries().length}</p>
                        </div>
                        <div>
                          <span className="text-warm-300">Saved Items:</span>
                          <p className="font-medium">{storage.getSavedRecommendations().length}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Metric Edit Modal */}
      {isEditingMetric && (
        <MetricEditModal
          metric={editingMetric}
          onSave={saveMetric}
          onCancel={() => {
            setIsEditingMetric(false);
            setEditingMetric(null);
          }}
        />
      )}
      
      {/* Metric Data Entry Modal */}
      {isDataEntryOpen && selectedMetric && (
        <MetricDataEntryModal
          metric={selectedMetric}
          onClose={closeDataEntry}
        />
      )}
    </div>
  );
};

// Metric Edit Modal Component
interface MetricEditModalProps {
  metric: any;
  onSave: (metricData: any) => void;
  onCancel: () => void;
}

const MetricEditModal: React.FC<MetricEditModalProps> = ({ metric, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: metric.name || '',
    unit: metric.unit || '',
    targetRange: metric.targetRange || '',
    frequency: metric.frequency || 'Daily',
    category: metric.category || 'Custom'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.unit) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-10 rounded-2xl border border-surface-20 p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">
            {metric.name ? 'Edit Metric' : 'Add New Metric'}
          </h3>
          <button
            onClick={onCancel}
            className="text-surface-50 hover:text-white"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-50 mb-2">Metric Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg focus:ring-2 focus:ring-primary-0 text-white placeholder-surface-40"
              placeholder="e.g., Blood Pressure, Sleep Hours"
              aria-label="Metric name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-50 mb-2">Unit</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg focus:ring-2 focus:ring-primary-0 text-white placeholder-surface-40"
              placeholder="e.g., mmHg, hours, mg/dL"
              aria-label="Metric unit"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-50 mb-2">Target Range (Optional)</label>
            <input
              type="text"
              value={formData.targetRange}
              onChange={(e) => setFormData({ ...formData, targetRange: e.target.value })}
              className="w-full px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg focus:ring-2 focus:ring-primary-0 text-white placeholder-surface-40"
              placeholder="e.g., 120/80, 7-9, < 100"
              aria-label="Target range"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-50 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg focus:ring-2 focus:ring-primary-0 text-white"
              aria-label="Metric category"
            >
              <option value="Health Marker">Health Marker</option>
              <option value="Wellness">Wellness</option>
              <option value="Activity">Activity</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-50 mb-2">Tracking Frequency</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg focus:ring-2 focus:ring-primary-0 text-white"
              aria-label="Tracking frequency"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="As needed">As needed</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary flex items-center"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center"
            >
              <Save size={16} className="mr-2" />
              {metric.name ? 'Update' : 'Add'} Metric
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Metric Data Entry Modal Component
interface MetricDataEntryModalProps {
  metric: any;
  onClose: () => void;
}

const MetricDataEntryModal: React.FC<MetricDataEntryModalProps> = ({ metric, onClose }) => {
  const [formData, setFormData] = useState({
    value: '',
    date: new Date().toISOString().split('T')[0], // Today's date
    notes: '',
    tags: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.value) {
      const entry: MetricDataEntry = {
        id: Date.now().toString(),
        metricName: metric.name,
        value: formData.value,
        unit: metric.unit,
        date: formData.date,
        notes: formData.notes || undefined,
        tags: formData.tags.length > 0 ? formData.tags : undefined
      };
      
      storage.saveMetricData(entry);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface-10 rounded-2xl border border-surface-20 p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white">Log {metric.name}</h3>
            <p className="text-sm text-surface-50 mt-1">Add a new data point</p>
          </div>
          <button
            onClick={onClose}
            className="text-surface-50 hover:text-white"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-50 mb-2">
              Value ({metric.unit})
            </label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="w-full px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg focus:ring-2 focus:ring-primary-0 text-white placeholder-surface-40"
              placeholder={`Enter ${metric.name.toLowerCase()} value`}
              aria-label="Metric value"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-50 mb-2">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg focus:ring-2 focus:ring-primary-0 text-white"
              aria-label="Entry date"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-50 mb-2">Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg focus:ring-2 focus:ring-primary-0 text-white placeholder-surface-40"
              placeholder="Add any context or notes..."
              rows={3}
              aria-label="Entry notes"
            />
          </div>

          {metric.targetRange && (
            <div className="p-3 bg-primary-0/10 rounded-lg border border-primary-0/20">
              <div className="flex items-center">
                <Target size={16} className="text-primary-0 mr-2" />
                <span className="text-sm text-primary-0 font-medium">Target Range:</span>
                <span className="text-sm text-white ml-2">{metric.targetRange} {metric.unit}</span>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex items-center"
            >
              <X size={16} className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center"
            >
              <Save size={16} className="mr-2" />
              Log Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Profile Edit Form Component
interface ProfileEditFormProps {
  userProfile: UserProfile;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
  onCancel: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ userProfile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: userProfile.name,
    dateOfBirth: userProfile.dateOfBirth,
    sex: userProfile.sex,
    location: userProfile.location,
    energyLevel: userProfile.energyLevel,
    sleepQuality: userProfile.sleepQuality,
    stressLevel: userProfile.stressLevel,
    mentalClarity: userProfile.mentalClarity
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-warm-300 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-warm-300 mb-2">Date of Birth</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent bg-surface-10 text-light"
            required
          />
          <p className="text-xs text-surface-40 mt-1">Age: {calculateAge(formData.dateOfBirth)} years old</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-warm-300 mb-2">Sex</label>
          <select
            value={formData.sex}
            onChange={(e) => setFormData({ ...formData, sex: e.target.value })}
            className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
            required
          >
            <option value="">Select sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-warm-300 mb-2">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
            placeholder="City, Country"
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Wellness Ratings</h4>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-warm-300 mb-2">
              Energy Level: {formData.energyLevel}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.energyLevel}
              onChange={(e) => setFormData({ ...formData, energyLevel: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-300 mb-2">
              Sleep Quality: {formData.sleepQuality}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.sleepQuality}
              onChange={(e) => setFormData({ ...formData, sleepQuality: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-300 mb-2">
              Stress Level: {formData.stressLevel}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.stressLevel}
              onChange={(e) => setFormData({ ...formData, stressLevel: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-warm-300 mb-2">
              Mental Clarity: {formData.mentalClarity}/10
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.mentalClarity}
              onChange={(e) => setFormData({ ...formData, mentalClarity: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary flex items-center"
        >
          <X size={16} className="mr-2" />
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary flex items-center"
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default Profile; 
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
  MapPin
} from 'lucide-react';
import { storage, UserProfile } from '../utils/storage';
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
  const [activeTab, setActiveTab] = useState<'overview' | 'referrals' | 'settings' | 'privacy' | 'data'>('overview');
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
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
                          <p className="text-white text-base">{userProfile.age} years old</p>
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
                          {userProfile.primaryIssues.length}
                        </div>
                        <div className="text-sm text-warm-300">Focus Areas</div>
                      </div>
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
    age: userProfile.age,
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
          <label className="block text-sm font-medium text-warm-300 mb-2">Age</label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
            min="13"
            max="120"
            required
          />
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
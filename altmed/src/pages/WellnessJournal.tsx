import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, TrendingUp, BookOpen, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { storage, WellnessEntry } from '../utils/storage';
import { demoUserProfile } from '../utils/demoData';
import PlaceholderImage from '../components/PlaceholderImage';

const WellnessJournal: React.FC = () => {
  const [entries, setEntries] = useState<WellnessEntry[]>([]);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [newEntry, setNewEntry] = useState({
    mood: 5,
    energy: 5,
    sleep: 5,
    stress: 5,
    notes: '',
    ritualsCompleted: [] as string[]
  });

  const rituals = [
    'Morning Sun Salutation',
    '4-7-8 Breathing',
    'Lavender Tea',
    'Gratitude Journal',
    'Mindful Walking',
    'Golden Milk',
    'Evening Meditation'
  ];

  const moodEmojis = ['😢', '😕', '😐', '🙂', '😊', '😄', '🤩', '🥰', '😍', '🤗', '😌'];

  useEffect(() => {
    const savedEntries = storage.getWellnessEntries();
    setEntries(savedEntries);
    
    // Check if this is demo mode
    const userProfile = storage.getUserProfile();
    if (userProfile && userProfile.id === demoUserProfile.id) {
      setIsDemoMode(true);
    }
  }, []);

  const handleSaveEntry = () => {
    const entry: WellnessEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      ...newEntry
    };

    storage.saveWellnessEntry(entry);
    setEntries(prev => [...prev, entry]);
    setShowNewEntry(false);
    setNewEntry({
      mood: 5,
      energy: 5,
      sleep: 5,
      stress: 5,
      notes: '',
      ritualsCompleted: []
    });
  };

  const toggleRitual = (ritual: string) => {
    setNewEntry(prev => ({
      ...prev,
      ritualsCompleted: prev.ritualsCompleted.includes(ritual)
        ? prev.ritualsCompleted.filter(r => r !== ritual)
        : [...prev.ritualsCompleted, ritual]
    }));
  };

  const getChartData = () => {
    const last7Days = entries
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 7)
      .reverse();

    return last7Days.map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: entry.mood,
      energy: entry.energy,
      sleep: entry.sleep,
      stress: entry.stress
    }));
  };

  const getTodayEntry = () => {
    return entries.find(entry => entry.date === selectedDate);
  };

  const todayEntry = getTodayEntry();

  return (
    <div className="min-h-screen bg-warm-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Wellness Journal
              </motion.h1>
              <p className="text-warm-300">
                Track your daily wellness journey and celebrate your progress. Share your insights with our community and earn rewards through our referral program.
              </p>
              {isDemoMode && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-lavender-100 to-rose-100 text-electric-400 border border-lavender-200">
                    🎭 Demo Mode
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowNewEntry(true)}
              className="btn-primary flex items-center px-6 py-3"
            >
              <Plus size={20} className="mr-2" />
              New Entry
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Image */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <PlaceholderImage 
              category="meditation" 
              size="large" 
              className="w-full"
              alt="Wellness journal meditation"
            />
          </motion.div>
        </section>

        {/* Date Selector */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                Select Date
              </h2>
              <Calendar size={20} className="text-warm-300" />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all duration-300 text-base"
            />
          </motion.div>
        </section>

        {/* Today's Entry */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-8"
          >
            <h2 className="text-xl font-bold text-white mb-8">
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>

            {todayEntry ? (
              <div className="space-y-6">
                {/* Mood Display */}
                <div className="text-center">
                  <div className="text-6xl mb-2">
                    {moodEmojis[todayEntry.mood - 1]}
                  </div>
                  <p className="text-warm-300">Mood: {todayEntry.mood}/10</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-warm-600/30 rounded-lg">
                    <div className="text-2xl font-bold text-electric-400 mb-1">
                      {todayEntry.energy}
                    </div>
                    <div className="text-sm text-warm-300">Energy</div>
                  </div>
                  <div className="text-center p-4 bg-warm-600/30 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400 mb-1">
                      {todayEntry.sleep}
                    </div>
                    <div className="text-sm text-warm-300">Sleep</div>
                  </div>
                  <div className="text-center p-4 bg-warm-600/30 rounded-lg">
                    <div className="text-2xl font-bold text-lime-400 mb-1">
                      {todayEntry.stress}
                    </div>
                    <div className="text-sm text-warm-300">Stress</div>
                  </div>
                  <div className="text-center p-4 bg-warm-600/30 rounded-lg">
                    <div className="text-2xl font-bold text-warm-300 mb-1">
                      {todayEntry.ritualsCompleted.length}
                    </div>
                    <div className="text-sm text-warm-300">Rituals</div>
                  </div>
                </div>

                {/* Notes */}
                {todayEntry.notes && (
                  <div>
                    <h3 className="font-medium text-white mb-2">Notes:</h3>
                    <p className="text-warm-300 bg-warm-600/30 p-3 rounded-lg">
                      {todayEntry.notes}
                    </p>
                  </div>
                )}

                {/* Completed Rituals */}
                {todayEntry.ritualsCompleted.length > 0 && (
                  <div>
                    <h3 className="font-medium text-white mb-2">Completed Rituals:</h3>
                    <div className="flex flex-wrap gap-2">
                      {todayEntry.ritualsCompleted.map((ritual, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-electric-500/20 text-electric-400"
                        >
                          <CheckCircle size={14} className="mr-1" />
                          {ritual}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen size={48} className="text-warm-400 mx-auto mb-4" />
                <p className="text-warm-300 mb-4">
                  No entry for this date yet.
                </p>
                <button
                  onClick={() => setShowNewEntry(true)}
                  className="btn-primary"
                >
                  Add Entry
                </button>
              </div>
            )}
          </motion.div>
        </section>

        {/* Progress Chart */}
        <section className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-xl font-bold text-white mb-6">
              <TrendingUp size={20} className="inline mr-2" />
              Your Progress (Last 7 Days)
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e3e7e3" />
                  <XAxis dataKey="date" stroke="#5a715a" />
                  <YAxis stroke="#5a715a" domain={[0, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#843dff" strokeWidth={2} />
                  <Line type="monotone" dataKey="energy" stroke="#d8b55a" strokeWidth={2} />
                  <Line type="monotone" dataKey="sleep" stroke="#f43f5e" strokeWidth={2} />
                  <Line type="monotone" dataKey="stress" stroke="#5a715a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </section>

        {/* New Entry Modal */}
        {showNewEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewEntry(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-white mb-6">
                New Journal Entry
              </h2>

              {/* Mood */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-warm-300 mb-3">
                  How are you feeling today?
                </label>
                <div className="flex justify-between items-center">
                  <span className="text-2xl">{moodEmojis[newEntry.mood - 1]}</span>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.mood}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, mood: Number(e.target.value) }))}
                    className="flex-1 mx-4"
                  />
                  <span className="text-sm font-medium text-warm-300">{newEntry.mood}/10</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-warm-300 mb-2">
                    Energy Level
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.energy}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, energy: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-warm-400 mt-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-300 mb-2">
                    Sleep Quality
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.sleep}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, sleep: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-warm-400 mt-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-warm-300 mb-2">
                    Stress Level
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newEntry.stress}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, stress: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-warm-400 mt-1">
                    <span>1</span>
                    <span>10</span>
                  </div>
                </div>
              </div>

              {/* Rituals */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-warm-300 mb-3">
                  Rituals Completed Today
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {rituals.map((ritual) => (
                    <button
                      key={ritual}
                      type="button"
                      onClick={() => toggleRitual(ritual)}
                      className={`p-2 rounded-lg text-sm transition-all ${
                        newEntry.ritualsCompleted.includes(ritual)
                          ? 'bg-electric-500/20 text-electric-400 border-lavender-300'
                          : 'bg-warm-600/30 text-warm-300 border-sage-200 hover:bg-warm-700/50'
                      } border`}
                    >
                      {ritual}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-warm-300 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="How was your day? Any insights or observations?"
                  className="w-full p-3 border border-sage-200 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNewEntry(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEntry}
                  className="flex-1 btn-primary"
                >
                  Save Entry
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WellnessJournal; 
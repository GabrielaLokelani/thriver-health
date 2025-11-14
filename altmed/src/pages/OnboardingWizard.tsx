import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  Loader, 
  ChevronRight,
  Heart,
  Edit3,
  Check,
  X,
  FileText,
  Pill,
  Activity,
  Target,
  Calendar
} from 'lucide-react';
import { storage, UserProfile } from '../utils/storage';

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'welcome' | 'journal' | 'processing' | 'review' | 'complete'>('welcome');
  const [journalEntry, setJournalEntry] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Extracted data from AI analysis
  const [extractedData, setExtractedData] = useState<{
    name: string;
    age: string;
    diagnosis: {
      condition: string;
      diagnosisDate?: string;
      symptoms: string[];
    };
    medications: Array<{ name: string; dosage: string; frequency: string }>;
    treatments: Array<{ name: string; type: string; dosage?: string; frequency: string }>;
    goals: {
      shortTerm: string[];
      longTerm: string;
    };
    lifestyle: {
      diet: string;
      movement: string;
      digitalUsage: string;
    };
    trackingMetrics: Array<{ name: string; unit: string; targetRange?: string; frequency: string; category: string }>;
    summary: string;
    keyInsights: string[];
  }>({
    name: '',
    age: '',
    diagnosis: { condition: '', symptoms: [] },
    medications: [],
    treatments: [],
    goals: { shortTerm: [], longTerm: '' },
    lifestyle: { diet: '', movement: '', digitalUsage: '' },
    trackingMetrics: [],
    summary: '',
    keyInsights: []
  });

  const [editingField, setEditingField] = useState<string | null>(null);

  // Mock AI processing - In production, this would call your AI backend
  const processJournalEntry = async () => {
    setIsProcessing(true);
    setStep('processing');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock AI extraction - this would be real AI analysis in production
    const mockExtraction = {
      name: 'John Smith',
      age: '58',
      diagnosis: {
        condition: 'Prostate Cancer',
        diagnosisDate: '2024-03',
        symptoms: ['Fatigue', 'Sleep Issues', 'Anxiety']
      },
      medications: [
        { name: 'Fenbendazole', dosage: '222mg', frequency: 'Daily' },
        { name: 'Ivermectin', dosage: '12mg', frequency: 'Weekly' }
      ],
      treatments: [
        { name: 'Vitamin D', type: 'Supplement', dosage: '5000 IU', frequency: 'Daily' },
        { name: 'Curcumin', type: 'Supplement', dosage: '500mg', frequency: 'Twice daily' }
      ],
      goals: {
        shortTerm: ['Reduce PSA levels', 'Improve energy', 'Better sleep quality'],
        longTerm: 'Achieve remission and maintain optimal health through integrative protocols'
      },
      lifestyle: {
        diet: 'Ketogenic with intermittent fasting',
        movement: 'Walking, light weights, meditation',
        digitalUsage: 'Moderate'
      },
      trackingMetrics: [
        { name: 'PSA Level', unit: 'ng/mL', targetRange: '< 4.0', frequency: 'Monthly', category: 'Health Marker' },
        { name: 'Energy Level', unit: '1-10 scale', targetRange: '7-10', frequency: 'Daily', category: 'Wellness' },
        { name: 'Sleep Quality', unit: 'hours', targetRange: '7-9', frequency: 'Daily', category: 'Wellness' }
      ],
      summary: 'You were diagnosed with prostate cancer in March 2024 and are pursuing an integrative approach combining conventional monitoring with alternative protocols. You\'re following a ketogenic diet with intermittent fasting, taking Fenbendazole and Ivermectin, along with vitamin D and curcumin supplements. Your main focus is reducing PSA levels while improving overall energy and sleep quality.',
      keyInsights: [
        'Primary diagnosis: Prostate Cancer (diagnosed March 2024)',
        'Following integrative protocol with Fenbendazole & Ivermectin',
        'Ketogenic diet with intermittent fasting',
        'Tracking PSA levels monthly',
        'Focus on improving energy and sleep quality'
      ]
    };

    setExtractedData(mockExtraction);
    setIsProcessing(false);
    setStep('review');
  };

  const startRecording = () => {
    // In production, implement Web Speech API or similar
    setIsRecording(true);
    alert('Voice recording feature coming soon! For now, please type your story.');
    setIsRecording(false);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const saveProfile = () => {
    // Calculate birth year from age
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - parseInt(extractedData.age || '30');
    const dateOfBirth = `${birthYear}-01-01`;

    const newProfile: UserProfile = {
      id: Date.now().toString(),
      name: extractedData.name,
      dateOfBirth: dateOfBirth,
      sex: 'Not specified',
      location: 'Not specified',
      energyLevel: 5,
      sleepQuality: 5,
      stressLevel: 5,
      mentalClarity: 5,
      lifestyle: extractedData.lifestyle,
      diagnosis: {
        condition: extractedData.diagnosis.condition,
        symptoms: extractedData.diagnosis.symptoms,
        diagnosisDate: extractedData.diagnosis.diagnosisDate
      },
      medications: extractedData.medications,
      treatments: extractedData.treatments,
      conventionalTreatments: [],
      trackingMetrics: extractedData.trackingMetrics,
      customNotes: journalEntry,
      goals: extractedData.goals,
      beliefs: {
        alignment: 'both',
        modalities: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    storage.saveUserProfile(newProfile);
    
    // Save the journal entry as a wellness entry
    storage.saveWellnessEntry({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      energy: 5,
      sleep: 5,
      stress: 5,
      mood: 5,
      ritualsCompleted: [],
      notes: journalEntry
    });

    setStep('complete');
    
    // Navigate to dashboard after a short delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const updateExtractedField = (field: string, value: any) => {
    setExtractedData(prev => ({
      ...prev,
      [field]: value
    }));
    setEditingField(null);
  };

  return (
    <div className="min-h-screen bg-surface-0 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-surface-10 rounded-3xl border border-surface-20/50 p-8 md:p-12 shadow-strong text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-primary-0 to-primary-10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-0/30">
                <Heart size={40} className="text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">
                Welcome to Thriver Health
              </h1>
              <p className="text-xl text-surface-50 mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's start your journey together. Share your story with us - tell us about your diagnosis, 
                what you're experiencing, and what you hope to achieve.
              </p>
              <div className="bg-surface-20/50 border border-surface-30/30 rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold text-white mb-3">You can share:</h3>
                <ul className="text-left text-surface-50 space-y-2">
                  <li className="flex items-start">
                    <Check size={20} className="text-success-10 mr-3 flex-shrink-0 mt-0.5" />
                    <span>Your diagnosis and when you received it</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={20} className="text-success-10 mr-3 flex-shrink-0 mt-0.5" />
                    <span>Symptoms you're experiencing</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={20} className="text-success-10 mr-3 flex-shrink-0 mt-0.5" />
                    <span>Current treatments and medications</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={20} className="text-success-10 mr-3 flex-shrink-0 mt-0.5" />
                    <span>Your lifestyle and daily routine</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={20} className="text-success-10 mr-3 flex-shrink-0 mt-0.5" />
                    <span>What you want to achieve with your health</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setStep('journal')}
                className="btn-primary btn-lg inline-flex items-center"
              >
                Begin Your Story
                <ChevronRight size={24} className="ml-2" />
              </button>
              <p className="text-sm text-surface-50 mt-6">
                Our AI will help organize and understand your journey
              </p>
            </motion.div>
          )}

          {/* Journal Entry Step */}
          {step === 'journal' && (
            <motion.div
              key="journal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-surface-10 rounded-3xl border border-surface-20/50 p-6 md:p-8 shadow-strong"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white font-display">Tell Your Story</h2>
                  <p className="text-surface-50 mt-2">Share as much or as little as you'd like</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`p-3 rounded-xl transition-all ${
                      isRecording
                        ? 'bg-danger-10 hover:bg-danger-0 text-black animate-pulse'
                        : 'bg-surface-20 hover:bg-surface-30 text-primary-0 border border-surface-30'
                    }`}
                    aria-label={isRecording ? 'Stop recording' : 'Start voice recording'}
                  >
                    {isRecording ? <MicOff size={24} /> : <Mic size={24} />}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <textarea
                  ref={textareaRef}
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  placeholder="Example: I'm John, 58 years old. I was diagnosed with prostate cancer in March 2024. My PSA was elevated at 12.5. I've been experiencing fatigue and some sleep issues. I'm currently taking Fenbendazole 222mg daily and Ivermectin 12mg weekly, along with vitamin D and curcumin. I'm following a ketogenic diet with intermittent fasting. My main goals are to reduce my PSA levels and improve my overall energy. I want to track my PSA monthly and see if this integrative approach can help me achieve remission..."
                  className="w-full h-96 px-5 py-4 bg-surface-0 border-2 border-surface-30 rounded-2xl focus:ring-2 focus:ring-primary-0 focus:border-primary-0 text-white placeholder-surface-40 resize-none leading-relaxed"
                />
                <div className="flex items-center justify-between mt-3 px-1">
                  <p className="text-xs text-surface-50">
                    Write freely - our AI will help organize your information
                  </p>
                  <span className="text-xs text-surface-40 font-tech">{journalEntry.length} characters</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('welcome')}
                  className="btn-secondary flex items-center"
                >
                  Back
                </button>
                <button
                  onClick={processJournalEntry}
                  disabled={journalEntry.length < 50}
                  className="btn-primary flex-1 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles size={20} className="mr-2" />
                  Let AI Analyze My Story
                </button>
              </div>
            </motion.div>
          )}

          {/* Processing Step */}
          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-10 rounded-3xl border border-surface-20/50 p-12 shadow-strong text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary-0 to-primary-10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-0/30 animate-pulse">
                <Sparkles size={48} className="text-black" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 font-display">
                Analyzing Your Story
              </h2>
              <p className="text-xl text-surface-50 mb-8">
                Our AI is reading your story and extracting key health information...
              </p>
              <div className="flex items-center justify-center gap-2">
                <Loader size={24} className="text-primary-0 animate-spin" />
                <span className="text-surface-50">This will take just a moment</span>
              </div>
            </motion.div>
          )}

          {/* Review Step */}
          {step === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-surface-10 rounded-3xl border border-surface-20/50 p-6 md:p-8 shadow-strong"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-3 font-display">Review Your Health Profile</h2>
                <p className="text-surface-50">
                  Here's what our AI extracted from your story. Click <Edit3 size={14} className="inline mx-1" /> to edit any information.
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {/* AI Summary */}
                <div className="bg-gradient-to-r from-primary-0/10 to-success-10/10 border-l-4 border-primary-0 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles size={20} className="text-primary-0 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">AI Summary</h3>
                      <p className="text-surface-50 leading-relaxed">{extractedData.summary}</p>
                    </div>
                  </div>
                </div>

                {/* Key Insights */}
                <div className="bg-surface-20/50 rounded-xl p-5 border border-surface-30/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <FileText size={20} className="mr-2 text-info-10" />
                    Key Insights
                  </h3>
                  <ul className="space-y-2">
                    {extractedData.keyInsights.map((insight, idx) => (
                      <li key={idx} className="flex items-start text-surface-50">
                        <Check size={16} className="text-success-10 mr-3 flex-shrink-0 mt-1" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Basic Info */}
                <div className="bg-surface-20/50 rounded-xl p-5 border border-surface-30/30">
                  <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-surface-50 block mb-1">Name</label>
                      <div className="flex items-center gap-2">
                        {editingField === 'name' ? (
                          <input
                            type="text"
                            value={extractedData.name}
                            onChange={(e) => setExtractedData({...extractedData, name: e.target.value})}
                            className="flex-1 px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg text-white"
                            onBlur={() => setEditingField(null)}
                            autoFocus
                            aria-label="Edit name"
                          />
                        ) : (
                          <>
                            <span className="text-white font-medium flex-1">{extractedData.name}</span>
                            <button
                              onClick={() => setEditingField('name')}
                              className="p-1.5 hover:bg-surface-30 rounded text-surface-50 hover:text-white"
                              aria-label="Edit name"
                            >
                              <Edit3 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-surface-50 block mb-1">Age</label>
                      <div className="flex items-center gap-2">
                        {editingField === 'age' ? (
                          <input
                            type="text"
                            value={extractedData.age}
                            onChange={(e) => setExtractedData({...extractedData, age: e.target.value})}
                            className="flex-1 px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg text-white"
                            onBlur={() => setEditingField(null)}
                            autoFocus
                            aria-label="Edit age"
                          />
                        ) : (
                          <>
                            <span className="text-white font-medium flex-1">{extractedData.age} years old</span>
                            <button
                              onClick={() => setEditingField('age')}
                              className="p-1.5 hover:bg-surface-30 rounded text-surface-50 hover:text-white"
                              aria-label="Edit age"
                            >
                              <Edit3 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="bg-surface-20/50 rounded-xl p-5 border border-surface-30/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Activity size={20} className="mr-2 text-danger-10" />
                    Diagnosis
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-surface-50 block mb-1">Condition</label>
                      <span className="text-white font-medium">{extractedData.diagnosis.condition}</span>
                    </div>
                    <div>
                      <label className="text-sm text-surface-50 block mb-1">Symptoms</label>
                      <div className="flex flex-wrap gap-2">
                        {extractedData.diagnosis.symptoms.map((symptom, idx) => (
                          <span key={idx} className="px-3 py-1 bg-danger-10/20 text-danger-10 rounded-full text-sm border border-danger-10/30">
                            {symptom}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medications */}
                {extractedData.medications.length > 0 && (
                  <div className="bg-surface-20/50 rounded-xl p-5 border border-surface-30/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Pill size={20} className="mr-2 text-success-10" />
                      Medications
                    </h3>
                    <div className="space-y-2">
                      {extractedData.medications.map((med, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-surface-10 rounded-lg">
                          <div>
                            <span className="text-white font-medium">{med.name}</span>
                            <span className="text-surface-50 text-sm ml-2">- {med.dosage}</span>
                          </div>
                          <span className="text-surface-50 text-sm">{med.frequency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Treatments */}
                {extractedData.treatments.length > 0 && (
                  <div className="bg-surface-20/50 rounded-xl p-5 border border-surface-30/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Target size={20} className="mr-2 text-info-10" />
                      Alternative Treatments
                    </h3>
                    <div className="space-y-2">
                      {extractedData.treatments.map((treatment, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-surface-10 rounded-lg">
                          <div>
                            <span className="text-white font-medium">{treatment.name}</span>
                            {treatment.dosage && <span className="text-surface-50 text-sm ml-2">- {treatment.dosage}</span>}
                          </div>
                          <span className="text-surface-50 text-sm">{treatment.frequency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tracking Metrics */}
                {extractedData.trackingMetrics.length > 0 && (
                  <div className="bg-surface-20/50 rounded-xl p-5 border border-surface-30/30">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                      <Calendar size={20} className="mr-2 text-warning-10" />
                      Tracking Metrics
                    </h3>
                    <div className="space-y-2">
                      {extractedData.trackingMetrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-surface-10 rounded-lg">
                          <div>
                            <span className="text-white font-medium">{metric.name}</span>
                            <span className="text-surface-50 text-sm ml-2">({metric.unit})</span>
                            {metric.targetRange && (
                              <span className="text-warning-10 text-sm ml-2">Target: {metric.targetRange}</span>
                            )}
                          </div>
                          <span className="text-surface-50 text-sm">{metric.frequency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Goals */}
                <div className="bg-surface-20/50 rounded-xl p-5 border border-surface-30/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <Target size={20} className="mr-2 text-primary-0" />
                    Your Goals
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-surface-50 block mb-2">Short-term Goals</label>
                      <ul className="space-y-1">
                        {extractedData.goals.shortTerm.map((goal, idx) => (
                          <li key={idx} className="flex items-start text-white">
                            <Check size={16} className="text-primary-0 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <label className="text-sm text-surface-50 block mb-1">Long-term Vision</label>
                      <p className="text-white">{extractedData.goals.longTerm}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('journal')}
                  className="btn-secondary flex items-center"
                >
                  <Edit3 size={18} className="mr-2" />
                  Edit Story
                </button>
                <button
                  onClick={saveProfile}
                  className="btn-primary flex-1 flex items-center justify-center"
                >
                  <Check size={20} className="mr-2" />
                  Confirm & Continue
                </button>
              </div>
            </motion.div>
          )}

          {/* Complete Step */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface-10 rounded-3xl border border-surface-20/50 p-12 shadow-strong text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-success-10 to-success-0 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-success-10/30">
                <Check size={56} className="text-black" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4 font-display">
                Welcome to Your Journey!
              </h2>
              <p className="text-xl text-surface-50 mb-6">
                Your health profile has been created. Let's start thriving together.
              </p>
              <div className="inline-block bg-primary-0/20 border border-primary-0/30 px-6 py-3 rounded-full">
                <span className="text-primary-0 font-semibold">Redirecting to your dashboard...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingWizard;

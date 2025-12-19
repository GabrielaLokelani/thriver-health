import React, { useState, useRef, useEffect } from 'react';
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
  Calendar,
  Plus,
  MapPin,
  User
} from 'lucide-react';
import { UserProfile } from '../utils/storage';
import { profileService, wellnessService } from '../services/dataService';

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
    sex: string;
    location: string;
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
    sex: '',
    location: '',
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

  // Load stored name from signup form on mount
  useEffect(() => {
    const storedName = localStorage.getItem('altmed_pending_user_name');
    if (storedName) {
      setExtractedData(prev => ({
        ...prev,
        name: storedName
      }));
    }
  }, []);

  // Process journal entry - extract data from user's story
  const processJournalEntry = async () => {
    setIsProcessing(true);
    setStep('processing');

    // Simulate API call delay (in production, this would call your AI backend)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Basic text extraction from journal entry
    const text = journalEntry.toLowerCase();
    const extracted: typeof extractedData = {
      name: '',
      age: '',
      sex: '',
      location: '',
      diagnosis: {
        condition: '',
        diagnosisDate: undefined,
        symptoms: []
      },
      medications: [],
      treatments: [],
      goals: {
        shortTerm: [],
        longTerm: ''
      },
      lifestyle: {
        diet: '',
        movement: '',
        digitalUsage: ''
      },
      trackingMetrics: [],
      summary: journalEntry || 'No summary available',
      keyInsights: []
    };

    // Use stored name from signup form if available, otherwise extract from journal entry
    const storedName = localStorage.getItem('altmed_pending_user_name');
    if (storedName) {
      extracted.name = storedName;
    } else {
      // Extract name (look for "I'm [name]" or "My name is [name]")
      const nameMatch = journalEntry.match(/(?:I'?m|my name is|I am)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
      if (nameMatch) {
        extracted.name = nameMatch[1];
      }
    }

    // Extract age (look for "X years old" or "age X")
    const ageMatch = journalEntry.match(/(\d+)\s*(?:years?\s*old|age)/i);
    if (ageMatch) {
      extracted.age = ageMatch[1];
    }

    // Extract diagnosis/condition (look for "diagnosed with", "have", "suffering from")
    const diagnosisMatch = journalEntry.match(/(?:diagnosed with|have|suffering from|condition is)\s+([^.,!?]+)/i);
    if (diagnosisMatch) {
      extracted.diagnosis.condition = diagnosisMatch[1].trim();
    }

    // Extract diagnosis date
    const dateMatch = journalEntry.match(/(?:diagnosed|found|discovered).*?(?:in|on)\s+(\d{4}(?:-\d{2})?)/i);
    if (dateMatch) {
      extracted.diagnosis.diagnosisDate = dateMatch[1];
    }

    // Extract symptoms (look for common symptom keywords)
    const symptomKeywords = ['fatigue', 'pain', 'anxiety', 'depression', 'sleep', 'nausea', 'headache', 'dizziness', 'weakness', 'tired', 'ache'];
    symptomKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        const symptom = keyword.charAt(0).toUpperCase() + keyword.slice(1);
        if (!extracted.diagnosis.symptoms.includes(symptom)) {
          extracted.diagnosis.symptoms.push(symptom);
        }
      }
    });

    // Extract medications (look for medication patterns)
    const medPattern = /(?:taking|on|using)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*(\d+[a-z]+)?/gi;
    let medMatch;
    while ((medMatch = medPattern.exec(journalEntry)) !== null && extracted.medications.length < 10) {
      extracted.medications.push({
        name: medMatch[1],
        dosage: medMatch[2] || '',
        frequency: 'Daily'
      });
    }

    // Extract treatments/supplements
    const treatmentKeywords = ['vitamin', 'supplement', 'curcumin', 'turmeric', 'omega', 'probiotic', 'magnesium', 'zinc'];
    treatmentKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        const treatmentName = keyword.charAt(0).toUpperCase() + keyword.slice(1);
        if (!extracted.treatments.some(t => t.name.toLowerCase().includes(keyword))) {
          extracted.treatments.push({
            name: treatmentName,
            type: 'Supplement',
            dosage: '',
            frequency: 'Daily'
          });
        }
      }
    });

    // Extract diet information
    const dietKeywords = ['keto', 'ketogenic', 'vegan', 'vegetarian', 'paleo', 'mediterranean', 'fasting', 'intermittent'];
    dietKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        extracted.lifestyle.diet = keyword.charAt(0).toUpperCase() + keyword.slice(1);
      }
    });

    // Extract movement/exercise
    const movementKeywords = ['walking', 'running', 'yoga', 'meditation', 'exercise', 'workout', 'gym', 'weights'];
    movementKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        if (!extracted.lifestyle.movement) {
          extracted.lifestyle.movement = keyword.charAt(0).toUpperCase() + keyword.slice(1);
        } else {
          extracted.lifestyle.movement += ', ' + keyword.charAt(0).toUpperCase() + keyword.slice(1);
        }
      }
    });

    // Extract goals (look for "goal", "want to", "hope to", "aim to")
    const goalPattern = /(?:goal|want to|hope to|aim to|trying to)\s+([^.,!?]+)/gi;
    let goalMatch;
    while ((goalMatch = goalPattern.exec(journalEntry)) !== null && extracted.goals.shortTerm.length < 5) {
      const goal = goalMatch[1].trim();
      if (goal.length > 5) {
        extracted.goals.shortTerm.push(goal);
      }
    }

    // Extract tracking metrics (look for "track", "monitor", "PSA", "blood", etc.)
    const metricKeywords = ['psa', 'blood pressure', 'blood sugar', 'glucose', 'cholesterol', 'weight', 'energy', 'sleep'];
    metricKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        extracted.trackingMetrics.push({
          name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
          unit: keyword === 'psa' ? 'ng/mL' : keyword === 'blood pressure' ? 'mmHg' : '',
          targetRange: '',
          frequency: 'Monthly',
          category: 'Health Marker'
        });
      }
    });

    // Generate key insights from the text
    if (extracted.diagnosis.condition) {
      extracted.keyInsights.push(`Primary diagnosis: ${extracted.diagnosis.condition}`);
    }
    if (extracted.medications.length > 0) {
      extracted.keyInsights.push(`Currently taking ${extracted.medications.length} medication(s)`);
    }
    if (extracted.lifestyle.diet) {
      extracted.keyInsights.push(`Following ${extracted.lifestyle.diet} diet`);
    }

    setExtractedData(extracted);
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

  const saveProfile = async () => {
    // Calculate birth year from age
    const currentYear = new Date().getFullYear();
    const birthYear = currentYear - parseInt(extractedData.age || '30');
    const dateOfBirth = `${birthYear}-01-01`;

    const newProfile: UserProfile = {
      id: Date.now().toString(),
      name: extractedData.name || 'User',
      dateOfBirth: dateOfBirth,
      sex: extractedData.sex || 'Not specified',
      location: extractedData.location || 'Not specified',
      energyLevel: 5,
      sleepQuality: 5,
      stressLevel: 5,
      mentalClarity: 5,
      lifestyle: {
        diet: extractedData.lifestyle.diet || 'Not specified',
        movement: extractedData.lifestyle.movement || 'Not specified',
        digitalUsage: extractedData.lifestyle.digitalUsage || 'Not specified'
      },
      diagnosis: {
        condition: extractedData.diagnosis.condition || 'Not specified',
        symptoms: extractedData.diagnosis.symptoms || [],
        diagnosisDate: extractedData.diagnosis.diagnosisDate
      },
      medications: extractedData.medications || [],
      treatments: extractedData.treatments || [],
      conventionalTreatments: [],
      trackingMetrics: extractedData.trackingMetrics || [],
      customNotes: journalEntry,
      goals: {
        shortTerm: extractedData.goals.shortTerm || [],
        longTerm: extractedData.goals.longTerm || ''
      },
      beliefs: {
        alignment: 'both',
        modalities: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await profileService.save(newProfile);
    
    // Save the journal entry as a wellness entry
    await wellnessService.create({
      id: Date.now().toString(),
      date: new Date().toISOString(),
      energy: 5,
      sleep: 5,
      stress: 5,
      mood: 5,
      ritualsCompleted: [],
      notes: journalEntry
    });

    // Clean up stored name now that profile is saved
    localStorage.removeItem('altmed_pending_user_name');

    // Mark onboarding as completed
    localStorage.setItem('altmed_onboarding_completed', 'true');
    localStorage.setItem('altmed_first_entry_completed', 'true');
    
    setStep('complete');
    
    // Navigate to dashboard after a short delay (user already told their story in onboarding)
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

  const addMedication = () => {
    setExtractedData(prev => ({
      ...prev,
      medications: [...prev.medications, { name: '', dosage: '', frequency: 'Daily' }]
    }));
  };

  const updateMedication = (index: number, field: string, value: string) => {
    setExtractedData(prev => ({
      ...prev,
      medications: prev.medications.map((med, idx) => 
        idx === index ? { ...med, [field]: value } : med
      )
    }));
  };

  const removeMedication = (index: number) => {
    setExtractedData(prev => ({
      ...prev,
      medications: prev.medications.filter((_, idx) => idx !== index)
    }));
  };

  const addTreatment = () => {
    setExtractedData(prev => ({
      ...prev,
      treatments: [...prev.treatments, { name: '', type: 'Supplement', dosage: '', frequency: 'Daily' }]
    }));
  };

  const updateTreatment = (index: number, field: string, value: string) => {
    setExtractedData(prev => ({
      ...prev,
      treatments: prev.treatments.map((treatment, idx) => 
        idx === index ? { ...treatment, [field]: value } : treatment
      )
    }));
  };

  const removeTreatment = (index: number) => {
    setExtractedData(prev => ({
      ...prev,
      treatments: prev.treatments.filter((_, idx) => idx !== index)
    }));
  };

  const addSymptom = () => {
    setExtractedData(prev => ({
      ...prev,
      diagnosis: {
        ...prev.diagnosis,
        symptoms: [...prev.diagnosis.symptoms, '']
      }
    }));
  };

  const updateSymptom = (index: number, value: string) => {
    setExtractedData(prev => ({
      ...prev,
      diagnosis: {
        ...prev.diagnosis,
        symptoms: prev.diagnosis.symptoms.map((symptom, idx) => 
          idx === index ? value : symptom
        )
      }
    }));
  };

  const removeSymptom = (index: number) => {
    setExtractedData(prev => ({
      ...prev,
      diagnosis: {
        ...prev.diagnosis,
        symptoms: prev.diagnosis.symptoms.filter((_, idx) => idx !== index)
      }
    }));
  };

  const addTrackingMetric = () => {
    setExtractedData(prev => ({
      ...prev,
      trackingMetrics: [...prev.trackingMetrics, { 
        name: '', 
        unit: '', 
        targetRange: '', 
        frequency: 'Daily',
        category: 'Wellness'
      }]
    }));
  };

  const updateTrackingMetric = (index: number, field: string, value: string) => {
    setExtractedData(prev => ({
      ...prev,
      trackingMetrics: prev.trackingMetrics.map((metric, idx) => 
        idx === index ? { ...metric, [field]: value } : metric
      )
    }));
  };

  const removeTrackingMetric = (index: number) => {
    setExtractedData(prev => ({
      ...prev,
      trackingMetrics: prev.trackingMetrics.filter((_, idx) => idx !== index)
    }));
  };

  const addShortTermGoal = () => {
    setExtractedData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        shortTerm: [...prev.goals.shortTerm, '']
      }
    }));
  };

  const updateShortTermGoal = (index: number, value: string) => {
    setExtractedData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        shortTerm: prev.goals.shortTerm.map((goal, idx) => 
          idx === index ? value : goal
        )
      }
    }));
  };

  const removeShortTermGoal = (index: number) => {
    setExtractedData(prev => ({
      ...prev,
      goals: {
        ...prev.goals,
        shortTerm: prev.goals.shortTerm.filter((_, idx) => idx !== index)
      }
    }));
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 20%, rgba(255, 132, 0, 0.1) 0%, transparent 50%), linear-gradient(180deg, #000 0%, #0a0a0a 100%)'
      }}
    >
      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">
          {/* Welcome Step */}
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-3xl p-8 md:p-12 text-center"
              style={{
                background: 'linear-gradient(145deg, #111111 0%, #0a0a0a 100%)',
                border: '1px solid rgba(255, 132, 0, 0.15)',
                boxShadow: '0 0 80px rgba(255, 132, 0, 0.08), 0 25px 50px -12px rgba(0, 0, 0, 0.8)'
              }}
            >
              <div 
                className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                style={{
                  background: 'linear-gradient(135deg, #ff8400, #ff6b00)',
                  boxShadow: '0 0 60px rgba(255, 132, 0, 0.5), 0 8px 30px rgba(255, 132, 0, 0.4)'
                }}
              >
                <Heart size={40} className="text-black" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Welcome to{' '}
                <span style={{ background: 'linear-gradient(90deg, #ff8400, #ffae66)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Thriver Health
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Let's start your journey together. Share your story with us - tell us about your diagnosis, 
                what you're experiencing, and what you hope to achieve.
              </p>
              <div 
                className="rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
                style={{
                  background: 'rgba(255, 132, 0, 0.05)',
                  border: '1px solid rgba(255, 132, 0, 0.15)'
                }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">You can share:</h3>
                <ul className="text-left text-gray-400 space-y-2">
                  <li className="flex items-start">
                    <Check size={20} className="mr-3 flex-shrink-0 mt-0.5" style={{ color: '#47d5a6' }} />
                    <span>Your diagnosis and when you received it</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={20} className="mr-3 flex-shrink-0 mt-0.5" style={{ color: '#47d5a6' }} />
                    <span>Symptoms you're experiencing</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={20} className="mr-3 flex-shrink-0 mt-0.5" style={{ color: '#47d5a6' }} />
                    <span>Current treatments and medications</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={20} className="mr-3 flex-shrink-0 mt-0.5" style={{ color: '#47d5a6' }} />
                    <span>Your lifestyle and daily routine</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={20} className="mr-3 flex-shrink-0 mt-0.5" style={{ color: '#47d5a6' }} />
                    <span>What you want to achieve with your health</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setStep('journal')}
                className="btn-glow text-lg inline-flex items-center"
              >
                Begin Your Story
                <ChevronRight size={24} className="ml-2" />
              </button>
              <p className="text-sm text-gray-500 mt-6 font-mono tracking-wider">
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
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <User size={20} className="mr-2 text-primary-0" />
                    Basic Information
                  </h3>
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
                            <span className="text-white font-medium flex-1">{extractedData.name || 'Not provided'}</span>
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
                            <span className="text-white font-medium flex-1">{extractedData.age ? `${extractedData.age} years old` : 'Not provided'}</span>
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
                    <div>
                      <label className="text-sm text-surface-50 block mb-1">Sex</label>
                      <div className="flex items-center gap-2">
                        {editingField === 'sex' ? (
                          <select
                            value={extractedData.sex}
                            onChange={(e) => {
                              setExtractedData({...extractedData, sex: e.target.value});
                              setEditingField(null);
                            }}
                            className="flex-1 px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg text-white"
                            autoFocus
                            aria-label="Edit sex"
                          >
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                            <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                        ) : (
                          <>
                            <span className="text-white font-medium flex-1">{extractedData.sex || 'Not provided'}</span>
                            <button
                              onClick={() => setEditingField('sex')}
                              className="p-1.5 hover:bg-surface-30 rounded text-surface-50 hover:text-white"
                              aria-label="Edit sex"
                            >
                              <Edit3 size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-surface-50 block mb-1 flex items-center">
                        <MapPin size={14} className="mr-1" />
                        Location
                      </label>
                      <div className="flex items-center gap-2">
                        {editingField === 'location' ? (
                          <input
                            type="text"
                            value={extractedData.location}
                            onChange={(e) => setExtractedData({...extractedData, location: e.target.value})}
                            className="flex-1 px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg text-white"
                            onBlur={() => setEditingField(null)}
                            autoFocus
                            placeholder="City, State/Country"
                            aria-label="Edit location"
                          />
                        ) : (
                          <>
                            <span className="text-white font-medium flex-1">{extractedData.location || 'Not provided'}</span>
                            <button
                              onClick={() => setEditingField('location')}
                              className="p-1.5 hover:bg-surface-30 rounded text-surface-50 hover:text-white"
                              aria-label="Edit location"
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
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Activity size={20} className="mr-2 text-danger-10" />
                      Diagnosis
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-surface-50 block mb-1">Condition</label>
                      {editingField === 'diagnosis.condition' ? (
                        <input
                          type="text"
                          value={extractedData.diagnosis.condition}
                          onChange={(e) => setExtractedData({
                            ...extractedData,
                            diagnosis: { ...extractedData.diagnosis, condition: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg text-white"
                          onBlur={() => setEditingField(null)}
                          autoFocus
                          placeholder="Enter condition"
                          aria-label="Edit diagnosis condition"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium flex-1">{extractedData.diagnosis.condition || 'Not specified'}</span>
                          <button
                            onClick={() => setEditingField('diagnosis.condition')}
                            className="p-1.5 hover:bg-surface-30 rounded text-surface-50 hover:text-white"
                            aria-label="Edit condition"
                          >
                            <Edit3 size={14} />
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-surface-50">Symptoms</label>
                        <button
                          onClick={addSymptom}
                          className="text-xs text-primary-0 hover:text-primary-10 flex items-center gap-1"
                        >
                          <Plus size={14} />
                          Add Symptom
                        </button>
                      </div>
                      {extractedData.diagnosis.symptoms.length === 0 ? (
                        <p className="text-sm text-surface-40 italic">No symptoms added yet. Click "Add Symptom" to add one.</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {extractedData.diagnosis.symptoms.map((symptom, idx) => (
                            <div key={idx} className="flex items-center gap-1 px-3 py-1 bg-danger-10/20 text-danger-10 rounded-full text-sm border border-danger-10/30">
                              {editingField === `symptom-${idx}` ? (
                                <input
                                  type="text"
                                  value={symptom}
                                  onChange={(e) => updateSymptom(idx, e.target.value)}
                                  className="bg-transparent border-none outline-none text-danger-10 w-24"
                                  onBlur={() => setEditingField(null)}
                                  autoFocus
                                  placeholder="Symptom name"
                                  aria-label={`Edit symptom ${idx + 1}`}
                                />
                              ) : (
                                <>
                                  <span onClick={() => setEditingField(`symptom-${idx}`)} className="cursor-pointer">{symptom || 'Click to edit'}</span>
                                  <button
                                    onClick={() => removeSymptom(idx)}
                                    className="ml-1 hover:text-danger-0"
                                    aria-label={`Remove symptom ${idx + 1}`}
                                  >
                                    <X size={12} />
                                  </button>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medications */}
                <div className="bg-surface-20/50 rounded-xl p-5 border border-surface-30/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Pill size={20} className="mr-2 text-success-10" />
                      Medications
                    </h3>
                    <button
                      onClick={addMedication}
                      className="text-sm text-success-10 hover:text-success-0 flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add Medication
                    </button>
                  </div>
                  {extractedData.medications.length === 0 ? (
                    <p className="text-sm text-surface-40 italic">No medications added yet. Click "Add Medication" to add one.</p>
                  ) : (
                    <div className="space-y-2">
                      {extractedData.medications.map((med, idx) => (
                        <div key={idx} className="p-3 bg-surface-10 rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 grid grid-cols-3 gap-2">
                              <input
                                type="text"
                                value={med.name}
                                onChange={(e) => updateMedication(idx, 'name', e.target.value)}
                                placeholder="Medication name"
                                className="px-2 py-1 bg-surface-0 border border-surface-30 rounded text-white text-sm"
                              />
                              <input
                                type="text"
                                value={med.dosage}
                                onChange={(e) => updateMedication(idx, 'dosage', e.target.value)}
                                placeholder="Dosage"
                                className="px-2 py-1 bg-surface-0 border border-surface-30 rounded text-white text-sm"
                              />
                              <select
                                value={med.frequency}
                                onChange={(e) => updateMedication(idx, 'frequency', e.target.value)}
                                className="px-2 py-1 bg-surface-0 border border-surface-30 rounded text-white text-sm"
                                aria-label={`Medication ${idx + 1} frequency`}
                              >
                                <option value="Daily">Daily</option>
                                <option value="Twice daily">Twice daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="As needed">As needed</option>
                              </select>
                            </div>
                            <button
                              onClick={() => removeMedication(idx)}
                              className="ml-2 p-1 hover:bg-danger-10/20 rounded text-surface-50 hover:text-danger-10"
                              aria-label={`Remove medication ${idx + 1}`}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Treatments */}
                <div className="bg-surface-20/50 rounded-xl p-5 border border-surface-30/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Target size={20} className="mr-2 text-info-10" />
                      Alternative Treatments
                    </h3>
                    <button
                      onClick={addTreatment}
                      className="text-sm text-info-10 hover:text-info-0 flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add Treatment
                    </button>
                  </div>
                  {extractedData.treatments.length === 0 ? (
                    <p className="text-sm text-surface-40 italic">No treatments added yet. Click "Add Treatment" to add one.</p>
                  ) : (
                    <div className="space-y-2">
                      {extractedData.treatments.map((treatment, idx) => (
                        <div key={idx} className="p-3 bg-surface-10 rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 grid grid-cols-4 gap-2">
                              <input
                                type="text"
                                value={treatment.name}
                                onChange={(e) => updateTreatment(idx, 'name', e.target.value)}
                                placeholder="Treatment name"
                                className="px-2 py-1 bg-surface-0 border border-surface-30 rounded text-white text-sm"
                              />
                              <select
                                value={treatment.type}
                                onChange={(e) => updateTreatment(idx, 'type', e.target.value)}
                                className="px-2 py-1 bg-surface-0 border border-surface-30 rounded text-white text-sm"
                                aria-label={`Treatment ${idx + 1} type`}
                              >
                                <option value="Supplement">Supplement</option>
                                <option value="Therapy">Therapy</option>
                                <option value="Protocol">Protocol</option>
                                <option value="Other">Other</option>
                              </select>
                              <input
                                type="text"
                                value={treatment.dosage || ''}
                                onChange={(e) => updateTreatment(idx, 'dosage', e.target.value)}
                                placeholder="Dosage (optional)"
                                className="px-2 py-1 bg-surface-0 border border-surface-30 rounded text-white text-sm"
                              />
                              <select
                                value={treatment.frequency}
                                onChange={(e) => updateTreatment(idx, 'frequency', e.target.value)}
                                className="px-2 py-1 bg-surface-0 border border-surface-30 rounded text-white text-sm"
                                aria-label={`Treatment ${idx + 1} frequency`}
                              >
                                <option value="Daily">Daily</option>
                                <option value="Twice daily">Twice daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="As needed">As needed</option>
                              </select>
                            </div>
                            <button
                              onClick={() => removeTreatment(idx)}
                              className="ml-2 p-1 hover:bg-danger-10/20 rounded text-surface-50 hover:text-danger-10"
                              aria-label={`Remove treatment ${idx + 1}`}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

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
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm text-surface-50">Short-term Goals</label>
                        <button
                          onClick={addShortTermGoal}
                          className="text-xs text-primary-0 hover:text-primary-10 flex items-center gap-1"
                        >
                          <Plus size={14} />
                          Add Goal
                        </button>
                      </div>
                      {extractedData.goals.shortTerm.length === 0 ? (
                        <p className="text-sm text-surface-40 italic">No short-term goals added yet. Click "Add Goal" to add one.</p>
                      ) : (
                        <ul className="space-y-2">
                          {extractedData.goals.shortTerm.map((goal, idx) => (
                            <li key={idx} className="flex items-center gap-2 p-2 bg-surface-10 rounded-lg">
                              {editingField === `goal-${idx}` ? (
                                <input
                                  type="text"
                                  value={goal}
                                  onChange={(e) => updateShortTermGoal(idx, e.target.value)}
                                  className="flex-1 px-2 py-1 bg-surface-0 border border-surface-30 rounded text-white text-sm"
                                  onBlur={() => setEditingField(null)}
                                  autoFocus
                                  placeholder="Enter goal"
                                  aria-label={`Edit goal ${idx + 1}`}
                                />
                              ) : (
                                <>
                                  <Check size={16} className="text-primary-0 flex-shrink-0" />
                                  <span className="text-white flex-1" onClick={() => setEditingField(`goal-${idx}`)}>{goal || 'Click to edit'}</span>
                                  <button
                                    onClick={() => removeShortTermGoal(idx)}
                                    className="p-1 hover:bg-danger-10/20 rounded text-surface-50 hover:text-danger-10"
                                    aria-label={`Remove goal ${idx + 1}`}
                                  >
                                    <X size={14} />
                                  </button>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <label className="text-sm text-surface-50 block mb-1">Long-term Vision</label>
                      {editingField === 'goals.longTerm' ? (
                        <textarea
                          value={extractedData.goals.longTerm}
                          onChange={(e) => setExtractedData({
                            ...extractedData,
                            goals: { ...extractedData.goals, longTerm: e.target.value }
                          })}
                          className="w-full px-3 py-2 bg-surface-0 border border-surface-30 rounded-lg text-white"
                          onBlur={() => setEditingField(null)}
                          autoFocus
                          placeholder="Enter your long-term vision"
                          rows={3}
                        />
                      ) : (
                        <div className="flex items-start gap-2">
                          <p className="text-white flex-1">{extractedData.goals.longTerm || 'Not specified'}</p>
                          <button
                            onClick={() => setEditingField('goals.longTerm')}
                            className="p-1.5 hover:bg-surface-30 rounded text-surface-50 hover:text-white"
                            aria-label="Edit long-term vision"
                          >
                            <Edit3 size={14} />
                          </button>
                        </div>
                      )}
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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import InputField from '../components/InputField';
import SliderInput from '../components/SliderInput';
import { storage, UserProfile } from '../utils/storage';
import { loadDemoData } from '../utils/demoData';

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    { id: 1, title: 'Profile Info', description: 'Basic information about you' },
    { id: 2, title: 'Current State', description: 'How you\'re feeling today' },
    { id: 3, title: 'Primary Issues', description: 'What you\'d like to address' },
    { id: 4, title: 'Goals', description: 'What you want to achieve' },
    { id: 5, title: 'Beliefs & Preferences', description: 'Your wellness philosophy' }
  ];

  const primaryIssues = [
    'Anxiety', 'Digestion', 'Immunity', 'Focus', 'Fertility', 'Sleep', 'Skin', 'Inflammation'
  ];

  const shortTermGoals = [
    'Better sleep', 'More energy', 'Less stress', 'Clearer mind', 'Better digestion', 'Stronger immunity'
  ];

  const modalities = [
    'Ayurveda', 'Traditional Chinese Medicine', 'Reiki', 'Plant Medicine', 'Meditation', 'Yoga', 'Acupuncture', 'Herbalism'
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    age: Yup.number().min(13, 'Must be at least 13').max(120, 'Invalid age').required('Age is required'),
    sex: Yup.string().required('Please select your sex'),
    location: Yup.string().required('Location is required'),
    energyLevel: Yup.number().required(),
    sleepQuality: Yup.number().required(),
    stressLevel: Yup.number().required(),
    mentalClarity: Yup.number().required(),
    lifestyle: Yup.object({
      diet: Yup.string().optional(),
      movement: Yup.string().optional(),
      digitalUsage: Yup.string().optional()
    }),
    primaryIssues: Yup.array().optional(),
    goals: Yup.object({
      shortTerm: Yup.array().optional(),
      longTerm: Yup.string().optional()
    }),
    beliefs: Yup.object({
      alignment: Yup.string().optional(),
      modalities: Yup.array().optional()
    })
  });

  const initialValues = {
    name: '',
    age: '',
    sex: '',
    location: '',
    photo: '',
    energyLevel: 5,
    sleepQuality: 5,
    stressLevel: 5,
    mentalClarity: 5,
    lifestyle: {
      diet: '',
      movement: '',
      digitalUsage: ''
    },
    primaryIssues: [],
    customNotes: '',
    goals: {
      shortTerm: [],
      longTerm: ''
    },
    beliefs: {
      alignment: '',
      modalities: []
    }
  };

  const handleSubmit = (values: any) => {
    const userProfile: UserProfile = {
      id: Date.now().toString(),
      ...values,
      age: Number(values.age),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    storage.saveUserProfile(userProfile);
    navigate('/dashboard');
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = (values: any, setFieldValue: any, errors: any, touched: any) => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Tell us about yourself</h2>
              <p className="text-lg text-warm-300 leading-relaxed">Let's start with some basic information to personalize your experience.</p>
            </div>
            
            <div className="space-y-6">
              <InputField
                label="Full Name"
                name="name"
                value={values.name}
                onChange={(e) => setFieldValue('name', e.target.value)}
                error={touched.name && errors.name}
                required
              />
              
              <InputField
                label="Age"
                name="age"
                type="number"
                value={values.age}
                onChange={(e) => setFieldValue('age', e.target.value)}
                error={touched.age && errors.age}
                required
              />
              
              <div className="mb-6">
                <label className="block text-base font-medium text-warm-300 mb-4">
                  Sex <span className="text-lime-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['Male', 'Female', 'Non-binary', 'Prefer not to say'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFieldValue('sex', option)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-base font-medium ${
                        values.sex === option
                          ? 'border-lavender-500 bg-electric-500/20 text-electric-400 shadow-lg'
                          : 'border-sage-200 hover:border-sage-300 hover:bg-warm-600/30'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <InputField
                label="Location (City, Country)"
                name="location"
                value={values.location}
                onChange={(e) => setFieldValue('location', e.target.value)}
                error={touched.location && errors.location}
                required
              />
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">How are you feeling?</h2>
              <p className="text-lg text-warm-300 leading-relaxed">Rate your current state on a scale of 1-10.</p>
            </div>
            
            <div className="space-y-8">
              <SliderInput
                label="Energy Level"
                name="energyLevel"
                value={values.energyLevel}
                onChange={(value) => setFieldValue('energyLevel', value)}
              />
              
              <SliderInput
                label="Sleep Quality"
                name="sleepQuality"
                value={values.sleepQuality}
                onChange={(value) => setFieldValue('sleepQuality', value)}
              />
              
              <SliderInput
                label="Stress Level"
                name="stressLevel"
                value={values.stressLevel}
                onChange={(value) => setFieldValue('stressLevel', value)}
              />
              
              <SliderInput
                label="Mental Clarity"
                name="mentalClarity"
                value={values.mentalClarity}
                onChange={(value) => setFieldValue('mentalClarity', value)}
              />
              
              <div className="space-y-6">
              <InputField
                label="Describe your current diet"
                name="lifestyle.diet"
                value={values.lifestyle.diet}
                onChange={(e) => setFieldValue('lifestyle.diet', e.target.value)}
                error={touched.lifestyle?.diet && errors.lifestyle?.diet}
                required
              />
              
              <InputField
                label="Describe your movement/exercise habits"
                name="lifestyle.movement"
                value={values.lifestyle.movement}
                onChange={(e) => setFieldValue('lifestyle.movement', e.target.value)}
                error={touched.lifestyle?.movement && errors.lifestyle?.movement}
                required
              />
              
              <InputField
                label="Describe your digital device usage"
                name="lifestyle.digitalUsage"
                value={values.lifestyle.digitalUsage}
                onChange={(e) => setFieldValue('lifestyle.digitalUsage', e.target.value)}
                error={touched.lifestyle?.digitalUsage && errors.lifestyle?.digitalUsage}
                required
              />
            </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">What would you like to address?</h2>
              <p className="text-warm-300">Select the primary issues you'd like to work on.</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-base font-medium text-warm-300 mb-3">
                Primary Issues <span className="text-lime-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {primaryIssues.map((issue) => (
                  <button
                    key={issue}
                    type="button"
                    onClick={() => {
                      const current = values.primaryIssues;
                      const updated = current.includes(issue)
                        ? current.filter((i: string) => i !== issue)
                        : [...current, issue];
                      setFieldValue('primaryIssues', updated);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      values.primaryIssues.includes(issue)
                        ? 'border-lavender-500 bg-electric-500/20 text-electric-400'
                        : 'border-sage-200 hover:border-sage-300'
                    }`}
                  >
                    {issue}
                    {values.primaryIssues.includes(issue) && (
                      <Check size={16} />
                    )}
                  </button>
                ))}
              </div>
              {touched.primaryIssues && errors.primaryIssues && (
                <p className="mt-1 text-sm text-lime-400">{errors.primaryIssues}</p>
              )}
            </div>
            
            <InputField
              label="Additional notes (optional)"
              name="customNotes"
              value={values.customNotes}
              onChange={(e) => setFieldValue('customNotes', e.target.value)}
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">What are your goals?</h2>
              <p className="text-warm-300">Let's understand what you want to achieve.</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-base font-medium text-warm-300 mb-3">
                Short-term goals (next 3 months) <span className="text-lime-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {shortTermGoals.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => {
                      const current = values.goals.shortTerm;
                      const updated = current.includes(goal)
                        ? current.filter((g: string) => g !== goal)
                        : [...current, goal];
                      setFieldValue('goals.shortTerm', updated);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      values.goals.shortTerm.includes(goal)
                        ? 'border-lavender-500 bg-electric-500/20 text-electric-400'
                        : 'border-sage-200 hover:border-sage-300'
                    }`}
                  >
                    {goal}
                    {values.goals.shortTerm.includes(goal) && (
                      <Check size={16} />
                    )}
                  </button>
                ))}
              </div>
              {touched.goals?.shortTerm && errors.goals?.shortTerm && (
                <p className="mt-1 text-sm text-lime-400">{errors.goals.shortTerm}</p>
              )}
            </div>
            
            <InputField
              label="Long-term goals (1+ years)"
              name="goals.longTerm"
              value={values.goals.longTerm}
              onChange={(e) => setFieldValue('goals.longTerm', e.target.value)}
              error={touched.goals?.longTerm && errors.goals?.longTerm}
              required
            />
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Your wellness philosophy</h2>
              <p className="text-warm-300">Help us understand your approach to health and healing.</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-base font-medium text-warm-300 mb-3">
                Belief alignment <span className="text-lime-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['spiritual', 'scientific', 'both'].map((alignment) => (
                  <button
                    key={alignment}
                    type="button"
                    onClick={() => setFieldValue('beliefs.alignment', alignment)}
                    className={`p-4 rounded-lg border-2 transition-all text-center capitalize ${
                      values.beliefs.alignment === alignment
                        ? 'border-lavender-500 bg-electric-500/20 text-electric-400'
                        : 'border-sage-200 hover:border-sage-300'
                    }`}
                  >
                    {alignment}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-base font-medium text-warm-300 mb-3">
                Preferred modalities <span className="text-lime-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {modalities.map((modality) => (
                  <button
                    key={modality}
                    type="button"
                    onClick={() => {
                      const current = values.beliefs.modalities;
                      const updated = current.includes(modality)
                        ? current.filter((m: string) => m !== modality)
                        : [...current, modality];
                      setFieldValue('beliefs.modalities', updated);
                    }}
                    className={`p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                      values.beliefs.modalities.includes(modality)
                        ? 'border-lavender-500 bg-electric-500/20 text-electric-400'
                        : 'border-sage-200 hover:border-sage-300'
                    }`}
                  >
                    {modality}
                    {values.beliefs.modalities.includes(modality) && (
                      <Check size={16} />
                    )}
                  </button>
                ))}
              </div>
              {touched.beliefs?.modalities && errors.beliefs?.modalities && (
                <p className="mt-1 text-sm text-lime-400">{errors.beliefs.modalities}</p>
              )}
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-warm-800 py-8">
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                  currentStep >= step.id
                    ? 'bg-electric-500 text-white'
                    : 'bg-warm-600 text-warm-300'
                }`}>
                  {currentStep > step.id ? <Check size={18} /> : step.id}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-3 ${
                    currentStep > step.id ? 'bg-electric-500' : 'bg-warm-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">
              {steps[currentStep - 1].title}
            </h1>
            <p className="text-lg text-warm-300">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="modern-card p-8">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched, isValid }) => (
              <Form>
                <AnimatePresence mode="wait">
                  {renderStepContent(values, setFieldValue, errors, touched)}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-12 pt-8 border-t border-sage-200">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 text-base font-medium ${
                      currentStep === 1
                        ? 'text-warm-400 cursor-not-allowed'
                        : 'text-warm-300 hover:text-white hover:bg-warm-700/50'
                    }`}
                  >
                    <ChevronLeft size={20} className="mr-3" />
                    Previous
                  </button>

                  <div className="flex space-x-6">
                    <button
                      type="button"
                      onClick={() => {
                        try {
                          console.log('Loading demo data from onboarding...');
                          loadDemoData();
                          console.log('Demo data loaded successfully from onboarding');
                          navigate('/dashboard');
                        } catch (error) {
                          console.error('Error loading demo data from onboarding:', error);
                          // Fallback: just navigate to dashboard
                          navigate('/dashboard');
                        }
                      }}
                      className="bg-gradient-to-r from-lavender-500 to-rose-500 hover:from-lavender-600 hover:to-rose-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-base"
                    >
                      Skip & Try Demo
                    </button>

                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-primary flex items-center py-3 px-6 text-base"
                      >
                        Next
                        <ChevronRight size={20} className="ml-3" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!isValid}
                        className={`btn-primary flex items-center py-3 px-6 text-base ${
                          !isValid ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        Complete Profile
                        <Check size={20} className="ml-3" />
                      </button>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard; 
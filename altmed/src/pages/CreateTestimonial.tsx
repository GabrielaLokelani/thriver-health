import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ArrowLeft, Save, CheckCircle, AlertTriangle, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { conditions } from '../data/conditions';

interface TestimonialFormData {
  title: string;
  content: string;
  conditionId: string;
  treatmentId?: string;
  healthCondition: {
    diagnosis: string;
    severity: 'mild' | 'moderate' | 'severe';
    duration: string;
    symptoms: string[];
  };
  treatments: {
    conventional: Array<{
      name: string;
      effectiveness: number;
      sideEffects: string[];
      duration: string;
    }>;
    alternative: Array<{
      name: string;
      effectiveness: number;
      sideEffects: string[];
      duration: string;
      dosage?: string;
    }>;
  };
  experience: {
    overallEffectiveness: number;
    sideEffects: string[];
    timeline: string;
    lifestyleChanges: string[];
    conjunctiveTreatments: string[];
  };
  research: {
    consultedStudies: boolean;
    consultedHealthcareProvider: boolean;
    consultedCommunity: boolean;
    sources: string[];
  };
  consent: {
    ehrShared: boolean;
    identityVerified: boolean;
    dataUsageConsent: boolean;
  };
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(10, 'Title must be at least 10 characters'),
  content: Yup.string().required('Content is required').min(100, 'Content must be at least 100 characters'),
  conditionId: Yup.string().required('Please select a condition'),
  healthCondition: Yup.object({
    diagnosis: Yup.string().required('Diagnosis is required'),
    severity: Yup.string().required('Please select severity'),
    duration: Yup.string().required('Duration is required'),
    symptoms: Yup.array().min(1, 'Please add at least one symptom')
  }),
  experience: Yup.object({
    overallEffectiveness: Yup.number().required('Please rate overall effectiveness'),
    timeline: Yup.string().required('Please describe your treatment timeline'),
    lifestyleChanges: Yup.array().min(1, 'Please add at least one lifestyle change')
  }),
  consent: Yup.object({
    ehrShared: Yup.boolean().oneOf([true], 'You must consent to share EHR data'),
    identityVerified: Yup.boolean().oneOf([true], 'Identity verification is required'),
    dataUsageConsent: Yup.boolean().oneOf([true], 'Data usage consent is required')
  })
});

const CreateTestimonial: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [conventionalTreatments, setConventionalTreatments] = useState<Array<{
    name: string;
    effectiveness: number;
    sideEffects: string[];
    duration: string;
  }>>([]);
  const [alternativeTreatments, setAlternativeTreatments] = useState<Array<{
    name: string;
    effectiveness: number;
    sideEffects: string[];
    duration: string;
    dosage?: string;
  }>>([]);

  const initialValues: TestimonialFormData = {
    title: '',
    content: '',
    conditionId: '',
    treatmentId: '',
    healthCondition: {
      diagnosis: '',
      severity: 'moderate',
      duration: '',
      symptoms: []
    },
    treatments: {
      conventional: [],
      alternative: []
    },
    experience: {
      overallEffectiveness: 5,
      sideEffects: [],
      timeline: '',
      lifestyleChanges: [],
      conjunctiveTreatments: []
    },
    research: {
      consultedStudies: false,
      consultedHealthcareProvider: false,
      consultedCommunity: false,
      sources: []
    },
    consent: {
      ehrShared: false,
      identityVerified: false,
      dataUsageConsent: false
    }
  };

  const handleSubmit = (values: TestimonialFormData) => {
    // Here you would typically save to backend
    console.log('Testimonial data:', values);
    navigate('/search-analysis');
  };

  const addConventionalTreatment = () => {
    setConventionalTreatments([...conventionalTreatments, {
      name: '',
      effectiveness: 5,
      sideEffects: [],
      duration: ''
    }]);
  };

  const addAlternativeTreatment = () => {
    setAlternativeTreatments([...alternativeTreatments, {
      name: '',
      effectiveness: 5,
      sideEffects: [],
      duration: '',
      dosage: ''
    }]);
  };

  const steps = [
    { id: 1, title: 'Basic Information', description: 'Title and content' },
    { id: 2, title: 'Health Condition', description: 'Diagnosis and symptoms' },
    { id: 3, title: 'Treatment History', description: 'Conventional and alternative treatments' },
    { id: 4, title: 'Experience Details', description: 'Effectiveness and timeline' },
    { id: 5, title: 'Research & Consent', description: 'Sources and permissions' }
  ];

  return (
    <div className="min-h-screen bg-warm-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sage-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/search-analysis" className="flex items-center text-warm-300 hover:text-white mb-2">
                <ArrowLeft size={20} className="mr-2" />
                Back to Search
              </Link>
              <h1 className="text-3xl font-bold text-white">
                Share Your Experience
              </h1>
              <p className="text-warm-300">
                Help others by sharing your health journey and treatment experiences. Earn rewards and grow our community through our referral program.
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.id
                    ? 'border-lavender-500 bg-electric-500/200 text-white'
                    : 'border-sage-300 text-warm-400'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle size={20} />
                  ) : (
                    <span className="font-semibold">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step.id ? 'bg-electric-500/200' : 'bg-warm-500'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-lg font-semibold text-white">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-warm-300">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isValid }) => (
            <Form className="space-y-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <h3 className="text-xl font-bold text-white mb-6">
                    Basic Information
                  </h3>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-base font-medium text-warm-300 mb-3">
                        Testimonial Title *
                      </label>
                      <Field
                        name="title"
                        type="text"
                        placeholder="e.g., 'Ivermectin helped reduce my PSA levels significantly'"
                        className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent text-base"
                      />
                      <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-2" />
                    </div>

                    <div>
                      <label className="block text-base font-medium text-warm-300 mb-3">
                        Your Story *
                      </label>
                      <Field
                        name="content"
                        as="textarea"
                        rows={8}
                        placeholder="Share your detailed experience with the condition and treatments. Include what worked, what didn't, side effects, timeline, and any lifestyle changes that helped."
                        className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent text-base"
                      />
                      <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-2" />
                    </div>

                    <div>
                      <label className="block text-base font-medium text-warm-300 mb-3">
                        Primary Condition *
                      </label>
                      <Field
                        name="conditionId"
                        as="select"
                        className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent text-base"
                      >
                        <option value="">Select a condition</option>
                        {conditions.map(condition => (
                          <option key={condition.id} value={condition.id}>
                            {condition.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="conditionId" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Health Condition */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <h3 className="text-xl font-bold text-white mb-6">
                    Health Condition Details
                  </h3>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-base font-medium text-warm-300 mb-3">
                        Diagnosis *
                      </label>
                      <Field
                        name="healthCondition.diagnosis"
                        type="text"
                        placeholder="e.g., 'Prostate Cancer, Stage 2'"
                        className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent text-base"
                      />
                      <ErrorMessage name="healthCondition.diagnosis" component="div" className="text-red-500 text-sm mt-2" />
                    </div>

                    <div>
                      <label className="block text-base font-medium text-warm-300 mb-3">
                        Severity *
                      </label>
                      <Field
                        name="healthCondition.severity"
                        as="select"
                        className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent text-base"
                      >
                        <option value="mild">Mild</option>
                        <option value="moderate">Moderate</option>
                        <option value="severe">Severe</option>
                      </Field>
                    </div>

                    <div>
                      <label className="block text-base font-medium text-warm-300 mb-3">
                        Duration *
                      </label>
                      <Field
                        name="healthCondition.duration"
                        type="text"
                        placeholder="e.g., '2 years', '6 months'"
                        className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent text-base"
                      />
                      <ErrorMessage name="healthCondition.duration" component="div" className="text-red-500 text-sm mt-2" />
                    </div>

                    <div>
                      <label className="block text-base font-medium text-warm-300 mb-3">
                        Symptoms
                      </label>
                      <div className="space-y-2">
                        {['Fatigue', 'Pain', 'Anxiety', 'Sleep issues', 'Digestive problems', 'Cognitive issues'].map(symptom => (
                          <label key={symptom} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={values.healthCondition.symptoms.includes(symptom)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue('healthCondition.symptoms', [...values.healthCondition.symptoms, symptom]);
                                } else {
                                  setFieldValue('healthCondition.symptoms', values.healthCondition.symptoms.filter(s => s !== symptom));
                                }
                              }}
                              className="mr-3 text-electric-400 focus:ring-lavender-500"
                            />
                            {symptom}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Treatment History */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <h3 className="text-xl font-bold text-white mb-6">
                    Treatment History
                  </h3>
                  
                  <div className="space-y-8">
                    {/* Conventional Treatments */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">Conventional Treatments</h4>
                        <button
                          type="button"
                          onClick={addConventionalTreatment}
                          className="text-electric-400 hover:text-electric-400 text-sm font-medium"
                        >
                          + Add Treatment
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {conventionalTreatments.map((treatment, index) => (
                          <div key={index} className="border border-sage-200 rounded-lg p-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-warm-300 mb-1">Treatment Name</label>
                                <input
                                  type="text"
                                  value={treatment.name}
                                  onChange={(e) => {
                                    const updated = [...conventionalTreatments];
                                    updated[index].name = e.target.value;
                                    setConventionalTreatments(updated);
                                  }}
                                  className="w-full px-3 py-2 border border-sage-200 rounded focus:ring-2 focus:ring-lavender-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-warm-300 mb-1">Effectiveness (1-10)</label>
                                <input
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={treatment.effectiveness}
                                  onChange={(e) => {
                                    const updated = [...conventionalTreatments];
                                    updated[index].effectiveness = parseInt(e.target.value);
                                    setConventionalTreatments(updated);
                                  }}
                                  className="w-full px-3 py-2 border border-sage-200 rounded focus:ring-2 focus:ring-lavender-500"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Alternative Treatments */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">Alternative Treatments</h4>
                        <button
                          type="button"
                          onClick={addAlternativeTreatment}
                          className="text-electric-400 hover:text-electric-400 text-sm font-medium"
                        >
                          + Add Treatment
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {alternativeTreatments.map((treatment, index) => (
                          <div key={index} className="border border-sage-200 rounded-lg p-4">
                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-warm-300 mb-1">Treatment Name</label>
                                <input
                                  type="text"
                                  value={treatment.name}
                                  onChange={(e) => {
                                    const updated = [...alternativeTreatments];
                                    updated[index].name = e.target.value;
                                    setAlternativeTreatments(updated);
                                  }}
                                  className="w-full px-3 py-2 border border-sage-200 rounded focus:ring-2 focus:ring-lavender-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-warm-300 mb-1">Effectiveness (1-10)</label>
                                <input
                                  type="number"
                                  min="1"
                                  max="10"
                                  value={treatment.effectiveness}
                                  onChange={(e) => {
                                    const updated = [...alternativeTreatments];
                                    updated[index].effectiveness = parseInt(e.target.value);
                                    setAlternativeTreatments(updated);
                                  }}
                                  className="w-full px-3 py-2 border border-sage-200 rounded focus:ring-2 focus:ring-lavender-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-warm-300 mb-1">Dosage</label>
                                <input
                                  type="text"
                                  value={treatment.dosage || ''}
                                  onChange={(e) => {
                                    const updated = [...alternativeTreatments];
                                    updated[index].dosage = e.target.value;
                                    setAlternativeTreatments(updated);
                                  }}
                                  placeholder="e.g., 50mg daily"
                                  className="w-full px-3 py-2 border border-sage-200 rounded focus:ring-2 focus:ring-lavender-500"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Experience Details */}
              {currentStep === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <h3 className="text-xl font-bold text-white mb-6">
                    Experience Details
                  </h3>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-base font-medium text-warm-300 mb-3">
                        Overall Effectiveness (1-10) *
                      </label>
                      <Field
                        name="experience.overallEffectiveness"
                        type="number"
                        min="1"
                        max="10"
                        className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent text-base"
                      />
                      <ErrorMessage name="experience.overallEffectiveness" component="div" className="text-red-500 text-sm mt-2" />
                    </div>

                    <div>
                      <label className="block text-base font-medium text-warm-300 mb-3">
                        Treatment Timeline *
                      </label>
                      <Field
                        name="experience.timeline"
                        as="textarea"
                        rows={4}
                        placeholder="Describe your treatment timeline, when you started, how long you used each treatment, and when you saw results."
                        className="w-full px-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent text-base"
                      />
                      <ErrorMessage name="experience.timeline" component="div" className="text-red-500 text-sm mt-2" />
                    </div>

                    <div>
                      <label className="block text-base font-medium text-warm-300 mb-3">
                        Lifestyle Changes
                      </label>
                      <div className="space-y-2">
                        {['Diet changes', 'Exercise', 'Stress reduction', 'Sleep improvement', 'Supplements', 'Meditation'].map(change => (
                          <label key={change} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={values.experience.lifestyleChanges.includes(change)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFieldValue('experience.lifestyleChanges', [...values.experience.lifestyleChanges, change]);
                                } else {
                                  setFieldValue('experience.lifestyleChanges', values.experience.lifestyleChanges.filter(c => c !== change));
                                }
                              }}
                              className="mr-3 text-electric-400 focus:ring-lavender-500"
                            />
                            {change}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Research & Consent */}
              {currentStep === 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <h3 className="text-xl font-bold text-white mb-6">
                    Research & Consent
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Research Sources</h4>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <Field
                            name="research.consultedStudies"
                            type="checkbox"
                            className="mr-3 text-electric-400 focus:ring-lavender-500"
                          />
                          I consulted scientific studies and research papers
                        </label>
                        <label className="flex items-center">
                          <Field
                            name="research.consultedHealthcareProvider"
                            type="checkbox"
                            className="mr-3 text-electric-400 focus:ring-lavender-500"
                          />
                          I consulted with healthcare providers
                        </label>
                        <label className="flex items-center">
                          <Field
                            name="research.consultedCommunity"
                            type="checkbox"
                            className="mr-3 text-electric-400 focus:ring-lavender-500"
                          />
                          I consulted with patient communities and forums
                        </label>
                      </div>
                    </div>

                    <div className="bg-electric-500/20 border border-lavender-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Shield size={20} className="mr-2 text-electric-400" />
                        Consent & Verification
                      </h4>
                      
                      <div className="space-y-4">
                        <label className="flex items-start">
                          <Field
                            name="consent.ehrShared"
                            type="checkbox"
                            className="mr-3 mt-1 text-electric-400 focus:ring-lavender-500"
                          />
                          <div>
                            <span className="font-medium text-white">EHR Data Sharing</span>
                            <p className="text-sm text-warm-300">I consent to share my electronic health record data for research purposes (anonymized)</p>
                          </div>
                        </label>
                        
                        <label className="flex items-start">
                          <Field
                            name="consent.identityVerified"
                            type="checkbox"
                            className="mr-3 mt-1 text-electric-400 focus:ring-lavender-500"
                          />
                          <div>
                            <span className="font-medium text-white">Identity Verification</span>
                            <p className="text-sm text-warm-300">I confirm my identity has been verified through our secure verification process</p>
                          </div>
                        </label>
                        
                        <label className="flex items-start">
                          <Field
                            name="consent.dataUsageConsent"
                            type="checkbox"
                            className="mr-3 mt-1 text-electric-400 focus:ring-lavender-500"
                          />
                          <div>
                            <span className="font-medium text-white">Data Usage Consent</span>
                            <p className="text-sm text-warm-300">I consent to my testimonial being used for research and community insights</p>
                          </div>
                        </label>
                      </div>
                      
                      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start">
                          <AlertTriangle size={20} className="text-yellow-600 mr-3 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-yellow-800">Important Disclaimer</h5>
                            <p className="text-sm text-yellow-700 mt-1">
                              This platform does not provide medical advice. All testimonials are personal experiences and should not replace professional medical consultation. Always consult with qualified healthcare providers before starting any treatment.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8">
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="btn-secondary px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex space-x-6">
                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="btn-primary px-8 py-4"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isValid}
                      className="btn-primary flex items-center px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save size={20} className="mr-2" />
                      Submit Testimonial
                    </button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateTestimonial; 
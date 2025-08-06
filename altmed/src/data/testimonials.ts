export interface Testimonial {
  id: string;
  userId: string;
  userName: string;
  conditionId: string;
  treatmentId?: string;
  title: string;
  content: string;
  healthCondition: {
    diagnosis: string;
    severity: 'mild' | 'moderate' | 'severe';
    duration: string; // e.g., "2 years", "6 months"
    symptoms: string[];
  };
  treatments: {
    conventional: Array<{
      name: string;
      effectiveness: number; // 1-10
      sideEffects: string[];
      duration: string;
    }>;
    alternative: Array<{
      name: string;
      effectiveness: number; // 1-10
      sideEffects: string[];
      duration: string;
      dosage?: string;
    }>;
  };
  experience: {
    overallEffectiveness: number; // 1-10
    sideEffects: string[];
    timeline: string; // description of treatment timeline
    lifestyleChanges: string[];
    conjunctiveTreatments: string[]; // treatments used together
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
  createdAt: string;
  updatedAt: string;
  helpfulCount: number;
  commentCount: number;
  verified: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    userId: 'user-123',
    userName: 'Michael R.',
    conditionId: 'prostate-cancer',
    treatmentId: 'ivermectin',
    title: 'Ivermectin helped reduce my PSA levels significantly',
    content: 'After being diagnosed with prostate cancer in 2022, I was looking for additional treatment options beyond the standard protocol. I discovered research on ivermectin\'s potential anti-cancer properties and decided to try it under my doctor\'s supervision. After 6 months of treatment, my PSA levels decreased from 8.5 to 3.2, and I experienced minimal side effects. I combined this with a healthy diet and regular exercise. While I understand this is anecdotal evidence, I believe it contributed to my positive outcome.',
    healthCondition: {
      diagnosis: 'Prostate Cancer, Stage 2',
      severity: 'moderate',
      duration: '18 months',
      symptoms: ['Elevated PSA', 'Frequent urination', 'Fatigue']
    },
    treatments: {
      conventional: [
        {
          name: 'Radiation Therapy',
          effectiveness: 6,
          sideEffects: ['Fatigue', 'Urinary issues', 'Bowel problems'],
          duration: '8 weeks'
        }
      ],
      alternative: [
        {
          name: 'Ivermectin',
          effectiveness: 8,
          sideEffects: ['Mild nausea initially'],
          duration: '6 months',
          dosage: '0.2mg/kg twice weekly'
        },
        {
          name: 'Vitamin D',
          effectiveness: 7,
          sideEffects: ['None'],
          duration: 'Ongoing',
          dosage: '5000 IU daily'
        }
      ]
    },
    experience: {
      overallEffectiveness: 8,
      sideEffects: ['Mild nausea for first week'],
      timeline: 'Started ivermectin 3 months after radiation. Saw PSA improvement within 2 months.',
      lifestyleChanges: ['Switched to plant-based diet', 'Increased exercise', 'Reduced stress'],
      conjunctiveTreatments: ['Vitamin D', 'Curcumin', 'Green tea extract']
    },
    research: {
      consultedStudies: true,
      consultedHealthcareProvider: true,
      consultedCommunity: true,
      sources: ['PubMed studies on ivermectin and cancer', 'Online patient forums', 'Consultation with oncologist']
    },
    consent: {
      ehrShared: true,
      identityVerified: true,
      dataUsageConsent: true
    },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    helpfulCount: 45,
    commentCount: 12,
    verified: true
  },
  {
    id: 'testimonial-2',
    userId: 'user-456',
    userName: 'Sarah L.',
    conditionId: 'multiple-sclerosis',
    treatmentId: 'stem-cell-therapy',
    title: 'Stem cell therapy gave me my life back',
    content: 'Living with MS for 10 years was incredibly challenging. I tried multiple conventional treatments but continued to decline. After extensive research, I decided to try stem cell therapy at a clinic in Mexico. The procedure was intense but the results have been remarkable. My mobility has improved significantly, fatigue is reduced, and I haven\'t had a major relapse in 2 years. The cost was substantial but worth every penny for the quality of life improvement.',
    healthCondition: {
      diagnosis: 'Multiple Sclerosis, Relapsing-Remitting',
      severity: 'severe',
      duration: '10 years',
      symptoms: ['Mobility issues', 'Fatigue', 'Cognitive fog', 'Vision problems']
    },
    treatments: {
      conventional: [
        {
          name: 'Interferon beta-1a',
          effectiveness: 4,
          sideEffects: ['Flu-like symptoms', 'Depression', 'Liver issues'],
          duration: '5 years'
        },
        {
          name: 'Fingolimod',
          effectiveness: 5,
          sideEffects: ['Heart rate issues', 'Vision problems', 'Headaches'],
          duration: '3 years'
        }
      ],
      alternative: [
        {
          name: 'Stem Cell Therapy',
          effectiveness: 9,
          sideEffects: ['Initial fatigue', 'Mild fever'],
          duration: 'One-time procedure',
          dosage: 'Autologous stem cell transplant'
        },
        {
          name: 'Vitamin D',
          effectiveness: 6,
          sideEffects: ['None'],
          duration: 'Ongoing',
          dosage: '10,000 IU daily'
        }
      ]
    },
    experience: {
      overallEffectiveness: 9,
      sideEffects: ['Initial fatigue for 2 weeks', 'Mild fever for 3 days'],
      timeline: 'Procedure in March 2023. Started seeing improvements within 3 months. Continued improvement over 12 months.',
      lifestyleChanges: ['Reduced stress', 'Improved diet', 'Regular gentle exercise'],
      conjunctiveTreatments: ['Vitamin D', 'Omega-3', 'Meditation']
    },
    research: {
      consultedStudies: true,
      consultedHealthcareProvider: true,
      consultedCommunity: true,
      sources: ['Clinical trials on stem cell therapy for MS', 'Patient testimonials', 'Consultation with neurologist']
    },
    consent: {
      ehrShared: true,
      identityVerified: true,
      dataUsageConsent: true
    },
    createdAt: '2024-02-20T14:15:00Z',
    updatedAt: '2024-02-20T14:15:00Z',
    helpfulCount: 78,
    commentCount: 23,
    verified: true
  },
  {
    id: 'testimonial-3',
    userId: 'user-789',
    userName: 'David K.',
    conditionId: 'anxiety',
    treatmentId: 'cbd-oil',
    title: 'CBD oil transformed my anxiety management',
    content: 'I struggled with severe anxiety for years, trying various medications that either didn\'t work or had terrible side effects. A friend suggested CBD oil and I was skeptical but desperate. Within a week of starting, I noticed a significant reduction in my anxiety levels. I can now function normally without the constant worry and panic attacks. I use it daily and it\'s become an essential part of my wellness routine.',
    healthCondition: {
      diagnosis: 'Generalized Anxiety Disorder',
      severity: 'moderate',
      duration: '8 years',
      symptoms: ['Constant worry', 'Panic attacks', 'Sleep issues', 'Physical tension']
    },
    treatments: {
      conventional: [
        {
          name: 'Sertraline (Zoloft)',
          effectiveness: 3,
          sideEffects: ['Sexual dysfunction', 'Weight gain', 'Emotional numbness'],
          duration: '2 years'
        },
        {
          name: 'Alprazolam (Xanax)',
          effectiveness: 6,
          sideEffects: ['Dependency', 'Drowsiness', 'Memory issues'],
          duration: '1 year'
        }
      ],
      alternative: [
        {
          name: 'CBD Oil',
          effectiveness: 8,
          sideEffects: ['Mild drowsiness initially'],
          duration: 'Ongoing',
          dosage: '50mg daily'
        },
        {
          name: 'Meditation',
          effectiveness: 7,
          sideEffects: ['None'],
          duration: 'Ongoing'
        }
      ]
    },
    experience: {
      overallEffectiveness: 8,
      sideEffects: ['Mild drowsiness for first week'],
      timeline: 'Started CBD oil in January 2024. Felt effects within 3 days. Full benefits within 2 weeks.',
      lifestyleChanges: ['Daily meditation', 'Reduced caffeine', 'Better sleep hygiene'],
      conjunctiveTreatments: ['Meditation', 'Breathwork', 'Exercise']
    },
    research: {
      consultedStudies: true,
      consultedHealthcareProvider: true,
      consultedCommunity: true,
      sources: ['CBD research studies', 'Online forums', 'Consultation with psychiatrist']
    },
    consent: {
      ehrShared: false,
      identityVerified: true,
      dataUsageConsent: true
    },
    createdAt: '2024-03-10T09:45:00Z',
    updatedAt: '2024-03-10T09:45:00Z',
    helpfulCount: 156,
    commentCount: 34,
    verified: true
  }
];

export const getTestimonialsByCondition = (conditionId: string) => {
  return testimonials.filter(testimonial => testimonial.conditionId === conditionId);
};

export const getTestimonialsByTreatment = (treatmentId: string) => {
  return testimonials.filter(testimonial => testimonial.treatmentId === treatmentId);
};

export const getVerifiedTestimonials = () => {
  return testimonials.filter(testimonial => testimonial.verified);
};

export const getTestimonialsByEffectiveness = (minEffectiveness: number) => {
  return testimonials.filter(testimonial => testimonial.experience.overallEffectiveness >= minEffectiveness);
}; 
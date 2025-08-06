export interface Partner {
  id: string;
  name: string;
  title: string;
  specialization: string;
  location: string;
  type: 'practitioner' | 'influencer' | 'researcher' | 'thought-leader';
  bio: string;
  credentials: string[];
  socialMedia: {
    substack?: string;
    twitter?: string;
    youtube?: string;
    instagram?: string;
    website?: string;
  };
  content: {
    publishedArticles: number;
    patientTestimonials: number;
    researchPapers: number;
    videos: number;
  };
  referralStats: {
    totalReferrals: number;
    successfulReferrals: number;
    revenueGenerated: number;
    commissionRate: number;
  };
  verified: boolean;
  featured: boolean;
  image?: string;
  tags: string[];
}

export const partners: Partner[] = [
  {
    id: 'dr-makis',
    name: 'Dr. William Makis',
    title: 'Medical Oncologist & Cancer Researcher',
    specialization: 'Cancer Treatment, Antiparasitics, Alternative Medicine',
    location: 'Canada',
    type: 'practitioner',
    bio: 'Dr. Makis is a Canadian medical oncologist and cancer researcher who has been treating cancer patients with antiparasitics and other alternative treatments. He publishes extensively on Substack and has helped numerous patients with serious conditions.',
    credentials: [
      'MD - University of Alberta',
      'Medical Oncologist',
      'Cancer Researcher',
      'Published Author'
    ],
    socialMedia: {
      substack: 'https://makismd.substack.com',
      twitter: '@makismd',
      website: 'https://makismd.com'
    },
    content: {
      publishedArticles: 150,
      patientTestimonials: 89,
      researchPapers: 12,
      videos: 45
    },
    referralStats: {
      totalReferrals: 234,
      successfulReferrals: 189,
      revenueGenerated: 156000,
      commissionRate: 15
    },
    verified: true,
    featured: true,
    tags: ['cancer', 'antiparasitics', 'ivermectin', 'alternative-medicine', 'oncology']
  },
  {
    id: 'dr-mercola',
    name: 'Dr. Joseph Mercola',
    title: 'Osteopathic Physician & Health Expert',
    specialization: 'Preventive Medicine, Natural Health, Wellness',
    location: 'United States',
    type: 'thought-leader',
    bio: 'Dr. Mercola is a leading voice in natural health and preventive medicine, with millions of followers worldwide. He focuses on evidence-based natural approaches to health and wellness.',
    credentials: [
      'DO - Chicago College of Osteopathic Medicine',
      'Board Certified in Family Medicine',
      'Natural Health Expert',
      'Best-selling Author'
    ],
    socialMedia: {
      website: 'https://mercola.com',
      twitter: '@mercola',
      youtube: 'Dr. Joseph Mercola'
    },
    content: {
      publishedArticles: 5000,
      patientTestimonials: 1200,
      researchPapers: 25,
      videos: 300
    },
    referralStats: {
      totalReferrals: 890,
      successfulReferrals: 745,
      revenueGenerated: 320000,
      commissionRate: 12
    },
    verified: true,
    featured: true,
    tags: ['preventive-medicine', 'natural-health', 'wellness', 'nutrition', 'supplements']
  },
  {
    id: 'dr-hyman',
    name: 'Dr. Mark Hyman',
    title: 'Functional Medicine Physician',
    specialization: 'Functional Medicine, Metabolic Health, Nutrition',
    location: 'United States',
    type: 'practitioner',
    bio: 'Dr. Hyman is a leading functional medicine physician and author who focuses on treating the root causes of disease through nutrition and lifestyle medicine.',
    credentials: [
      'MD - University of Cincinnati',
      'Functional Medicine Physician',
      'New York Times Best-selling Author',
      'Cleveland Clinic Center for Functional Medicine'
    ],
    socialMedia: {
      website: 'https://drhyman.com',
      twitter: '@markhymanmd',
      instagram: '@markhymanmd'
    },
    content: {
      publishedArticles: 800,
      patientTestimonials: 450,
      researchPapers: 18,
      videos: 200
    },
    referralStats: {
      totalReferrals: 567,
      successfulReferrals: 489,
      revenueGenerated: 245000,
      commissionRate: 10
    },
    verified: true,
    featured: true,
    tags: ['functional-medicine', 'metabolic-health', 'nutrition', 'diabetes', 'autoimmune']
  },
  {
    id: 'dr-kelly',
    name: 'Dr. Kelly Brogan',
    title: 'Holistic Psychiatrist',
    specialization: 'Mental Health, Women\'s Health, Natural Psychiatry',
    location: 'United States',
    type: 'practitioner',
    bio: 'Dr. Brogan is a holistic psychiatrist who focuses on natural approaches to mental health, particularly for women. She has helped thousands of patients overcome depression and anxiety naturally.',
    credentials: [
      'MD - Cornell University',
      'Holistic Psychiatrist',
      'Author of "A Mind of Your Own"',
      'Functional Medicine Certified'
    ],
    socialMedia: {
      website: 'https://kellybroganmd.com',
      twitter: '@kellybroganmd',
      instagram: '@kellybroganmd'
    },
    content: {
      publishedArticles: 300,
      patientTestimonials: 234,
      researchPapers: 8,
      videos: 150
    },
    referralStats: {
      totalReferrals: 345,
      successfulReferrals: 298,
      revenueGenerated: 178000,
      commissionRate: 12
    },
    verified: true,
    featured: false,
    tags: ['mental-health', 'depression', 'anxiety', 'women-health', 'holistic-psychiatry']
  },
  {
    id: 'dr-palevsky',
    name: 'Dr. Lawrence Palevsky',
    title: 'Pediatrician & Holistic Health Expert',
    specialization: 'Pediatric Health, Vaccine Safety, Natural Medicine',
    location: 'United States',
    type: 'practitioner',
    bio: 'Dr. Palevsky is a board-certified pediatrician who practices holistic, evidence-based medicine. He focuses on natural approaches to children\'s health and vaccine safety.',
    credentials: [
      'MD - New York University',
      'Board Certified Pediatrician',
      'Holistic Health Expert',
      'Author and Speaker'
    ],
    socialMedia: {
      website: 'https://drpalevsky.com',
      twitter: '@drpalevsky',
      youtube: 'Dr. Lawrence Palevsky'
    },
    content: {
      publishedArticles: 200,
      patientTestimonials: 156,
      researchPapers: 5,
      videos: 89
    },
    referralStats: {
      totalReferrals: 234,
      successfulReferrals: 198,
      revenueGenerated: 89000,
      commissionRate: 10
    },
    verified: true,
    featured: false,
    tags: ['pediatrics', 'vaccine-safety', 'children-health', 'natural-medicine', 'holistic-health']
  }
];

export const getPartnersByType = (type: string) => {
  return partners.filter(partner => partner.type === type);
};

export const getFeaturedPartners = () => {
  return partners.filter(partner => partner.featured);
};

export const getVerifiedPartners = () => {
  return partners.filter(partner => partner.verified);
};

export const getPartnersBySpecialization = (specialization: string) => {
  return partners.filter(partner => 
    partner.specialization.toLowerCase().includes(specialization.toLowerCase()) ||
    partner.tags.some(tag => tag.includes(specialization.toLowerCase()))
  );
};

export const getTopReferrers = () => {
  return partners
    .sort((a, b) => b.referralStats.successfulReferrals - a.referralStats.successfulReferrals)
    .slice(0, 10);
}; 
export interface SocialPost {
  id: string;
  authorId: string;
  authorName: string;
  authorType: 'user' | 'partner' | 'practitioner';
  authorImage?: string;
  content: string;
  type: 'testimonial' | 'article' | 'research' | 'question' | 'experience' | 'treatment-update';
  media?: {
    images?: string[];
    video?: string;
    document?: string;
  };
  tags: string[];
  conditionId?: string;
  treatmentId?: string;
  partnerId?: string;
  likes: number;
  comments: Comment[];
  shares: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  verified: boolean;
  featured: boolean;
  location?: string;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorType: 'user' | 'partner' | 'practitioner';
  content: string;
  likes: number;
  createdAt: string;
  replies?: Comment[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  location?: string;
  conditions: string[];
  treatments: string[];
  followers: number;
  following: number;
  posts: number;
  testimonials: number;
  verified: boolean;
  partnerId?: string;
  referralCode: string;
  referralStats: {
    totalReferrals: number;
    successfulReferrals: number;
    revenueEarned: number;
    commissionRate: number;
  };
  preferences: {
    privacy: 'public' | 'private' | 'friends-only';
    notifications: boolean;
    emailUpdates: boolean;
  };
  createdAt: string;
}

export interface PartnerContent {
  id: string;
  partnerId: string;
  title: string;
  content: string;
  type: 'article' | 'video' | 'research' | 'testimonial' | 'treatment-guide';
  publishedAt: string;
  externalLink?: string;
  views: number;
  shares: number;
  featured: boolean;
  tags: string[];
}

export const socialPosts: SocialPost[] = [
  {
    id: 'post-1',
    authorId: 'dr-makis',
    authorName: 'Dr. William Makis',
    authorType: 'partner',
    content: 'Important update on our cancer treatment protocols using antiparasitics. We\'ve seen remarkable results in 15 patients with advanced prostate cancer. PSA levels decreased by an average of 60% within 3 months. Full case studies available on my Substack. #CancerTreatment #Antiparasitics #AlternativeMedicine',
    type: 'research',
    tags: ['cancer', 'antiparasitics', 'prostate-cancer', 'alternative-medicine'],
    conditionId: 'prostate-cancer',
    treatmentId: 'ivermectin',
    partnerId: 'dr-makis',
    likes: 234,
    comments: [
      {
        id: 'comment-1',
        postId: 'post-1',
        authorId: 'user-123',
        authorName: 'Michael R.',
        authorType: 'user',
        content: 'Dr. Makis, your protocol helped me reduce my PSA from 8.5 to 3.2. Thank you for sharing this research!',
        likes: 45,
        createdAt: '2024-01-15T10:30:00Z'
      }
    ],
    shares: 89,
    views: 1200,
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T09:00:00Z',
    verified: true,
    featured: true,
    location: 'Canada'
  },
  {
    id: 'post-2',
    authorId: 'user-456',
    authorName: 'Sarah L.',
    authorType: 'user',
    content: 'After 10 years of MS, stem cell therapy gave me my life back. Mobility improved significantly, no major relapses in 2 years. The cost was substantial but worth every penny. Sharing my journey to help others. #MultipleSclerosis #StemCellTherapy #Recovery',
    type: 'testimonial',
    tags: ['multiple-sclerosis', 'stem-cell-therapy', 'recovery', 'testimonial'],
    conditionId: 'multiple-sclerosis',
    treatmentId: 'stem-cell-therapy',
    likes: 156,
    comments: [
      {
        id: 'comment-2',
        postId: 'post-2',
        authorId: 'user-789',
        authorName: 'David K.',
        authorType: 'user',
        content: 'This gives me hope for my MS journey. Can you share more details about the clinic you used?',
        likes: 12,
        createdAt: '2024-01-15T11:00:00Z'
      }
    ],
    shares: 67,
    views: 890,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    verified: true,
    featured: false
  },
  {
    id: 'post-3',
    authorId: 'dr-mercola',
    authorName: 'Dr. Joseph Mercola',
    authorType: 'partner',
    content: 'New research shows the critical role of vitamin D in immune function and cancer prevention. Daily supplementation of 5000-10000 IU may reduce cancer risk by up to 40%. Always test your levels and work with a healthcare provider. #VitaminD #CancerPrevention #ImmuneHealth',
    type: 'article',
    tags: ['vitamin-d', 'cancer-prevention', 'immune-health', 'nutrition'],
    partnerId: 'dr-mercola',
    likes: 445,
    comments: [],
    shares: 234,
    views: 3200,
    createdAt: '2024-01-14T15:00:00Z',
    updatedAt: '2024-01-14T15:00:00Z',
    verified: true,
    featured: true,
    location: 'United States'
  },
  {
    id: 'post-4',
    authorId: 'user-789',
    authorName: 'David K.',
    authorType: 'user',
    content: 'CBD oil transformed my anxiety management. Within a week, significant reduction in anxiety levels. Now I can function normally without constant worry. Daily use has become essential to my wellness routine. #Anxiety #CBD #MentalHealth',
    type: 'experience',
    tags: ['anxiety', 'cbd', 'mental-health', 'wellness'],
    conditionId: 'anxiety',
    treatmentId: 'cbd-oil',
    likes: 89,
    comments: [],
    shares: 23,
    views: 456,
    createdAt: '2024-01-14T12:00:00Z',
    updatedAt: '2024-01-14T12:00:00Z',
    verified: true,
    featured: false
  }
];

export const userProfiles: UserProfile[] = [
  {
    id: 'user-123',
    name: 'Michael R.',
    email: 'michael@example.com',
    bio: 'Prostate cancer survivor sharing my journey with alternative treatments.',
    location: 'California',
    conditions: ['prostate-cancer'],
    treatments: ['ivermectin', 'vitamin-d'],
    followers: 234,
    following: 156,
    posts: 12,
    testimonials: 3,
    verified: true,
    referralCode: 'MICHAEL123',
    referralStats: {
      totalReferrals: 15,
      successfulReferrals: 12,
      revenueEarned: 1800,
      commissionRate: 10
    },
    preferences: {
      privacy: 'public',
      notifications: true,
      emailUpdates: true
    },
    createdAt: '2023-06-15T00:00:00Z'
  },
  {
    id: 'user-456',
    name: 'Sarah L.',
    email: 'sarah@example.com',
    bio: 'MS warrior and advocate for stem cell therapy.',
    location: 'Texas',
    conditions: ['multiple-sclerosis'],
    treatments: ['stem-cell-therapy'],
    followers: 567,
    following: 234,
    posts: 25,
    testimonials: 5,
    verified: true,
    referralCode: 'SARAH456',
    referralStats: {
      totalReferrals: 28,
      successfulReferrals: 23,
      revenueEarned: 3450,
      commissionRate: 12
    },
    preferences: {
      privacy: 'public',
      notifications: true,
      emailUpdates: false
    },
    createdAt: '2023-03-20T00:00:00Z'
  }
];

export const partnerContent: PartnerContent[] = [
  {
    id: 'content-1',
    partnerId: 'dr-makis',
    title: 'Antiparasitics in Cancer Treatment: Case Studies',
    content: 'Comprehensive analysis of 50 cancer patients treated with antiparasitics. Results show significant improvement in 78% of cases...',
    type: 'research',
    publishedAt: '2024-01-15T00:00:00Z',
    externalLink: 'https://makismd.substack.com/p/antiparasitics-cancer-treatment',
    views: 2500,
    shares: 445,
    featured: true,
    tags: ['cancer', 'antiparasitics', 'research', 'case-studies']
  },
  {
    id: 'content-2',
    partnerId: 'dr-mercola',
    title: 'Vitamin D and Cancer Prevention: Latest Research',
    content: 'New meta-analysis shows vitamin D supplementation may reduce cancer risk by up to 40%...',
    type: 'article',
    publishedAt: '2024-01-14T00:00:00Z',
    externalLink: 'https://mercola.com/vitamin-d-cancer-prevention',
    views: 8900,
    shares: 1234,
    featured: true,
    tags: ['vitamin-d', 'cancer-prevention', 'nutrition', 'research']
  }
];

export const getPostsByType = (type: string) => {
  return socialPosts.filter(post => post.type === type);
};

export const getPostsByCondition = (conditionId: string) => {
  return socialPosts.filter(post => post.conditionId === conditionId);
};

export const getPostsByTreatment = (treatmentId: string) => {
  return socialPosts.filter(post => post.treatmentId === treatmentId);
};

export const getFeaturedPosts = () => {
  return socialPosts.filter(post => post.featured);
};

export const getPartnerPosts = () => {
  return socialPosts.filter(post => post.authorType === 'partner');
};

export const getUserPosts = () => {
  return socialPosts.filter(post => post.authorType === 'user');
};

export const getPostsByTag = (tag: string) => {
  return socialPosts.filter(post => post.tags.includes(tag));
}; 
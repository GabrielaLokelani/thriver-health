export interface Referral {
  id: string;
  referrerId: string;
  referrerType: 'user' | 'partner';
  referrerName: string;
  referredUserId: string;
  referredUserName: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  source: 'social' | 'partner-content' | 'testimonial' | 'direct' | 'organic';
  conditionId?: string;
  treatmentId?: string;
  partnerId?: string;
  revenueGenerated: number;
  commissionAmount: number;
  commissionRate: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  notes?: string;
}

export interface ReferralStats {
  totalReferrals: number;
  successfulReferrals: number;
  pendingReferrals: number;
  totalRevenue: number;
  totalCommissions: number;
  averageCommissionRate: number;
  conversionRate: number;
}

export const referrals: Referral[] = [
  {
    id: 'ref-1',
    referrerId: 'dr-makis',
    referrerType: 'partner',
    referrerName: 'Dr. William Makis',
    referredUserId: 'user-123',
    referredUserName: 'Michael R.',
    status: 'completed',
    source: 'partner-content',
    conditionId: 'prostate-cancer',
    treatmentId: 'ivermectin',
    partnerId: 'dr-makis',
    revenueGenerated: 2500,
    commissionAmount: 375,
    commissionRate: 15,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    completedAt: '2024-01-15T00:00:00Z',
    notes: 'Patient found Dr. Makis through his Substack article on antiparasitics'
  },
  {
    id: 'ref-2',
    referrerId: 'user-456',
    referrerType: 'user',
    referrerName: 'Sarah L.',
    referredUserId: 'user-789',
    referredUserName: 'David K.',
    status: 'active',
    source: 'testimonial',
    conditionId: 'multiple-sclerosis',
    treatmentId: 'stem-cell-therapy',
    revenueGenerated: 0,
    commissionAmount: 0,
    commissionRate: 10,
    createdAt: '2024-01-12T00:00:00Z',
    updatedAt: '2024-01-12T00:00:00Z',
    notes: 'Referred through MS testimonial sharing'
  },
  {
    id: 'ref-3',
    referrerId: 'dr-mercola',
    referrerType: 'partner',
    referrerName: 'Dr. Joseph Mercola',
    referredUserId: 'user-101',
    referredUserName: 'Jennifer M.',
    status: 'active',
    source: 'partner-content',
    conditionId: 'vitamin-d-deficiency',
    treatmentId: 'vitamin-d',
    partnerId: 'dr-mercola',
    revenueGenerated: 1200,
    commissionAmount: 144,
    commissionRate: 12,
    createdAt: '2024-01-14T00:00:00Z',
    updatedAt: '2024-01-14T00:00:00Z',
    notes: 'Patient discovered through vitamin D research article'
  },
  {
    id: 'ref-4',
    referrerId: 'user-123',
    referrerType: 'user',
    referrerName: 'Michael R.',
    referredUserId: 'user-202',
    referredUserName: 'Robert T.',
    status: 'pending',
    source: 'social',
    conditionId: 'prostate-cancer',
    treatmentId: 'ivermectin',
    revenueGenerated: 0,
    commissionAmount: 0,
    commissionRate: 10,
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
    notes: 'Referred through social media post about PSA reduction'
  }
];

export const getReferralsByReferrer = (referrerId: string) => {
  return referrals.filter(ref => ref.referrerId === referrerId);
};

export const getReferralsByPartner = (partnerId: string) => {
  return referrals.filter(ref => ref.partnerId === partnerId);
};

export const getReferralsByStatus = (status: string) => {
  return referrals.filter(ref => ref.status === status);
};

export const getReferralStats = (userId?: string): ReferralStats => {
  const userReferrals = userId ? referrals.filter(ref => ref.referrerId === userId) : referrals;
  
  const totalReferrals = userReferrals.length;
  const successfulReferrals = userReferrals.filter(ref => ref.status === 'completed').length;
  const pendingReferrals = userReferrals.filter(ref => ref.status === 'pending').length;
  const totalRevenue = userReferrals.reduce((sum, ref) => sum + ref.revenueGenerated, 0);
  const totalCommissions = userReferrals.reduce((sum, ref) => sum + ref.commissionAmount, 0);
  const averageCommissionRate = totalReferrals > 0 
    ? userReferrals.reduce((sum, ref) => sum + ref.commissionRate, 0) / totalReferrals 
    : 0;
  const conversionRate = totalReferrals > 0 ? (successfulReferrals / totalReferrals) * 100 : 0;

  return {
    totalReferrals,
    successfulReferrals,
    pendingReferrals,
    totalRevenue,
    totalCommissions,
    averageCommissionRate,
    conversionRate
  };
};

export const getTopReferrers = (limit: number = 10) => {
  const referrerStats = referrals.reduce((acc, ref) => {
    if (!acc[ref.referrerId]) {
      acc[ref.referrerId] = {
        referrerId: ref.referrerId,
        referrerName: ref.referrerName,
        referrerType: ref.referrerType,
        totalReferrals: 0,
        successfulReferrals: 0,
        totalRevenue: 0,
        totalCommissions: 0
      };
    }
    
    acc[ref.referrerId].totalReferrals++;
    if (ref.status === 'completed') {
      acc[ref.referrerId].successfulReferrals++;
    }
    acc[ref.referrerId].totalRevenue += ref.revenueGenerated;
    acc[ref.referrerId].totalCommissions += ref.commissionAmount;
    
    return acc;
  }, {} as Record<string, any>);

  return Object.values(referrerStats)
    .sort((a, b) => b.totalCommissions - a.totalCommissions)
    .slice(0, limit);
}; 
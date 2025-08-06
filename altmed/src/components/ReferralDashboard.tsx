import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  CheckCircle, 
  Clock,
  ArrowUpRight,
  Filter,
  Calendar
} from 'lucide-react';
import { referrals, getReferralStats, getTopReferrers } from '../data/referrals';
import { storage } from '../utils/storage';

interface ReferralDashboardProps {
  userId?: string;
}

const ReferralDashboard: React.FC<ReferralDashboardProps> = ({ userId }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [userProfile] = useState(storage.getUserProfile());
  
  const currentUserId = userId || userProfile?.id || 'user-123';
  const stats = getReferralStats(currentUserId);
  const userReferrals = referrals.filter(ref => ref.referrerId === currentUserId);
  const topReferrers = getTopReferrers(5);

  const filteredReferrals = userReferrals.filter(ref => {
    if (activeFilter === 'all') return true;
    return ref.status === activeFilter;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'active': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-sage-100 text-sage-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="modern-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm">Total Referrals</p>
              <p className="text-3xl font-bold text-sage-900">{stats.totalReferrals}</p>
            </div>
            <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center">
              <Users size={24} className="text-lavender-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="modern-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm">Successful Referrals</p>
              <p className="text-3xl font-bold text-green-600">{stats.successfulReferrals}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="modern-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-rose-600">{formatCurrency(stats.totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
              <DollarSign size={24} className="text-rose-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="modern-card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sage-600 text-sm">Commissions Earned</p>
              <p className="text-3xl font-bold text-lavender-600">{formatCurrency(stats.totalCommissions)}</p>
            </div>
            <div className="w-12 h-12 bg-lavender-100 rounded-full flex items-center justify-center">
              <TrendingUp size={24} className="text-lavender-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="modern-card p-8"
      >
        <h3 className="text-2xl font-bold text-sage-900 mb-6">Performance Metrics</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-sage-50 rounded-xl">
            <div className="text-4xl font-bold text-sage-900 mb-2">{stats.conversionRate.toFixed(1)}%</div>
            <div className="text-sage-600">Conversion Rate</div>
          </div>
          <div className="text-center p-6 bg-lavender-50 rounded-xl">
            <div className="text-4xl font-bold text-lavender-600 mb-2">{stats.averageCommissionRate.toFixed(1)}%</div>
            <div className="text-sage-600">Avg Commission Rate</div>
          </div>
          <div className="text-center p-6 bg-rose-50 rounded-xl">
            <div className="text-4xl font-bold text-rose-600 mb-2">{stats.pendingReferrals}</div>
            <div className="text-sage-600">Pending Referrals</div>
          </div>
        </div>
      </motion.div>

      {/* Referrals List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="modern-card p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-sage-900">Your Referrals</h3>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-sage-600" />
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value as any)}
              className="border border-sage-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReferrals.map((referral) => (
            <div key={referral.id} className="border border-sage-200 rounded-lg p-6 hover:bg-sage-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h4 className="font-semibold text-sage-900 mr-3">{referral.referredUserName}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(referral.status)}`}>
                      {referral.status}
                    </span>
                  </div>
                  <p className="text-sage-600 text-sm mb-2">{referral.notes}</p>
                  <div className="flex items-center text-sm text-sage-500">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(referral.createdAt)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-sage-900">{formatCurrency(referral.revenueGenerated)}</div>
                  <div className="text-sm text-lavender-600">Revenue</div>
                  <div className="text-sm text-sage-600">Commission: {formatCurrency(referral.commissionAmount)}</div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredReferrals.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className="text-sage-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-sage-900 mb-2">No referrals yet</h4>
              <p className="text-sage-600">Start sharing your referral link to earn commissions</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Top Referrers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="modern-card p-8"
      >
        <h3 className="text-2xl font-bold text-sage-900 mb-6">Top Referrers</h3>
        <div className="space-y-4">
          {topReferrers.map((referrer, index) => (
            <div key={referrer.referrerId} className="flex items-center justify-between p-4 bg-sage-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-lavender-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-4">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-sage-900">{referrer.referrerName}</h4>
                  <p className="text-sm text-sage-600 capitalize">{referrer.referrerType}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-sage-900">{referrer.totalReferrals}</div>
                <div className="text-sm text-lavender-600">{formatCurrency(referrer.totalCommissions)}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Referral Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="modern-card p-8"
      >
        <h3 className="text-2xl font-bold text-sage-900 mb-6">Your Referral Link</h3>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={`https://thriverhealth.ai/ref/${currentUserId}`}
            readOnly
            className="flex-1 px-4 py-3 border border-sage-200 rounded-lg bg-sage-50 text-sage-700"
          />
          <button className="bg-gradient-to-r from-lavender-500 to-rose-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center">
            <ArrowUpRight size={20} className="mr-2" />
            Copy Link
          </button>
        </div>
        <p className="text-sage-600 text-sm mt-3">
          Share this link with others to earn commissions on their purchases and subscriptions
        </p>
      </motion.div>
    </div>
  );
};

export default ReferralDashboard; 
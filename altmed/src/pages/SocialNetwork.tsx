import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  User, 
  Users, 
  TrendingUp,
  Filter,
  Search,
  Plus,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { socialPosts, userProfiles } from '../data/social';
import { partners } from '../data/partners';
import { storage } from '../utils/storage';

interface SocialNetworkProps {}

const SocialNetwork: React.FC<SocialNetworkProps> = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'partners' | 'trending'>('feed');
  const [filterType, setFilterType] = useState<'all' | 'partners' | 'users'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile] = useState(storage.getUserProfile());

  const filteredPosts = socialPosts.filter(post => {
    if (filterType === 'partners') return post.authorType === 'partner';
    if (filterType === 'users') return post.authorType === 'user';
    return true;
  }).filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getCurrentUser = () => {
    return userProfiles.find(user => user.id === userProfile?.id) || userProfiles[0];
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-nature">
      {/* Header */}
      <section className="bg-gradient-to-r from-lavender-500 to-rose-500 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Health Community
              </h1>
              <p className="text-xl opacity-90">
                Connect with thought leaders like Dr. Makis, share your health journey, and earn rewards through our referral program
              </p>
            </div>
            <button className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center">
              <Plus size={20} className="mr-2" />
              Share & Earn
            </button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - User Profile & Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="modern-card p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-lavender-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                  {getCurrentUser()?.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-sage-900">{getCurrentUser()?.name}</h3>
                  <p className="text-sm text-sage-600">{getCurrentUser()?.bio}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-lavender-600">{getCurrentUser()?.followers}</div>
                  <div className="text-sm text-sage-600">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-rose-600">{getCurrentUser()?.posts}</div>
                  <div className="text-sm text-sage-600">Posts</div>
                </div>
              </div>
            </div>

            {/* Partner Highlights */}
            <div className="modern-card p-6">
              <h3 className="text-lg font-semibold text-sage-900 mb-4 flex items-center">
                <Users size={20} className="mr-2 text-lavender-600" />
                Featured Partners
              </h3>
              <div className="space-y-4">
                {partners.filter(p => p.featured).slice(0, 3).map(partner => (
                  <div key={partner.id} className="flex items-center p-3 bg-sage-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-lavender-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                      {partner.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sage-900 text-sm">{partner.name}</div>
                      <div className="text-xs text-sage-600">{partner.specialization}</div>
                    </div>
                    {partner.verified && (
                      <CheckCircle size={16} className="text-lavender-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Tabs */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex space-x-1 bg-sage-100 p-1 rounded-lg">
                {[
                  { id: 'feed', label: 'Community Feed', icon: Users },
                  { id: 'partners', label: 'Partner Content', icon: User },
                  { id: 'trending', label: 'Trending', icon: TrendingUp }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center ${
                      activeTab === tab.id
                        ? 'bg-white text-sage-900 shadow-sm'
                        : 'text-sage-600 hover:text-sage-900'
                    }`}
                  >
                    <tab.icon size={16} className="mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400" />
                  <input
                    type="text"
                    placeholder="Search posts, tags, users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter size={20} className="text-sage-600" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as any)}
                    className="border border-sage-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                  >
                    <option value="all">All Posts</option>
                    <option value="partners">Partners Only</option>
                    <option value="users">Users Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="modern-card p-6"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-lavender-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {post.authorName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold text-sage-900">{post.authorName}</h3>
                          {post.verified && (
                            <CheckCircle size={16} className="text-lavender-600 ml-2" />
                          )}
                          {post.authorType === 'partner' && (
                            <span className="ml-2 px-2 py-1 bg-lavender-100 text-lavender-700 text-xs rounded-full">
                              Partner
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-sage-600">
                          {formatTimeAgo(post.createdAt)}
                          {post.location && ` • ${post.location}`}
                        </div>
                      </div>
                    </div>
                    
                    <button className="text-sage-400 hover:text-sage-600">
                      <Bookmark size={20} />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-sage-900 leading-relaxed">{post.content}</p>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-sage-100 text-sage-700 text-sm rounded-full hover:bg-sage-200 cursor-pointer"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* External Link for Partners */}
                  {post.authorType === 'partner' && (
                    <div className="mb-4 p-3 bg-lavender-50 border border-lavender-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-lavender-700">
                          Read full article on {post.authorName}'s platform
                        </span>
                        <button className="flex items-center text-lavender-600 hover:text-lavender-700 text-sm">
                          <ExternalLink size={16} className="mr-1" />
                          View
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-sage-200">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center text-sage-600 hover:text-rose-600 transition-colors">
                        <Heart size={20} className="mr-2" />
                        {post.likes}
                      </button>
                      <button className="flex items-center text-sage-600 hover:text-lavender-600 transition-colors">
                        <MessageCircle size={20} className="mr-2" />
                        {post.comments.length}
                      </button>
                      <button className="flex items-center text-sage-600 hover:text-sage-800 transition-colors">
                        <Share2 size={20} className="mr-2" />
                        {post.shares}
                      </button>
                    </div>
                    
                    <div className="text-sm text-sage-500">
                      {post.views} views
                    </div>
                  </div>

                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-sage-200">
                      <div className="space-y-3">
                        {post.comments.slice(0, 2).map(comment => (
                          <div key={comment.id} className="flex items-start space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-sage-400 to-sage-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {comment.authorName.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center mb-1">
                                <span className="font-medium text-sage-900 text-sm">{comment.authorName}</span>
                                <span className="text-xs text-sage-500 ml-2">{formatTimeAgo(comment.createdAt)}</span>
                              </div>
                              <p className="text-sage-700 text-sm">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                        {post.comments.length > 2 && (
                          <button className="text-sm text-lavender-600 hover:text-lavender-700">
                            View all {post.comments.length} comments
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-lavender-500 to-rose-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                Load More Posts
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SocialNetwork; 
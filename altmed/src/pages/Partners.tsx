import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ExternalLink, 
  CheckCircle, 
  MessageSquare,
  BookOpen,
  Video,
  FileText,
  Filter,
  Search,
  Globe,
  Twitter,
  Youtube
} from 'lucide-react';
import { partners } from '../data/partners';
import { partnerContent } from '../data/social';

interface PartnersProps {}

const Partners: React.FC<PartnersProps> = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'practitioner' | 'influencer' | 'researcher' | 'thought-leader'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPartners = partners.filter(partner => {
    if (activeFilter !== 'all' && partner.type !== activeFilter) return false;
    if (searchQuery) {
      return partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             partner.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
             partner.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return true;
  });

  const getPartnerContent = (partnerId: string) => {
    return partnerContent.filter(content => content.partnerId === partnerId);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-nature">
      {/* Header */}
      <section className="bg-gradient-to-r from-lavender-500 to-rose-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">
              Partner Network
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Connect with leading alternative health practitioners, researchers, and thought leaders like Dr. Makis. 
              Share content, earn commissions, and grow your audience through our social network.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">{partners.length}</div>
                <div className="text-sm opacity-90">Verified Partners</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">{formatNumber(partners.reduce((sum, p) => sum + p.referralStats.totalReferrals, 0))}</div>
                <div className="text-sm opacity-90">Total Referrals</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-6 rounded-xl">
                <div className="text-3xl font-bold mb-2">${formatNumber(partners.reduce((sum, p) => sum + p.referralStats.revenueGenerated, 0))}</div>
                <div className="text-sm opacity-90">Revenue Generated</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400" />
                <input
                  type="text"
                  placeholder="Search partners, specializations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-sage-200 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-sage-600" />
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value as any)}
                  aria-label="Filter partners by type"
                  className="border border-sage-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                >
                  <option value="all">All Partners</option>
                  <option value="practitioner">Practitioners</option>
                  <option value="influencer">Influencers</option>
                  <option value="researcher">Researchers</option>
                  <option value="thought-leader">Thought Leaders</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="modern-card p-8"
            >
              {/* Partner Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-lavender-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
                    {partner.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-sage-900 mr-3">{partner.name}</h3>
                      {partner.verified && (
                        <CheckCircle size={20} className="text-lavender-600" />
                      )}
                      {partner.featured && (
                        <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs rounded-full ml-2">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-sage-600">{partner.title}</p>
                    <p className="text-sm text-sage-500">{partner.location}</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-sage-700 mb-6 leading-relaxed">{partner.bio}</p>

              {/* Specialization & Tags */}
              <div className="mb-6">
                <h4 className="font-semibold text-sage-900 mb-3">Specialization</h4>
                <p className="text-sage-700 mb-3">{partner.specialization}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-sage-100 text-sage-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Stats */}
              <div className="mb-6">
                <h4 className="font-semibold text-sage-900 mb-3">Content & Impact</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-lavender-50 rounded-lg">
                    <FileText size={20} className="text-lavender-600 mr-3" />
                    <div>
                      <div className="font-semibold text-sage-900">{partner.content.publishedArticles}</div>
                      <div className="text-xs text-sage-600">Articles</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-rose-50 rounded-lg">
                    <MessageSquare size={20} className="text-rose-600 mr-3" />
                    <div>
                      <div className="font-semibold text-sage-900">{partner.content.patientTestimonials}</div>
                      <div className="text-xs text-sage-600">Testimonials</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-sand-50 rounded-lg">
                    <BookOpen size={20} className="text-sand-600 mr-3" />
                    <div>
                      <div className="font-semibold text-sage-900">{partner.content.researchPapers}</div>
                      <div className="text-xs text-sage-600">Research Papers</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-sage-50 rounded-lg">
                    <Video size={20} className="text-sage-600 mr-3" />
                    <div>
                      <div className="font-semibold text-sage-900">{partner.content.videos}</div>
                      <div className="text-xs text-sage-600">Videos</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Referral Stats */}
              <div className="mb-6">
                <h4 className="font-semibold text-sage-900 mb-3">Referral Performance</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{partner.referralStats.totalReferrals}</div>
                    <div className="text-xs text-sage-600">Total Referrals</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{partner.referralStats.successfulReferrals}</div>
                    <div className="text-xs text-sage-600">Successful</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">${formatNumber(partner.referralStats.revenueGenerated)}</div>
                    <div className="text-xs text-sage-600">Revenue</div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              {Object.keys(partner.socialMedia).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sage-900 mb-3">Connect</h4>
                  <div className="flex space-x-3">
                    {partner.socialMedia.website && (
                      <a
                        href={partner.socialMedia.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-sage-100 text-sage-700 rounded-lg hover:bg-sage-200 transition-colors"
                      >
                        <Globe size={20} />
                      </a>
                    )}
                    {partner.socialMedia.twitter && (
                      <a
                        href={`https://twitter.com/${partner.socialMedia.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Twitter size={20} />
                      </a>
                    )}
                    {partner.socialMedia.youtube && (
                      <a
                        href={`https://youtube.com/${partner.socialMedia.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <Youtube size={20} />
                      </a>
                    )}
                    {partner.socialMedia.substack && (
                      <a
                        href={partner.socialMedia.substack}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-sm font-medium"
                      >
                        Substack
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Latest Content */}
              {getPartnerContent(partner.id).length > 0 && (
                <div>
                  <h4 className="font-semibold text-sage-900 mb-3">Latest Content</h4>
                  <div className="space-y-3">
                    {getPartnerContent(partner.id).slice(0, 2).map(content => (
                      <div key={content.id} className="p-3 bg-sage-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-sage-900 text-sm">{content.title}</h5>
                            <p className="text-xs text-sage-600">{content.type}</p>
                          </div>
                          <a
                            href={content.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lavender-600 hover:text-lavender-700"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <div className="modern-card p-8">
            <h3 className="text-2xl font-bold text-sage-900 mb-4">
              Become a Partner
            </h3>
            <p className="text-sage-600 mb-6 max-w-2xl mx-auto">
              Join our network of alternative health practitioners, researchers, and thought leaders like Dr. Makis. 
              Share your content on Substack and other platforms, earn commissions through our referral program, and grow your audience through our social network.
            </p>
            <button className="bg-gradient-to-r from-lavender-500 to-rose-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300">
              Apply to Join
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners; 
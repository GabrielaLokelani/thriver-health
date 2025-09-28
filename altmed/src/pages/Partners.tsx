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
    <div className="min-h-screen bg-warm-800">
      {/* Header */}
      <section className="bg-electric-500 text-white py-12 relative overflow-hidden">
        {/* Tech background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-1"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-electric-400 to-transparent animate-scan"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-4 font-display text-white">
              PARTNER NETWORK
            </h1>
            <p className="text-xl opacity-90 mb-8 font-modern">
              Connect with leading alternative health practitioners, researchers, and thought leaders like Dr. Makis. 
              Share content, earn commissions, and grow your audience through our social network.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-warm-700/40 backdrop-blur-sm p-6 rounded-xl border border-electric-500/20 hover:border-electric-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/10">
                <div className="text-3xl font-bold mb-2 font-tech text-electric-400">{partners.length}</div>
                <div className="text-sm opacity-90 font-modern">VERIFIED PARTNERS</div>
              </div>
              <div className="bg-warm-700/40 backdrop-blur-sm p-6 rounded-xl border border-lime-500/20 hover:border-lime-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-lime-500/10">
                <div className="text-3xl font-bold mb-2 font-tech text-lime-400">{formatNumber(partners.reduce((sum, p) => sum + p.referralStats.totalReferrals, 0))}</div>
                <div className="text-sm opacity-90 font-modern">TOTAL REFERRALS</div>
              </div>
              <div className="bg-warm-700/40 backdrop-blur-sm p-6 rounded-xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <div className="text-3xl font-bold mb-2 font-tech text-orange-400">${formatNumber(partners.reduce((sum, p) => sum + p.referralStats.revenueGenerated, 0))}</div>
                <div className="text-sm opacity-90 font-modern">REVENUE GENERATED</div>
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
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-electric-400" />
                <input
                  type="text"
                  placeholder="Search partners, specializations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-warm-700/50 border border-electric-500/30 rounded-lg focus:ring-2 focus:ring-electric-400 focus:border-electric-400 text-white placeholder-warm-400 backdrop-blur-sm font-modern"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-lime-400" />
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value as any)}
                  aria-label="Filter partners by type"
                  className="bg-warm-700/50 border border-lime-500/30 rounded-lg px-3 py-3 focus:ring-2 focus:ring-lime-400 focus:border-lime-400 text-white font-modern backdrop-blur-sm"
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
              className="bg-warm-700/40 backdrop-blur-sm p-8 rounded-xl border border-warm-600/50 hover:border-electric-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/10"
            >
              {/* Partner Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-bright-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 animate-cyber-pulse">
                    {partner.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-white mr-3 font-display">{partner.name}</h3>
                      {partner.verified && (
                        <CheckCircle size={20} className="text-electric-400" />
                      )}
                      {partner.featured && (
                        <span className="px-2 py-1 bg-neon-500/20 text-neon-400 text-xs rounded-full ml-2 border border-neon-500/30 font-tech">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <p className="text-warm-300 font-modern">{partner.title}</p>
                    <p className="text-sm text-warm-400 font-tech">{partner.location}</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-warm-300 mb-6 leading-relaxed font-modern">{partner.bio}</p>

              {/* Specialization & Tags */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3 font-display">SPECIALIZATION</h4>
                <p className="text-warm-300 mb-3 font-modern">{partner.specialization}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-electric-500/20 text-electric-400 text-sm rounded-full border border-electric-500/30 font-tech">
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Stats */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3 font-display">CONTENT & IMPACT</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center p-3 bg-bright-500/10 rounded-lg border border-bright-500/20">
                    <FileText size={20} className="text-bright-400 mr-3" />
                    <div>
                      <div className="font-semibold text-white font-tech">{partner.content.publishedArticles}</div>
                      <div className="text-xs text-warm-400 font-modern">ARTICLES</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-lime-500/10 rounded-lg border border-lime-500/20">
                    <MessageSquare size={20} className="text-lime-400 mr-3" />
                    <div>
                      <div className="font-semibold text-white font-tech">{partner.content.patientTestimonials}</div>
                      <div className="text-xs text-warm-400 font-modern">TESTIMONIALS</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <BookOpen size={20} className="text-orange-400 mr-3" />
                    <div>
                      <div className="font-semibold text-white font-tech">{partner.content.researchPapers}</div>
                      <div className="text-xs text-warm-400 font-modern">RESEARCH PAPERS</div>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-violet-500/10 rounded-lg border border-violet-500/20">
                    <Video size={20} className="text-violet-400 mr-3" />
                    <div>
                      <div className="font-semibold text-white font-tech">{partner.content.videos}</div>
                      <div className="text-xs text-warm-400 font-modern">VIDEOS</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Referral Stats */}
              <div className="mb-6">
                <h4 className="font-semibold text-white mb-3 font-display">REFERRAL PERFORMANCE</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-lime-500/10 rounded-lg border border-lime-500/20">
                    <div className="text-2xl font-bold text-lime-400 font-tech">{partner.referralStats.totalReferrals}</div>
                    <div className="text-xs text-warm-400 font-modern">TOTAL REFERRALS</div>
                  </div>
                  <div className="p-3 bg-bright-500/10 rounded-lg border border-bright-500/20">
                    <div className="text-2xl font-bold text-bright-400 font-tech">{partner.referralStats.successfulReferrals}</div>
                    <div className="text-xs text-warm-400 font-modern">SUCCESSFUL</div>
                  </div>
                  <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <div className="text-2xl font-bold text-orange-400 font-tech">${formatNumber(partner.referralStats.revenueGenerated)}</div>
                    <div className="text-xs text-warm-400 font-modern">REVENUE</div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              {Object.keys(partner.socialMedia).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3 font-display">CONNECT</h4>
                  <div className="flex space-x-3">
                    {partner.socialMedia.website && (
                      <a
                        href={partner.socialMedia.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-warm-600/50 text-warm-300 rounded-lg hover:bg-electric-500/20 hover:text-electric-400 transition-colors border border-warm-500/50 hover:border-electric-500/50"
                      >
                        <Globe size={20} />
                      </a>
                    )}
                    {partner.socialMedia.twitter && (
                      <a
                        href={`https://twitter.com/${partner.socialMedia.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-warm-600/50 text-warm-300 rounded-lg hover:bg-lime-500/20 hover:text-lime-400 transition-colors border border-warm-500/50 hover:border-lime-500/50"
                      >
                        <Twitter size={20} />
                      </a>
                    )}
                    {partner.socialMedia.youtube && (
                      <a
                        href={`https://youtube.com/${partner.socialMedia.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-warm-600/50 text-warm-300 rounded-lg hover:bg-violet-500/20 hover:text-violet-400 transition-colors border border-warm-500/50 hover:border-violet-500/50"
                      >
                        <Youtube size={20} />
                      </a>
                    )}
                    {partner.socialMedia.substack && (
                      <a
                        href={partner.socialMedia.substack}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 bg-warm-600/50 text-warm-300 rounded-lg hover:bg-orange-500/20 hover:text-orange-400 transition-colors text-sm font-tech border border-warm-500/50 hover:border-orange-500/50"
                      >
                        SUBSTACK
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Latest Content */}
              {getPartnerContent(partner.id).length > 0 && (
                <div>
                  <h4 className="font-semibold text-white mb-3 font-display">LATEST CONTENT</h4>
                  <div className="space-y-3">
                    {getPartnerContent(partner.id).slice(0, 2).map(content => (
                      <div key={content.id} className="p-3 bg-warm-600/30 rounded-lg border border-warm-500/30">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium text-white text-sm font-modern">{content.title}</h5>
                            <p className="text-xs text-warm-400 font-tech">{content.type.toUpperCase()}</p>
                          </div>
                          <a
                            href={content.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-electric-400 hover:text-electric-300 transition-colors"
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
          <div className="bg-warm-700/40 backdrop-blur-sm p-8 rounded-xl border border-warm-600/50 hover:border-electric-500/50 transition-all duration-300">
            <h3 className="text-3xl font-bold text-white mb-4 font-display text-orange-400">
              BECOME A PARTNER
            </h3>
            <p className="text-warm-300 mb-6 max-w-2xl mx-auto font-modern">
              Join our network of alternative health practitioners, researchers, and thought leaders like Dr. Makis. 
              Share your content on Substack and other platforms, earn commissions through our referral program, and grow your audience through our social network.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 font-display text-lg">
              APPLY TO JOIN
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Partners; 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, FileText, Users, Star, AlertTriangle, CheckCircle, ExternalLink, MessageSquare } from 'lucide-react';
import { conditions, treatments, getConditionById, getTreatmentsByCondition } from '../data/conditions';
import { getTestimonialsByCondition, getTestimonialsByTreatment } from '../data/testimonials';

interface SearchResult {
  type: 'condition' | 'treatment';
  id: string;
  name: string;
  description: string;
  relevance: number;
  data: any;
}

interface AIAnalysis {
  summary: string;
  effectiveness: {
    average: number;
    range: string;
    confidence: number;
  };
  consensus: string;
  risks: string[];
  benefits: string[];
  recommendations: string[];
  researchGaps: string[];
}

const SearchAndAnalysis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'testimonials' | 'research' | 'analysis'>('overview');

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Search conditions
    conditions.forEach(condition => {
      if (condition.name.toLowerCase().includes(lowerQuery) ||
          condition.description.toLowerCase().includes(lowerQuery) ||
          condition.alternativeTreatments.some(t => t.toLowerCase().includes(lowerQuery))) {
        results.push({
          type: 'condition',
          id: condition.id,
          name: condition.name,
          description: condition.description,
          relevance: 8,
          data: condition
        });
      }
    });

    // Search treatments
    treatments.forEach(treatment => {
      if (treatment.name.toLowerCase().includes(lowerQuery) ||
          treatment.description.toLowerCase().includes(lowerQuery) ||
          treatment.conditions.some(c => {
            const condition = getConditionById(c);
            return condition?.name.toLowerCase().includes(lowerQuery);
          })) {
        results.push({
          type: 'treatment',
          id: treatment.id,
          name: treatment.name,
          description: treatment.description,
          relevance: 9,
          data: treatment
        });
      }
    });

    // Sort by relevance
    results.sort((a, b) => b.relevance - a.relevance);
    setSearchResults(results);
  };

  const generateAIAnalysis = (result: SearchResult) => {
    setIsLoading(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      let analysis: AIAnalysis;
      
      if (result.type === 'treatment') {
        const treatment = result.data;
        const relatedTestimonials = getTestimonialsByTreatment(result.id);
        const avgEffectiveness = relatedTestimonials.length > 0 
          ? relatedTestimonials.reduce((sum, t) => sum + t.experience.overallEffectiveness, 0) / relatedTestimonials.length
          : treatment.effectiveness.overall;

        analysis = {
          summary: `Based on ${relatedTestimonials.length} user testimonials and ${treatment.researchCount} research studies, ${treatment.name} shows ${avgEffectiveness >= 7 ? 'promising' : avgEffectiveness >= 5 ? 'moderate' : 'limited'} effectiveness for its indicated conditions.`,
          effectiveness: {
            average: avgEffectiveness,
            range: `${Math.max(1, avgEffectiveness - 2)}-${Math.min(10, avgEffectiveness + 2)}/10`,
            confidence: Math.min(95, 70 + relatedTestimonials.length * 2)
          },
          consensus: `Users generally report ${avgEffectiveness >= 7 ? 'positive' : avgEffectiveness >= 5 ? 'mixed' : 'negative'} experiences with ${treatment.name}. The most common benefits include ${treatment.sideEffects.length > 0 ? 'reduced symptoms' : 'symptom improvement'}, while side effects are typically ${treatment.sideEffects.length > 0 ? 'manageable' : 'minimal'}.`,
          risks: treatment.sideEffects,
          benefits: ['Potential symptom improvement', 'Alternative to conventional treatments', 'Natural approach'],
          recommendations: [
            'Consult with healthcare provider before starting',
            'Start with low dose and titrate up',
            'Monitor for side effects',
            'Combine with lifestyle modifications'
          ],
          researchGaps: [
            'Limited large-scale clinical trials',
            'Long-term safety data needed',
            'Optimal dosing protocols unclear'
          ]
        };
      } else {
        const condition = result.data;
        const relatedTreatments = getTreatmentsByCondition(result.id);
        const relatedTestimonials = getTestimonialsByCondition(result.id);
        const avgEffectiveness = relatedTestimonials.length > 0 
          ? relatedTestimonials.reduce((sum, t) => sum + t.experience.overallEffectiveness, 0) / relatedTestimonials.length
          : 6;

        analysis = {
          summary: `${condition.name} affects ${relatedTestimonials.length} users in our community, with ${relatedTreatments.length} alternative treatment options available.`,
          effectiveness: {
            average: avgEffectiveness,
            range: `${Math.max(1, avgEffectiveness - 2)}-${Math.min(10, avgEffectiveness + 2)}/10`,
            confidence: Math.min(95, 60 + relatedTestimonials.length * 3)
          },
          consensus: `Community members report varying success with alternative treatments for ${condition.name}. Conventional treatments remain the standard of care, but alternative options show promise for some individuals.`,
          risks: ['Treatment interactions', 'Delayed conventional care', 'Unproven efficacy'],
          benefits: ['Holistic approach', 'Reduced side effects', 'Personalized treatment'],
          recommendations: [
            'Work with healthcare team',
            'Research treatment options thoroughly',
            'Monitor progress closely',
            'Consider conventional treatments first'
          ],
          researchGaps: [
            'More clinical trials needed',
            'Long-term outcome studies',
            'Standardized treatment protocols'
          ]
        };
      }

      setAiAnalysis(analysis);
      setIsLoading(false);
    }, 2000);
  };

  const handleResultSelect = (result: SearchResult) => {
    setSelectedResult(result);
    generateAIAnalysis(result);
    setActiveTab('overview');
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-nature">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold text-sage-900 mb-4"
              >
                AI-Powered Research Database
              </motion.h1>
              <p className="text-lg text-sage-600">
                Search verified alternative therapies, analyze community experiences, and access AI-powered insights for serious diseases. Connect with thought leaders like Dr. Makis and share your journey.
              </p>
            </div>
            <Link
              to="/create-testimonial"
              className="btn-primary flex items-center"
            >
              <MessageSquare size={20} className="mr-2" />
              Share Experience
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search Bar */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="modern-card p-8"
          >
            <div className="relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-400" />
                              <input
                  type="text"
                  placeholder="Search for conditions, treatments, or symptoms (e.g., 'ivermectin cancer', 'methylene blue MS', 'prostate cancer alternative')"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent text-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
                />
            </div>
          </motion.div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Results */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="modern-card p-8"
            >
              <h2 className="text-2xl font-bold text-sage-900 mb-6">
                Search Results
              </h2>
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultSelect(result)}
                    className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                      selectedResult?.id === result.id
                        ? 'border-lavender-500 bg-lavender-50 shadow-lg'
                        : 'border-sage-200 hover:border-sage-300 hover:bg-sage-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                            result.type === 'condition' ? 'bg-rose-500' : 'bg-lavender-500'
                          }`} />
                          <span className="text-sm text-sage-500 uppercase font-medium">
                            {result.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-sage-900 mb-3">
                          {result.name}
                        </h3>
                        <p className="text-base text-sage-600 line-clamp-2 leading-relaxed">
                          {result.description}
                        </p>
                      </div>
                      <Star size={18} className="text-yellow-400 ml-3" />
                    </div>
                  </button>
                ))}
                {searchResults.length === 0 && searchTerm && (
                  <div className="text-center py-12 text-sage-500">
                    <Search size={48} className="mx-auto mb-6 text-sage-300" />
                    <p className="text-lg">No results found for "{searchTerm}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Results Detail */}
          <div className="lg:col-span-2">
            {selectedResult ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="modern-card p-8"
              >
                {/* Tabs */}
                <div className="flex space-x-2 bg-sage-100 p-2 rounded-xl mb-8">
                  {[
                    { id: 'overview', label: 'Overview', icon: TrendingUp },
                    { id: 'testimonials', label: 'Testimonials', icon: Users },
                    { id: 'research', label: 'Research', icon: FileText },
                    { id: 'analysis', label: 'AI Analysis', icon: Star }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 py-3 px-6 rounded-lg text-base font-medium transition-all duration-300 flex items-center justify-center ${
                        activeTab === tab.id
                          ? 'bg-white text-sage-900 shadow-lg'
                          : 'text-sage-600 hover:text-sage-900 hover:bg-white/50'
                      }`}
                    >
                      <tab.icon size={18} className="mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div>
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold text-sage-900 mb-4">
                        {selectedResult.name}
                      </h2>
                      <p className="text-lg text-sage-600 mb-6 leading-relaxed">
                        {selectedResult.description}
                      </p>
                      
                      {selectedResult.type === 'treatment' && (
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                          <div className="bg-sage-50 p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-sage-900 mb-3">Dosage Information</h3>
                            <p className="text-base text-sage-600 leading-relaxed">
                              {selectedResult.data.dosageInfo || 'Consult healthcare provider for dosing'}
                            </p>
                          </div>
                          <div className="bg-sage-50 p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-sage-900 mb-3">Where to Buy</h3>
                            <p className="text-base text-sage-600 leading-relaxed">
                              {selectedResult.data.whereToBuy || 'Prescription required'}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 bg-lavender-50 rounded-xl">
                          <div className="text-3xl font-bold text-lavender-600 mb-2">
                            {selectedResult.data.researchCount}
                          </div>
                          <div className="text-base text-sage-600">Research Studies</div>
                        </div>
                        <div className="text-center p-6 bg-sand-50 rounded-xl">
                          <div className="text-3xl font-bold text-sand-600 mb-2">
                            {selectedResult.data.testimonialCount}
                          </div>
                          <div className="text-base text-sage-600">User Testimonials</div>
                        </div>
                        <div className="text-center p-6 bg-rose-50 rounded-xl">
                          <div className="text-3xl font-bold text-rose-600 mb-2">
                            {selectedResult.type === 'treatment' ? selectedResult.data.effectiveness.overall : 'N/A'}
                          </div>
                          <div className="text-base text-sage-600">Effectiveness Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'testimonials' && (
                  <div>
                    <h3 className="text-2xl font-bold text-sage-900 mb-6">
                      Community Experiences
                    </h3>
                    <div className="space-y-6">
                      {getTestimonialsByTreatment(selectedResult.id).map((testimonial) => (
                        <div key={testimonial.id} className="border border-sage-200 rounded-xl p-6 hover-lift">
                          <div className="flex items-start justify-between mb-4">
                            <h4 className="text-lg font-semibold text-sage-900">
                              {testimonial.title}
                            </h4>
                            <div className="flex items-center">
                              <Star size={18} className="text-yellow-400 mr-2" />
                              <span className="text-base text-sage-600">
                                {testimonial.experience.overallEffectiveness}/10
                              </span>
                            </div>
                          </div>
                          <p className="text-sage-600 text-base mb-4 line-clamp-3 leading-relaxed">
                            {testimonial.content}
                          </p>
                          <div className="flex items-center justify-between text-sm text-sage-500">
                            <span>By {testimonial.userName}</span>
                            <span>{new Date(testimonial.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'research' && (
                  <div>
                    <h3 className="text-xl font-bold text-sage-900 mb-4">
                      Research & Studies
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-sage-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-sage-900 mb-2">
                          Clinical Evidence
                        </h4>
                        <p className="text-sage-600 text-sm mb-3">
                          {selectedResult.data.researchCount} studies have been conducted on {selectedResult.name.toLowerCase()}.
                        </p>
                        <button className="text-lavender-600 hover:text-lavender-700 text-sm font-medium flex items-center">
                          View Research Papers
                          <ExternalLink size={14} className="ml-1" />
                        </button>
                      </div>
                      
                      <div className="bg-lavender-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-sage-900 mb-2">
                          Legal Status
                        </h4>
                        <div className="flex items-center">
                          {selectedResult.type === 'treatment' && (
                            <>
                              {selectedResult.data.legalStatus === 'approved' && (
                                <CheckCircle size={16} className="text-green-500 mr-2" />
                              )}
                              {selectedResult.data.legalStatus === 'off-label' && (
                                <AlertTriangle size={16} className="text-yellow-500 mr-2" />
                              )}
                              {selectedResult.data.legalStatus === 'experimental' && (
                                <AlertTriangle size={16} className="text-orange-500 mr-2" />
                              )}
                              <span className="text-sm text-sage-600 capitalize">
                                {selectedResult.data.legalStatus.replace('-', ' ')}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analysis' && (
                  <div>
                    <h3 className="text-xl font-bold text-sage-900 mb-4">
                      AI-Powered Analysis
                    </h3>
                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lavender-600 mx-auto mb-4"></div>
                        <p className="text-sage-600">Analyzing data and generating insights...</p>
                      </div>
                    ) : aiAnalysis ? (
                      <div className="space-y-6">
                        <div className="bg-gradient-to-r from-lavender-50 to-rose-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-sage-900 mb-2">Summary</h4>
                          <p className="text-sage-700">{aiAnalysis.summary}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-sage-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sage-900 mb-2">Effectiveness</h4>
                            <div className="text-2xl font-bold text-lavender-600 mb-1">
                              {aiAnalysis.effectiveness.average}/10
                            </div>
                            <p className="text-sm text-sage-600">
                              Range: {aiAnalysis.effectiveness.range} 
                              (Confidence: {aiAnalysis.effectiveness.confidence}%)
                            </p>
                          </div>
                          
                          <div className="bg-sage-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sage-900 mb-2">Community Consensus</h4>
                            <p className="text-sm text-sage-600">{aiAnalysis.consensus}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sage-900 mb-2">Benefits</h4>
                            <ul className="space-y-1">
                              {aiAnalysis.benefits.map((benefit, index) => (
                                <li key={index} className="text-sm text-sage-600 flex items-center">
                                  <CheckCircle size={14} className="text-green-500 mr-2" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="bg-red-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-sage-900 mb-2">Risks</h4>
                            <ul className="space-y-1">
                              {aiAnalysis.risks.map((risk, index) => (
                                <li key={index} className="text-sm text-sage-600 flex items-center">
                                  <AlertTriangle size={14} className="text-red-500 mr-2" />
                                  {risk}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-sage-900 mb-2">AI Recommendations</h4>
                          <ul className="space-y-1">
                            {aiAnalysis.recommendations.map((rec, index) => (
                              <li key={index} className="text-sm text-sage-600 flex items-center">
                                <Star size={14} className="text-blue-500 mr-2" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-sage-900 mb-2">Treatment Protocol</h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-sage-900 mb-2">Dosage Guide</h5>
                              <div className="text-sm text-sage-600 space-y-1">
                                <p><strong>Starting Dose:</strong> 0.2mg/kg</p>
                                <p><strong>Target Dose:</strong> 0.4mg/kg</p>
                                <p><strong>Frequency:</strong> Weekly to monthly</p>
                                <p><strong>Duration:</strong> 3-6 months minimum</p>
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-sage-900 mb-2">Where to Buy</h5>
                              <div className="space-y-2">
                                <button className="w-full text-left p-2 bg-white rounded border border-purple-200 hover:border-purple-300 transition-colors text-sm">
                                  <div className="font-medium text-sage-900">🏥 Pharmacy Grade</div>
                                  <div className="text-xs text-sage-600">Prescription required</div>
                                </button>
                                <button className="w-full text-left p-2 bg-white rounded border border-purple-200 hover:border-purple-300 transition-colors text-sm">
                                  <div className="font-medium text-sage-900">🛒 Veterinary Grade</div>
                                  <div className="text-xs text-sage-600">Available online</div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card text-center py-12"
              >
                <Search size={48} className="text-sage-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-900 mb-2">
                  Search for Insights
                </h3>
                <p className="text-sage-600">
                  Enter a condition or treatment above to get AI-powered analysis and community insights.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndAnalysis; 
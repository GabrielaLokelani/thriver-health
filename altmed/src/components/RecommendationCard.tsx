import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, Calendar, Star } from 'lucide-react';
import { Recommendation } from '../data/recommendations';
import { storage } from '../utils/storage';
import PlaceholderImage from './PlaceholderImage';

interface RecommendationCardProps {
  recommendation: Recommendation;
  onSave?: (id: string) => void;
  onRemove?: (id: string) => void;
  isSaved?: boolean;
  className?: string;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onSave,
  onRemove,
  isSaved = false,
  className = ''
}) => {
  const handleSaveToggle = () => {
    if (isSaved) {
      storage.removeRecommendation(recommendation.id);
      onRemove?.(recommendation.id);
    } else {
      storage.saveRecommendation(recommendation.id);
      onSave?.(recommendation.id);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'immediate': return 'bg-rose-100 text-rose-700';
      case 'weekly': return 'bg-sand-100 text-sand-700';
      case 'long-term': return 'bg-sage-100 text-sage-700';
      default: return 'bg-sage-100 text-sage-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical': return 'bg-lavender-100 text-lavender-700';
      case 'mental': return 'bg-sand-100 text-sand-700';
      case 'emotional': return 'bg-rose-100 text-rose-700';
      case 'spiritual': return 'bg-sage-100 text-sage-700';
      default: return 'bg-sage-100 text-sage-700';
    }
  };

  const getImageCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'herbs': return 'herbs';
      case 'meditation': return 'meditation';
      case 'yoga': return 'yoga';
      case 'crystals': return 'crystals';
      case 'tea': return 'tea';
      case 'physical': return 'wellness';
      case 'mental': return 'meditation';
      case 'emotional': return 'wellness';
      case 'spiritual': return 'crystals';
      default: return 'wellness';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`modern-card group hover-lift ${className}`}
    >
      <div className="p-8">
        <div className="mb-8">
          <PlaceholderImage 
            category={getImageCategory(recommendation.category)} 
            size="medium" 
            className="w-full"
            alt={recommendation.title}
          />
        </div>
        
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-6">
            <h3 className="text-xl font-semibold text-sage-900 mb-4">
              {recommendation.title}
            </h3>
            <p className="text-sage-600 text-base mb-6 leading-relaxed">
              {recommendation.description}
            </p>
          </div>
          <button
            onClick={handleSaveToggle}
            className={`p-3 rounded-full transition-all duration-300 flex-shrink-0 ${
              isSaved 
                ? 'text-rose-500 hover:text-rose-600' 
                : 'text-sage-400 hover:text-rose-500'
            }`}
          >
            <Heart 
              size={24} 
              fill={isSaved ? 'currentColor' : 'none'} 
            />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getUrgencyColor(recommendation.urgency)}`}>
            {recommendation.urgency}
          </span>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(recommendation.category)}`}>
            {recommendation.category}
          </span>
          {recommendation.cost === 'free' && (
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
              Free
            </span>
          )}
          {recommendation.aiGenerated && (
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
              AI Generated
            </span>
          )}
        </div>

        <div className="mb-8">
          <h4 className="text-base font-medium text-sage-700 mb-4">Benefits:</h4>
          <ul className="space-y-3">
            {recommendation.benefits.map((benefit, index) => (
              <li key={index} className="text-base text-sage-600 flex items-start">
                <Star size={16} className="text-lavender-500 mr-4 mt-1 flex-shrink-0" />
                <span className="leading-relaxed">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between text-base text-sage-500 pt-6 border-t border-sage-100">
          {recommendation.duration && (
            <div className="flex items-center">
              <Clock size={16} className="mr-3" />
              {recommendation.duration}
            </div>
          )}
          {recommendation.frequency && (
            <div className="flex items-center">
              <Calendar size={16} className="mr-3" />
              {recommendation.frequency}
            </div>
          )}
        </div>

        {/* Instructions for AI-generated recommendations */}
        {recommendation.instructions && recommendation.instructions.length > 0 && (
          <div className="mt-6 pt-6 border-t border-sage-100">
            <h4 className="text-base font-medium text-sage-700 mb-4">Instructions:</h4>
            <ol className="space-y-2">
              {recommendation.instructions.map((instruction, index) => (
                <li key={index} className="text-sm text-sage-600 flex items-start">
                  <span className="bg-lavender-100 text-lavender-700 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Equipment needed */}
        {recommendation.equipment && recommendation.equipment.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-sage-700 mb-2">Equipment needed:</h4>
            <div className="flex flex-wrap gap-2">
              {recommendation.equipment.map((item, index) => (
                <span key={index} className="px-2 py-1 bg-sage-100 text-sage-700 text-xs rounded">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RecommendationCard; 
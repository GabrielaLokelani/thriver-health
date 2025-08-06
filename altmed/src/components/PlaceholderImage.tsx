import React from 'react';
import { ImageOff } from 'lucide-react';

interface PlaceholderImageProps {
  category: 'wellness' | 'nature' | 'meditation' | 'herbs' | 'yoga' | 'crystals' | 'tea' | 'profile' | 'treatment' | 'condition';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  alt?: string;
}

const getUnsplashImage = (category: string, size: string) => {
  const images = {
    wellness: {
      small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      medium: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      large: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    },
    nature: {
      small: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
      medium: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
      large: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop'
    },
    meditation: {
      small: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      medium: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
      large: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
    },
    herbs: {
      small: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      medium: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
      large: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
    },
    yoga: {
      small: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop',
      medium: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
      large: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop'
    },
    crystals: {
      small: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      medium: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      large: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
    },
    tea: {
      small: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop',
      medium: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=400&fit=crop',
      large: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=600&fit=crop'
    },
    profile: {
      small: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      medium: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      large: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=500&fit=crop&crop=face'
    },
    treatment: {
      small: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=200&fit=crop',
      medium: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&h=400&fit=crop',
      large: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop'
    },
    condition: {
      small: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=200&fit=crop',
      medium: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      large: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop'
    }
  };

  const categoryImages = images[category as keyof typeof images];
  return categoryImages?.[size as keyof typeof categoryImages] || images.wellness.small;
};

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ 
  category, 
  size = 'medium', 
  className = '',
  alt = 'Placeholder image'
}) => {
  const [imageError, setImageError] = React.useState(false);
  const imageUrl = getUnsplashImage(category, size);

  const sizeClasses = {
    small: 'w-24 h-24',
    medium: 'w-48 h-32',
    large: 'w-full h-64'
  };

  if (imageError) {
    return (
      <div className={`${sizeClasses[size]} image-placeholder ${className}`}>
        <ImageOff size={24} className="text-sage-400" />
      </div>
    );
  }

  return (
    <div className={`${sizeClasses[size]} overflow-hidden rounded-xl ${className}`}>
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
};

export default PlaceholderImage; 
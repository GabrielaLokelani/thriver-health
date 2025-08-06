export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'herbal' | 'breathwork' | 'energy' | 'nutrition' | 'testing';
  practitioner?: string;
  duration?: string;
  price?: string;
  benefits: string[];
  image?: string;
  rating?: number;
  reviews?: number;
}

export const services: Service[] = [
  {
    id: '1',
    title: 'Custom Herbal Tea Blend',
    description: 'Personalized herbal tea blend based on your wellness profile and current needs.',
    category: 'herbal',
    practitioner: 'Sarah Chen, Herbalist',
    duration: '30 min consultation',
    price: '$45',
    benefits: ['Personalized formula', 'Natural ingredients', 'Ongoing support'],
    rating: 4.8,
    reviews: 127
  },
  {
    id: '2',
    title: 'Breathwork Session',
    description: 'Guided breathwork session to release stress and increase energy flow.',
    category: 'breathwork',
    practitioner: 'Michael Rodriguez, Breathwork Coach',
    duration: '60 minutes',
    price: '$75',
    benefits: ['Stress relief', 'Increased energy', 'Better sleep'],
    rating: 4.9,
    reviews: 89
  },
  {
    id: '3',
    title: 'Reiki Energy Healing',
    description: 'Gentle energy healing session to balance your chakras and promote healing.',
    category: 'energy',
    practitioner: 'Emma Thompson, Reiki Master',
    duration: '45 minutes',
    price: '$85',
    benefits: ['Energy balance', 'Emotional healing', 'Deep relaxation'],
    rating: 4.7,
    reviews: 156
  },
  {
    id: '4',
    title: 'Nutrition Consultation',
    description: 'Comprehensive nutrition assessment and personalized meal planning.',
    category: 'nutrition',
    practitioner: 'Dr. James Wilson, Nutritionist',
    duration: '90 minutes',
    price: '$120',
    benefits: ['Personalized meal plan', 'Health optimization', 'Lifestyle guidance'],
    rating: 4.6,
    reviews: 203
  },
  {
    id: '5',
    title: 'Gut Microbiome Test',
    description: 'Comprehensive analysis of your gut bacteria for optimal health insights.',
    category: 'testing',
    duration: 'At-home kit',
    price: '$199',
    benefits: ['Detailed analysis', 'Personalized recommendations', 'Health insights'],
    rating: 4.5,
    reviews: 67
  },
  {
    id: '6',
    title: 'Acupuncture Session',
    description: 'Traditional Chinese medicine acupuncture for pain relief and wellness.',
    category: 'energy',
    practitioner: 'Dr. Lisa Park, Acupuncturist',
    duration: '60 minutes',
    price: '$95',
    benefits: ['Pain relief', 'Energy flow', 'Stress reduction'],
    rating: 4.8,
    reviews: 234
  },
  {
    id: '7',
    title: 'Meditation Coaching',
    description: 'One-on-one meditation coaching to develop a consistent practice.',
    category: 'breathwork',
    practitioner: 'David Kumar, Meditation Teacher',
    duration: '45 minutes',
    price: '$65',
    benefits: ['Personalized guidance', 'Technique mastery', 'Ongoing support'],
    rating: 4.7,
    reviews: 98
  },
  {
    id: '8',
    title: 'Essential Oil Consultation',
    description: 'Custom essential oil blend creation for your specific wellness needs.',
    category: 'herbal',
    practitioner: 'Maria Santos, Aromatherapist',
    duration: '45 minutes',
    price: '$55',
    benefits: ['Custom blend', 'Natural remedies', 'Usage guidance'],
    rating: 4.6,
    reviews: 145
  }
];

export const getServicesByCategory = (category: string) => {
  return services.filter(service => service.category === category);
}; 
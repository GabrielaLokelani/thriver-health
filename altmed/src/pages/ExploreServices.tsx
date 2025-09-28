import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, Clock, Filter, Heart } from 'lucide-react';
import { services, getServicesByCategory } from '../data/services';

const ExploreServices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'All Services', count: services.length },
    { id: 'herbal', label: 'Herbal Remedies', count: getServicesByCategory('herbal').length },
    { id: 'breathwork', label: 'Breathwork', count: getServicesByCategory('breathwork').length },
    { id: 'energy', label: 'Energy Healing', count: getServicesByCategory('energy').length },
    { id: 'nutrition', label: 'Nutrition', count: getServicesByCategory('nutrition').length },
    { id: 'testing', label: 'Testing', count: getServicesByCategory('testing').length }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.practitioner?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (serviceId: string) => {
    setFavorites(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'herbal': return '🌿';
      case 'breathwork': return '🫁';
      case 'energy': return '✨';
      case 'nutrition': return '🥗';
      case 'testing': return '🔬';
      default: return '💫';
    }
  };

  return (
    <div className="min-h-screen bg-warm-800">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sage-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Explore Wellness Services
          </motion.h1>
          <p className="text-lg text-warm-300">
            Discover holistic practitioners and natural healing modalities. Connect with our partner network and earn rewards through our referral program.
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and Filters */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="modern-card p-8"
          >
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-400" />
              <input
                type="text"
                placeholder="Search services, practitioners, or modalities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border border-sage-200 rounded-xl focus:ring-2 focus:ring-lavender-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm text-base text-warm-800"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center mb-6">
              <Filter size={20} className="text-warm-300 mr-3" />
              <span className="text-warm-300 font-medium mr-6">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-8 py-4 rounded-full text-base font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-lavender-500 to-rose-500 text-white shadow-lg'
                      : 'bg-white/80 backdrop-blur-sm text-warm-800 hover:bg-white hover:text-white shadow-md hover:shadow-lg border border-sage-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Services Grid */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="modern-card p-8 group hover-lift"
              >
                {/* Service Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">
                      {getCategoryIcon(service.category)}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {service.title}
                      </h3>
                      {service.practitioner && (
                        <p className="text-base text-electric-400 font-medium">
                          {service.practitioner}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(service.id)}
                    className={`p-3 rounded-full transition-all duration-300 ${
                      favorites.includes(service.id)
                        ? 'text-lime-400 hover:text-lime-400'
                        : 'text-warm-400 hover:text-lime-400'
                    }`}
                  >
                    <Heart 
                      size={24} 
                      fill={favorites.includes(service.id) ? 'currentColor' : 'none'} 
                    />
                  </button>
                </div>

                {/* Service Description */}
                <p className="text-warm-300 text-base mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Service Details */}
                <div className="space-y-3 mb-6">
                  {service.duration && (
                    <div className="flex items-center text-base text-warm-400">
                      <Clock size={18} className="mr-3" />
                      {service.duration}
                    </div>
                  )}
                  {service.price && (
                    <div className="text-2xl font-bold text-electric-400">
                      {service.price}
                    </div>
                  )}
                </div>

                {/* Rating */}
                {service.rating && (
                  <div className="flex items-center mb-6">
                    <div className="flex items-center mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i < Math.floor(service.rating!)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-base text-warm-300">
                      {service.rating} ({service.reviews} reviews)
                    </span>
                  </div>
                )}

                {/* Benefits */}
                <div className="mb-8">
                  <h4 className="text-base font-medium text-warm-300 mb-4">Benefits:</h4>
                  <ul className="space-y-3">
                    {service.benefits.slice(0, 3).map((benefit, index) => (
                      <li key={index} className="text-base text-warm-300 flex items-center">
                        <div className="w-2 h-2 bg-electric-500/200 rounded-full mr-3 flex-shrink-0"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-gradient-to-r from-lavender-500 to-rose-500 hover:from-lavender-600 hover:to-rose-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Book Now
                  </button>
                  <button className="flex-1 bg-white/80 backdrop-blur-sm text-electric-400 hover:text-electric-400 font-medium py-3 px-4 rounded-xl border border-lavender-200 hover:border-lavender-300 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
                    Learn More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No services found
              </h3>
              <p className="text-warm-300">
                Try adjusting your search terms or filters
              </p>
            </motion.div>
          )}
        </section>

        {/* Featured Practitioners */}
        <section className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="modern-card p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-8">
              Featured Practitioners
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Dr. Sarah Chen',
                  specialty: 'Herbal Medicine',
                  rating: 4.9,
                  reviews: 127,
                  image: '🌿'
                },
                {
                  name: 'Michael Rodriguez',
                  specialty: 'Breathwork & Meditation',
                  rating: 4.8,
                  reviews: 89,
                  image: '🫁'
                },
                {
                  name: 'Emma Thompson',
                  specialty: 'Reiki & Energy Healing',
                  rating: 4.7,
                  reviews: 156,
                  image: '✨'
                }
              ].map((practitioner, index) => (
                <div key={index} className="text-center p-8 border border-sage-200 rounded-xl hover:bg-warm-600/30 transition-all duration-300 hover-lift">
                  <div className="text-5xl mb-6">{practitioner.image}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {practitioner.name}
                  </h3>
                  <p className="text-base text-warm-300 mb-4">
                    {practitioner.specialty}
                  </p>
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center mr-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(practitioner.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-warm-300">
                      {practitioner.rating} ({practitioner.reviews})
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-lavender-500 to-rose-500 hover:from-lavender-600 hover:to-rose-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    View Profile
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default ExploreServices; 
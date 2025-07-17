import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { VideoCameraIcon, XMarkIcon, PlayIcon } from '@heroicons/react/24/outline';

// interface Video {
//   id: string;
//   title: string;
//   creator: string;
//   embedUrl: string;
//   thumbnail: string;
//   category: string;
// }

// interface Creator {
//   name: string;
//   avatar: string;
//   title: string;
//   featuredVideo: Video;
// }

const RiseVideos: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Videos' },
    { id: 'wise', name: 'WISE Inspiration' },
    { id: 'soccer', name: 'Soccer Skills' },
    { id: 'motivation', name: 'Motivation' },
    { id: 'leadership', name: 'Leadership' }
  ];

  // WISE Featured Videos
  const wiseVideos = [
    {
      id: 'wise-main',
      title: 'WISE - Women in Science and Engineering',
      creator: 'WISE Organization',
      embedUrl: 'https://www.youtube.com/embed/4EwTXoeGsps',
      thumbnail: '/images/wise-thumbnail.jpg',
      category: 'wise'
    },
    {
      id: 'wise-inspire1',
      title: 'WISE Inspirational Journey',
      creator: 'WISE Organization',
      embedUrl: 'https://www.youtube.com/embed/54S3FYrABOY',
      thumbnail: 'https://picsum.photos/400/225',
      category: 'wise'
    },
    {
      id: 'wise-inspire2',
      title: 'WISE Success Stories',
      creator: 'WISE Organization',
      embedUrl: 'https://www.youtube.com/embed/GtSYAUn2I7I',
      thumbnail: 'https://picsum.photos/400/225',
      category: 'wise'
    }
  ];

  // Soccer Tutorial Videos
  const soccerVideos = [
    {
      id: 'soccer1',
      title: 'Essential Soccer Training for Kids',
      creator: 'Pro Soccer Training',
      embedUrl: 'https://www.youtube.com/embed/RMiQSRNXAwI',
      thumbnail: 'https://picsum.photos/400/225',
      category: 'soccer'
    },
    {
      id: 'soccer2',
      title: '8 Best Soccer Moves for Kids',
      creator: 'Soccer Skills',
      embedUrl: 'https://www.youtube.com/embed/4gsh7JPcO10',
      thumbnail: 'https://picsum.photos/400/225',
      category: 'soccer'
    },
    {
      id: 'soccer3',
      title: 'Soccer Drills for Building Confidence',
      creator: 'Youth Soccer Training',
      embedUrl: 'https://www.youtube.com/embed/FRgxVfTWZE4',
      thumbnail: 'https://picsum.photos/400/225',
      category: 'soccer'
    },
    {
      id: 'soccer4',
      title: 'Beginner Soccer Skills',
      creator: 'Soccer Basics',
      embedUrl: 'https://www.youtube.com/embed/3DAWLIHC5Uo',
      thumbnail: 'https://picsum.photos/400/225',
      category: 'soccer'
    }
  ];

  // Motivation and Leadership Videos
  const otherVideos = [
    {
      id: '1',
      title: 'Building Confidence Through Self-Discovery',
      creator: 'Sarah Johnson',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/400/225',
      category: 'motivation'
    },
    {
      id: '2',
      title: 'Finding Your Purpose in STEM',
      creator: 'Mike Chen',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/400/225',
      category: 'motivation'
    },
    {
      id: '3',
      title: 'Women Leaders in Technology',
      creator: 'Emily Rodriguez',
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/400/225',
      category: 'leadership'
    }
  ];

  // Combine all videos
  const allVideos = [...wiseVideos, ...soccerVideos, ...otherVideos];

  const filteredVideos = selectedCategory === 'all' 
    ? allVideos 
    : allVideos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--wise-blue-light)] to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Rise x Shine Video Library</h1>
          <p className="text-xl text-gray-600">Get inspired by our amazing content creators and learn new skills</p>
        </div>

        {/* Featured WISE Video Carousel */}
        <div className="bg-white rounded-2xl shadow-xl border border-[var(--wise-orange)] p-8 mb-12">
          <h2 className="text-2xl font-bold text-[var(--wise-orange)] mb-6">Featured: WISE Initiative</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {wiseVideos.map((video) => (
              <div key={video.id} className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[var(--wise-orange)] text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-[var(--wise-orange-light)] hover:text-[var(--wise-orange)]'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <PlayIcon className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.creator}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Video CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange)] hover:shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <VideoCameraIcon className="w-6 h-6 mr-2" />
            Share Your Story
          </button>
        </div>

        {/* Submit Video Modal */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-lg bg-white rounded-2xl shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  Share Your Story
                </Dialog.Title>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <form className="p-6 space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Video Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)]"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)]"
                  />
                </div>
                
                <div>
                  <label htmlFor="video" className="block text-sm font-medium text-gray-700">
                    Video File
                  </label>
                  <input
                    type="file"
                    id="video"
                    accept="video/*"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--wise-orange-light)] file:text-[var(--wise-orange)] hover:file:bg-[var(--wise-orange-light)]"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default RiseVideos; 
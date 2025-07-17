import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

interface Post {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  category: string;
  quote: string;
  reflection: string;
  source?: string;
  videoUrl?: string;
}

interface PlaylistVideo {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
}

const LyricsOfLivin: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleVideoClick = (url: string) => {
    window.open(url, '_blank');
  };

  const playlistVideos: PlaylistVideo[] = [
    {
      id: 'ig1_Ptvn8P8',
      title: 'PREPARE FOR FREEDOM',
      thumbnail: `https://img.youtube.com/vi/ig1_Ptvn8P8/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=ig1_Ptvn8P8'
    },
    {
      id: '4Kbxk68zR0Q',
      title: 'NEW MATH',
      thumbnail: `https://img.youtube.com/vi/4Kbxk68zR0Q/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=4Kbxk68zR0Q'
    },
    {
      id: 'wp-PRkTNEro',
      title: 'JOY',
      thumbnail: `https://img.youtube.com/vi/wp-PRkTNEro/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=wp-PRkTNEro'
    },
    {
      id: '0VBgXyevBN0',
      title: 'DREAM',
      thumbnail: `https://img.youtube.com/vi/0VBgXyevBN0/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=0VBgXyevBN0'
    },
    {
      id: 'XOkD3wKcdL0',
      title: 'WRITE TO FORGET',
      thumbnail: `https://img.youtube.com/vi/XOkD3wKcdL0/maxresdefault.jpg`,
      url: 'https://www.youtube.com/watch?v=XOkD3wKcdL0'
    }
  ];

  const posts: Post[] = [
    {
      id: '1',
      title: 'PREPARE FOR FREEDOM',
      content: 'Life is not a "how-to" road map. But a "want-to" adventure. The question is not "Can you?" but "Do you want to?"',
      quote: "Life's not fair. It never was, never is, never will be. Do not fall into the entitled trap of feeling like you're a victim. You are not.",
      reflection: "Sometimes the hardest part of success is deciding what you want. Once you know what you truly want, the path becomes clearer. It's not about following a preset map, but about creating your own journey.",
      image: 'https://images.unsplash.com/photo-1499336315816-097655dcfbda',
      date: '2024-03-20',
      category: 'Philosophy',
      source: 'Lyrics of Livin\'',
      videoUrl: 'https://www.youtube.com/watch?v=ig1_Ptvn8P8'
    },
    {
      id: '2',
      title: 'NEW MATH',
      content: 'Instead of asking why something happened, ask what you can learn from it. Every setback is a setup for a comeback.',
      quote: "We have to prepare for the path ahead, but we also need to be in the moment enough to check our footing and actually enjoy the path we're on.",
      reflection: "Success is a journey, not a destination. The real joy comes from the small victories, the daily progress, and the lessons learned along the way.",
      image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84',
      date: '2024-03-19',
      category: 'Motivation',
      source: 'Lyrics of Livin\'',
      videoUrl: 'https://www.youtube.com/watch?v=4Kbxk68zR0Q'
    },
    {
      id: '3',
      title: 'JOY',
      content: "You are the author of your own story. Don't let anyone else hold the pen.",
      quote: "We cannot fully appreciate the light without the shadows. We have to be thrown off balance to find our footing. It's better to jump than fall. And here I am.",
      reflection: "Your circumstances don't define you - your response to them does. Be the creator of your own weather, regardless of what storm may come.",
      image: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d',
      date: '2024-03-18',
      category: 'Inspiration',
      source: 'Lyrics of Livin\'',
      videoUrl: 'https://www.youtube.com/watch?v=wp-PRkTNEro'
    },
    {
      id: '4',
      title: 'DREAM',
      content: 'Gratitude is the best recipe for more to be grateful for. Turn your "have to" into "get to" and watch how your life changes.',
      quote: "When you've got God, you've got a friend. And that friend is you.",
      reflection: "Gratitude turns what we have into enough. It's not about having what you want, but wanting what you have.",
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
      date: '2024-03-17',
      category: 'Wisdom',
      source: 'Lyrics of Livin\'',
      videoUrl: 'https://www.youtube.com/watch?v=0VBgXyevBN0'
    },
    {
      id: '5',
      title: 'WRITE TO FORGET',
      content: "Life is a series of commas, not periods. Keep moving forward, keep growing, keep livin.",
      quote: "Just keep living. That's the only way to do it. Keep moving forward. Don't let yesterday take up too much of today.",
      reflection: "The phrase 'just keep livin' isn't just about survival - it's about thriving, growing, and making the most of every moment we're given.",
      image: 'https://images.unsplash.com/photo-1493612276216-ee3925520721',
      date: '2024-03-16',
      category: 'Philosophy',
      source: 'Lyrics of Livin\'',
      videoUrl: 'https://www.youtube.com/watch?v=XOkD3wKcdL0'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--wise-blue-light)] to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/images/lyrics of livin/lol-logo.png" 
              alt="Lyrics of Livin' Logo" 
              className="h-16 w-auto"
            />
          </div>
          <p className="text-xl text-gray-600 mb-2">Wisdom and inspiration from Matthew McConaughey</p>
          <p className="text-sm text-gray-500">Click on any video link to watch the original content on YouTube</p>
        </div>

        {/* Playlist Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlistVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => handleVideoClick(video.url)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                    <PlayCircleIcon className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{video.title}</h3>
                  <button
                    onClick={() => handleVideoClick(video.url)}
                    className="mt-3 flex items-center text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)] transition-colors"
                  >
                    <PlayCircleIcon className="h-5 w-5 mr-1" />
                    <span className="text-sm">Watch Video</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="break-inside-avoid bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
            >
              <div 
                className="relative cursor-pointer"
                onClick={() => {
                  setSelectedPost(post);
                  setIsModalOpen(true);
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-[var(--wise-orange)] text-white px-3 py-1 rounded-full text-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{post.content}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</div>
                  {post.videoUrl && (
                    <button
                      onClick={() => handleVideoClick(post.videoUrl!)}
                      className="flex items-center text-[var(--wise-orange)] hover:text-[var(--wise-orange-dark)] transition-colors"
                    >
                      <PlayCircleIcon className="h-5 w-5 mr-1" />
                      <span className="text-sm">Watch Video</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Post Modal */}
        <Dialog
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-2xl bg-white rounded-2xl shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  {selectedPost?.title}
                </Dialog.Title>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              {selectedPost && (
                <div className="p-6 space-y-6">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-[var(--wise-orange)]">
                        {selectedPost.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(selectedPost.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <blockquote className="border-l-4 border-[var(--wise-orange)] pl-4 italic text-lg text-gray-700">
                      "{selectedPost.quote}"
                      {selectedPost.source && (
                        <footer className="text-sm text-gray-500 mt-2">
                          — From {selectedPost.source}
                        </footer>
                      )}
                    </blockquote>

                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-900">Reflection</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedPost.reflection}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-medium text-gray-900">Key Takeaway</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedPost.content}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default LyricsOfLivin; 
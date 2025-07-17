import React, { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, StarIcon } from '@heroicons/react/24/outline';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  isFavorite: boolean;
}

const JobCard: React.FC<{ job: Job; onToggleFavorite: (id: string) => void }> = ({ job, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
          <p className="text-sm text-gray-500">{job.company}</p>
        </div>
        <button
          onClick={() => onToggleFavorite(job.id)}
          className={`p-2 rounded-full ${
            job.isFavorite ? 'text-[var(--wise-orange)]' : 'text-gray-400 hover:text-gray-500'
          }`}
        >
          <StarIcon className="h-5 w-5" />
        </button>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">📍</span>
          {job.location}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span className="mr-2">💰</span>
          {job.salary}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600 line-clamp-2">{job.description}</p>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Requirements:</h4>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="flex-1 btn-secondary">View Details</button>
        <button className="flex-1 btn-primary">Apply Now</button>
      </div>
    </div>
  );
};

const JobSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [selectedExperience, setSelectedExperience] = useState<string>('all');
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      description: 'We are looking for a skilled Software Engineer to join our team...',
      requirements: ['Bachelor\'s degree in Computer Science', '3+ years of experience', 'Proficiency in JavaScript'],
      isFavorite: false,
    },
    {
      id: '2',
      title: 'Data Scientist',
      company: 'Data Insights',
      location: 'New York, NY',
      salary: '$130,000 - $160,000',
      description: 'Join our data science team to work on cutting-edge machine learning projects...',
      requirements: ['Master\'s degree in Data Science', '2+ years of experience', 'Python expertise'],
      isFavorite: false,
    },
  ]);

  const handleToggleFavorite = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, isFavorite: !job.isFavorite } : job
    ));
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center">
              <FunnelIcon className="w-5 h-5 text-gray-400 mr-2" />
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]"
              >
                <option value="all">All Industries</option>
                <option value="tech">Technology</option>
                <option value="finance">Finance</option>
                <option value="healthcare">Healthcare</option>
              </select>
            </div>
            <div className="flex items-center">
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-[var(--wise-orange)]"
              >
                <option value="all">All Experience Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--wise-orange-light)] mb-4">
              <MagnifyingGlassIcon className="h-8 w-8 text-[var(--wise-orange)]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default JobSearch; 
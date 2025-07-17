import { useUser } from '@/contexts/UserContext';
import { Pillar, User } from '@/types';
import {
  ArrowLeftIcon,
  DocumentPlusIcon,
} from '@heroicons/react/24/outline';
import { Schema } from 'amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { loadPillars, loadUserActivity, loadUserDetails } from '../../../lib/api/api';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheckCircle, FaUpload } from 'react-icons/fa';

interface UserActivityForm {
  title: string;
  pillarId: string;
  description: string;
  datePerformed: string;
  hours: number;
}

const ActivityForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserActivityForm>({
    title: '',
    pillarId: '',
    datePerformed: '',
    description: '',
    hours: 0,
    // documents: [],
  });

  const { id } = useParams();
  const { user } = useUser();
  const client = generateClient<Schema>();

  const [userDetails, setUserDetails] = useState<User>();
  const [pillars, setPillars] = useState<Pillar[]>([]);

  useEffect(() => {
    async function getActivity(id: string) {
      // TODO: Make sure this works when the schema is better set up
      const activity = await loadUserActivity(id)
      if (activity) {
        setFormData({
          title: activity.title ?? '',
          pillarId: activity.pillarId,
          datePerformed: activity.datePerformed ?? '',
          description: activity.description ?? '',
          hours: activity.hours ?? 0,
          // documents: [] // FIXME: Should be documentId
        })
      }
    }

    if (id) {
       getActivity(id);
    }
  }, [id]);

  // Load user details, pillar
  useEffect(() => {
    async function loadData(sub: string) {
      const data = await loadUserDetails(sub);
      if (!data?.length || data.length === 0) {
        return;
      }
      const foundUser = data[0];

      if (!foundUser?.groups) {
        console.error("User has not participating groups");
      }

      setUserDetails(foundUser);

      if (foundUser?.groups && foundUser.groups[0]) {
        const groupId = foundUser.groups[0]
        if (groupId) {
          const allPillars = await loadPillars(groupId, 1); // TODO: Update to current period
          setPillars(allPillars);
        }
      }
    }

    if (user?.sub) {
      loadData(user.sub)
    }
  }, [user])

  async function handleSubmit () {
    if (userDetails?.id) {
      if (id) {
        // TODO: Edit existing UserActivity
        client.models.UserActivity.update({
          id: id,
          ...formData
        });
      }
      else {
        const { errors } = await client.models.UserActivity.create({
          ...formData,
          userId: userDetails.id,
          status: 'submitted'
        });
        if (!errors) {
          navigate('/student/dashboard')
        }
      }
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setFormData(prev => ({
  //       ...prev,
  //       documents: [...prev.documents, ...Array.from(e.target.files || [])],
  //     }));
  //   }
  // };

  // const removeDocument = (index: number) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     documents: prev.documents.filter((_, i) => i !== index),
  //   }));
  // };

  const sortPillars = (pillars: Pillar[]) => {
    return [...pillars].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  };

  return (
    <div className="p-6 space-y-6 relative bg-blue-50 rounded-xl shadow-md max-w-lg mx-auto">
      {/* Achievement badge */}
      <div className="absolute top-0 right-0 -mt-8 mr-2 z-10">
        <FaCheckCircle className="text-yellow-400" size={64} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))' }} />
      </div>
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">New Activity</h1>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Activity Title */}
        <div>
          <label htmlFor="title" className="block text-base font-semibold text-gray-900 mb-1">Activity Title</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="E.g. Playing soccer"
            className="mt-1 block w-full rounded-md border-0 shadow-sm bg-yellow-50 focus:ring-primary-500 focus:border-primary-500 text-lg placeholder:text-gray-400 py-2 px-3"
          />
        </div>
        {/* Category Selector */}
        <div>
          <label htmlFor="category" className="block text-base font-semibold text-gray-900 mb-1">Category</label>
          <select
            id="category"
            value={pillars.find(pillar => pillar.id === formData.pillarId)?.id}
            onChange={(e) => {setFormData(prev => ({ ...prev, pillarId: e.target.value }))}}
            className="mt-1 block w-full rounded-lg border-0 shadow-sm bg-orange-400 text-white font-bold text-lg py-2 px-3 focus:ring-primary-500 focus:border-primary-500 appearance-none"
          >
            <option value="">Select a category</option>
            {pillars && sortPillars(pillars).map(pillar => (
              <option key={pillar.id} value={pillar.id} className="text-gray-900">
                {pillar.name}
              </option>
            ))}
          </select>
        </div>
        {/* Date and Hours Spent - split layout */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="datePerformed" className="block text-base font-semibold text-gray-900 mb-1">Date</label>
            <input
              type="date"
              id="datePerformed"
              value={formData.datePerformed}
              onChange={(e) => setFormData(prev => ({ ...prev, datePerformed: e.target.value }))}
              placeholder="mm/dd/yyyy"
              className="mt-1 block w-full rounded-md border-0 shadow-sm bg-pink-100 focus:ring-primary-500 focus:border-primary-500 text-lg placeholder:text-gray-400 py-2 px-3"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="hours" className="block text-base font-semibold text-gray-900 mb-1">Hours Spent</label>
            <input
              type="number"
              id="hours"
              value={formData.hours}
              onChange={(e) => setFormData(prev => ({ ...prev, hours: Number(e.target.value) }))}
              placeholder="E.g. 2.5"
              className="mt-1 block w-full rounded-md border-0 shadow-sm bg-yellow-50 focus:ring-primary-500 focus:border-primary-500 text-lg placeholder:text-gray-400 py-2 px-3"
              min={0}
              step={0.1}
            />
          </div>
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-base font-semibold text-gray-900 mb-1">Description</label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what you did"
            className="mt-1 block w-full rounded-md border-0 shadow-sm bg-purple-100 focus:ring-primary-500 focus:border-primary-500 text-lg placeholder:text-gray-400 py-2 px-3 min-h-[60px]"
          />
        </div>
        {/* File Upload */}
        <div>
          <label className="block text-base font-semibold text-gray-900 mb-1">Supporting files</label>
          <div className="flex items-center gap-2 mb-2">
            <FaUpload className="text-yellow-400 text-2xl" />
            <span className="text-yellow-700 font-semibold">Drag and drop or click to upload</span>
          </div>
          <div className="relative border-2 border-dashed border-yellow-300 rounded-lg bg-yellow-50 p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-yellow-100 transition-colors min-h-[80px]">
            {/* Existing upload logic here, e.g. <input type="file" ... /> */}
            <input type="file" className="opacity-0 absolute inset-0 w-full h-full cursor-pointer" />
            <span className="text-gray-500 text-sm">Drag ad drop or click to upload</span>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-2 rounded-lg bg-orange-400 text-white font-bold text-lg shadow hover:bg-orange-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-2 rounded-lg bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition-colors"
          >
            Submit Activity
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm; 
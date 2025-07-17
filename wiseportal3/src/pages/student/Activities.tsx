import { ActivityCard } from '@/components/student/ActivityCard';
import { Pillar, UserActivity } from '@/types';
import {
  CalendarIcon,
  FunnelIcon,
  ListBulletIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { loadPillars, loadUserActivities, loadUserDetails } from '../../../lib/api/api'

import { BeatLoader } from 'react-spinners'
import { useUser } from '@/contexts/UserContext';

// Helper to sort pillars so 'References & Exit Essay' is always last
function sortPillars(pillars: Pillar[]): Pillar[] {
  return [...pillars].sort((a, b) => {
    if ((a.name || '').toLowerCase().includes('references') || (a.name || '').toLowerCase().includes('exit essay')) return 1;
    if ((b.name || '').toLowerCase().includes('references') || (b.name || '').toLowerCase().includes('exit essay')) return -1;
    return 0;
  });
}

const Activities = () => {
  const {user} = useUser();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<'list' | 'calendar'>(searchParams.get('view') as 'list' | 'calendar' || 'list');

  const [pillars, setPillars] = useState<Pillar[]>([])
  const [activities, setActivities] = useState<UserActivity[]>([])

  const [currPillar, setCurrPillar] = useState<Pillar>();

  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  // TODO: Load curr pillar from path id
  // searchParams.get('category')
  // useEffect(() => {});

  // Load user data
  useEffect(() => {
    async function loadData(sub: string) {
      const data = await loadUserDetails(sub);
      
      // Load user details
      if (!data || data?.length === 0) {
        console.error('User details not found');
        setLoading(false);
        return;
      }

      const userDetails = data[0]

      // Load participant groupId
      if (!userDetails?.groups || userDetails?.groups.length === 0) {
        console.error("User has not participating groups");
      } else if (userDetails?.groups[0]) {
        const allPillars = await loadPillars(userDetails.groups[0], 1)
        setPillars(allPillars);
      }

      // Load user activities
      const allActivities = await loadUserActivities(userDetails.id);
      setActivities(allActivities);
      setLoading(false);

    }

    if (user?.sub) {
      loadData(user.sub);
    }
  }, [user])

  function editActivity(activity: UserActivity) {
    navigate(`/student/activities/${activity.id}/edit`)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Activities</h1>
        <button
          onClick={() => navigate('/student/activities/new')}
          className="btn-primary"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          New Activity
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => {
            setView('list');
            navigate('/student/activities?view=list' + (currPillar ? `&category=${currPillar}` : ''));
          }}
          className={`btn-secondary ${view === 'list' ? 'bg-primary-50 text-primary-600 border-primary-200' : ''}`}
        >
          <ListBulletIcon className="w-5 h-5 mr-2" />
          List View
        </button>
        <button
          onClick={() => {
            setView('calendar');
            navigate('/student/activities?view=calendar' + (currPillar ? `&category=${currPillar}` : ''));
          }}
          className={`btn-secondary ${view === 'calendar' ? 'bg-primary-50 text-primary-600 border-primary-200' : ''}`}
        >
          <CalendarIcon className="w-5 h-5 mr-2" />
          Calendar View
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-4">
        <FunnelIcon className="w-5 h-5 text-gray-400" />
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setCurrPillar(undefined);
              navigate(`/student/activities?view=${view}`);
            }}
            className={`btn-secondary`} // TODO: Dynamic styling for each pillar?
          >
            All
          </button>
          {pillars && sortPillars(pillars).map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => {
                setCurrPillar(pillar);
                navigate(`/student/activities?category=${pillar.id}&view=${view}`);
              }}
              className={`btn-secondary`} // TODO: Dynamic styling for each pillar?
            >
              {pillar.name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {view === 'list' ? (
        <div>
          <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
            {!loading && activities && activities.filter(
              (activity) => !currPillar || activity.pillarId === currPillar.id
            ).map((activity) => (
              <ActivityCard key={activity.id} activity={activity} handleEdit={editActivity} />
            ))}
          </div>
          {loading && 
          <div className="flex flex-row justify-center mt-12">
            <BeatLoader speedMultiplier={.5} />
          </div>}
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg p-4">
          {/* TODO: Implement calendar view */}
          <p className="text-gray-500">Calendar view coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default Activities; 
import {
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScholarshipProgress from '../../components/student/ScholarshipProgress';
import { useUser } from '../../contexts/UserContext';
import { PillarCard } from '@/components/student/PillarCard';
import { MonthlyProgress } from '@/components/student/MonthlyProgress';
import { Pillar, UserActivity } from '@/types';
import { loadGroup, loadOrganization, loadPillars, loadUserActivities, loadUserDetails } from '../../../lib/api/api';
import { BeatLoader } from 'react-spinners';
import { Migrater } from '../../../data-migration/migrater'
import { FaCalendarAlt, FaTasks, FaCheckCircle, FaPlay, FaRedo, FaQuoteLeft } from 'react-icons/fa';

const StudentDashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();

  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [yearActivities, setYearActivities] = useState<UserActivity[]>([])
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [organizationName, setOrganizationName] = useState<string>();

  const [loading, setLoading] = useState<boolean>(true);

  const period = 1 // TODO: Set this dynamically!

  const [yearOptions, setYearOptions] = useState<number[]>()

  // Load activities, pillars, total/monthly points, and group points per month
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

      // Load activities
      const userActivities = await loadUserActivities(userDetails.id);

      setActivities(userActivities);

      // Load total points
      const newTotalPoints = userActivities.reduce((sum, activity) => {
        return activity.status === 'accepted' ? sum + (activity.approvedPoints ?? 0) : sum;
      }, 0);
      setTotalPoints(newTotalPoints)

      // Load pillars
      let allPillars = []
      if (!userDetails?.groups || userDetails?.groups.length === 0) {
        console.error("User has not participating groups");
      } else if (userDetails?.groups[0]) {
        allPillars = await loadPillars(userDetails.groups[0], period)
        setPillars(allPillars);
      }

      // Load organization name
      const organization = await loadOrganization(userDetails.organizationId);
      if (!organization) {
        console.error(`Organization ${userDetails.organizationId} not found`);
      } else if (organization?.name) {
        setOrganizationName(organization.name);
      }

      // Load year options
      if (userDetails.entryDate) {
        const entryYear = new Date(userDetails.entryDate).getFullYear();
        const pillar = await loadGroup(userDetails.groupId)
        setYearOptions(Array.from({ length: pillar?.duration ?? 4 }, (_, i) => entryYear + i ))
      }

      setLoading(false);
    }

    if (user?.sub) {
      loadData(user.sub);
    }
  }, [user]);

  // Filter activities by selected year
  useEffect(() => {
    if (selectedYear) {
      const activitiesThisYear = activities.filter((a) =>
        a.datePerformed && new Date(a.datePerformed).getFullYear() === selectedYear
      );

      const newTotalPoints = activitiesThisYear.reduce((sum, activity) => {
        return activity.status === 'accepted' ? sum + (activity.approvedPoints ?? 0) : sum;
      }, 0);
      setTotalPoints(newTotalPoints);

      setYearActivities(activitiesThisYear);
    } else {
      setYearActivities(activities);
      const newTotalPoints = activities.reduce((sum, activity) => {
        return activity.status === 'accepted' ? sum + (activity.approvedPoints ?? 0) : sum;
      }, 0);
      setTotalPoints(newTotalPoints);
    }
  }, [activities, selectedYear])

  const migrater = new Migrater();

  function inCurrMonth(activity: UserActivity): boolean {
    if (!activity.datePerformed) {
      return false;
    } else {
      const activityDate = new Date(activity.datePerformed);
      return (
        activityDate.getFullYear() === new Date().getFullYear() &&
        activityDate.getMonth() === new Date().getMonth()
      );
    }
  }

  // Helper to sort pillars so 'References & Exit Essay' is always last
  function sortPillars(pillars: Pillar[]) {
    return [...pillars].sort((a, b) => {
      if ((a.name || '').toLowerCase().includes('references') || (a.name || '').toLowerCase().includes('exit essay')) return 1;
      if ((b.name || '').toLowerCase().includes('references') || (b.name || '').toLowerCase().includes('exit essay')) return -1;
      return 0;
    });
  }

  const debugMode: boolean = false;

  // Matthew McConaughey quotes for each month
  const monthlyQuotes = [
    "Just keep livin'!",
    "Life is not a popularity contest. Be brave, take the hill, but first answer the question: What is my hill?",
    "The best advice comes from people who don’t give advice.",
    "You gotta do what you gotta do to get where you wanna go.",
    "Happiness is only real when shared.",
    "Don’t walk into a place like you wanna buy it, walk in like you own it.",
    "The sooner we become less impressed with our life, our accomplishments, our career, the prospect, in front of us—whatever that may be—the sooner we become more involved with these things, the sooner we get better at them.",
    "Life is a series of commas, not periods.",
    "I believe in living in the present and making each day count.",
    "The good part about jealousy is that it comes from passion. You care.",
    "We dissect failure a lot more than we dissect success.",
    "Give thanks. Appreciate what you do have, and you’ll always have more.",
  ];

  // Get the current month (0-11)
  const currentMonth = new Date().getMonth();
  const currentQuote = monthlyQuotes[currentMonth % monthlyQuotes.length];

  return (
    <div className="min-h-screen bg-gray-50">
      {
        debugMode && 
        <>
          {/* <button onClick={() => migrater.deleteAllUserActivities()}>DELETE</button> */}
          {/* <button onClick={() => migrater.uploadUserActivities()}>UPLOAD</button> */}
          <button onClick={() => migrater.listUserActivities()}>GET</button>
        </>
      }
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ScholarshipProgress 
              points={totalPoints} 
              studentName={user?.givenName || 'Participant'} 
              organizationName={organizationName} 
            />

            {/* Year Selector and Main Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate('/student/activities/new')}
                  className="btn-primary flex items-center text-xs sm:text-sm py-2 px-3 sm:px-4 font-semibold shadow-md"
                >
                  <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  New Activity
                </button>
                <button 
                  onClick={() => navigate('/student/activities?view=calendar')}
                  className="btn-primary flex items-center text-xs sm:text-sm py-2 px-3 sm:px-4 font-semibold shadow-md bg-orange-500 hover:bg-orange-600 border-none"
                >
                  <FaCalendarAlt className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  New Event
                </button>
              </div>
              <div className="flex items-center justify-end">
                <label htmlFor="year" className="mr-2 text-sm font-medium text-gray-700">
                  Select Year:
                </label>
                <select
                  id="year"
                  className="border border-gray-300 text-sm rounded-lg p-2 focus:ring-primary-500 focus:border-primary-500"
                  value={selectedYear ?? 'all'}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedYear(value === 'all' ? undefined : Number(value));
                  }}
                >
                  <option value="all">All Years</option>
                  {yearOptions?.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pillar cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {!loading && pillars && sortPillars(pillars).map((pillar, index) => (
                <PillarCard 
                  key={index} { ...pillar } activities={yearActivities.filter(activity => activity.pillarId === pillar.id && activity.period === pillar.period )}
                />
              ))}
            </div>
            {loading && 
            <div className="flex flex-row justify-center mt-12">
              <BeatLoader speedMultiplier={.5} size="12" />
            </div>}
            {
              !loading && pillars.length === 0 &&
              <div className="flex flex-row justify-center">
                <p className="text-gray-600 text-sm mb-4 sm:mb-6">
                  No pillars found. Reach out to your SSA to get started.
                </p>
              </div>
            }
          </div>
          <div className="space-y-6">
            <MonthlyProgress
              activities={activities.filter((activity) => inCurrMonth(activity))}
              pillars={pillars}
              numMonths={9}
            />
            {/* Calendar and Events Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-2">
              <div className="flex items-center mb-3">
                <FaCalendarAlt className="text-blue-400 text-xl mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Calendar and Events</h2>
              </div>
              {/* Placeholder for calendar - replace with real calendar component if available */}
              <div className="bg-blue-50 rounded-lg p-3 mb-3">
                <div className="text-center text-sm text-gray-600">[Calendar Here]</div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Upcoming Events</h3>
                <ul className="space-y-1">
                  <li className="flex items-center text-sm text-gray-700"><span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span> Submit Personal Statement</li>
                  <li className="flex items-center text-sm text-gray-700"><span className="w-2 h-2 rounded-full bg-primary-500 mr-2"></span> Complete Physics Project</li>
                  <li className="flex items-center text-sm text-gray-700"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Prepare for Sports Tournament</li>
                </ul>
              </div>
            </div>
            {/* Individual Challenges Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex items-center mb-3">
                <FaTasks className="text-pink-400 text-xl mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Individual Challenges</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-yellow-50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-yellow-700 bg-yellow-200 rounded px-2 py-0.5">Logical</span>
                    <span className="text-sm text-gray-800">Arithmetic Challenges</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-semibold text-orange-600 bg-orange-100 hover:bg-orange-200 rounded px-3 py-1"><FaRedo className="mr-1" />Resume</button>
                </div>
                <div className="flex items-center justify-between bg-purple-50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-pink-700 bg-pink-200 rounded px-2 py-0.5">Existential</span>
                    <span className="text-sm text-gray-800">The Big Picture</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 rounded px-3 py-1"><FaRedo className="mr-1" />Resume</button>
                </div>
                <div className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-200 rounded px-2 py-0.5">Interpersonal</span>
                    <span className="text-sm text-gray-800">Pattern Tracking</span>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 hover:bg-green-200 rounded px-3 py-1"><FaPlay className="mr-1" />Start</button>
                </div>
              </div>
            </div>
            {/* Monthly Quote Widget */}
            <div className="bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 rounded-xl shadow-sm border border-yellow-200 p-5 flex flex-col items-start mt-2">
              <div className="flex items-center mb-2">
                <FaQuoteLeft className="text-2xl text-orange-400 mr-2" />
                <span className="text-lg font-bold text-gray-800">Monthly Quote</span>
              </div>
              <div className="italic text-gray-700 text-base mb-3">“{currentQuote}”</div>
              <div className="text-sm font-semibold text-orange-700">— Matthew McConaughey</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 
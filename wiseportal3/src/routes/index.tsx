import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import MainLayout from '../components/layout/MainLayout';
import Login from '../pages/Login';
import StudentDashboard from '../pages/student/Dashboard';
import StudentJournal from '../pages/student/Journal';
import StudentActivities from '../pages/student/Activities';
import ActivityForm from '../pages/student/ActivityForm';
import StudentMessages from '../pages/student/Messages';
import StudentProfile from '../pages/student/Profile';
import StudentFeedback from '../pages/student/Feedback';
import Documents from '../pages/student/Documents';
import StudentChallengeOfTheWeek from '../pages/student/ChallengeOfTheWeek';
import StudentMentorship from '../pages/student/Mentorship';
import StudentAssessments from '../pages/student/Assessments';
import QuestionOfTheDay from '../pages/student/QuestionOfTheDay';
import SSADashboard from '../pages/ssa/Dashboard';
import SSAStudents from '../pages/ssa/Students';
import SSAActivities from '../pages/ssa/Activities';
import SSADocuments from '../pages/ssa/Documents';
import SSAReports from '../pages/ssa/Reports';
import SSAMessages from '../pages/ssa/Messages';
import SSAProfile from '../pages/ssa/Profile';
import Assessments from '../pages/ssa/Assessments';
import RegistrationManagement from '../pages/ssa/RegistrationManagement';
import SSAChallengeOfTheWeek from '../pages/ssa/ChallengeOfTheWeek';
import SSAMentorship from '../pages/ssa/Mentorship';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminOrganizations from '../pages/admin/Organizations';
import AdminSchools from '../pages/admin/Schools';
import AdminScholarships from '../pages/admin/Scholarships';
import AdminPrograms from '../pages/admin/Programs';
import AdminReports from '../pages/admin/Reports';
import AdminSettings from '../pages/admin/Settings';
import AdminChallengeOfTheWeek from '../pages/admin/ChallengeOfTheWeek';
import AdminMentorship from '../pages/admin/Mentorship';
import MentorDashboard from '../pages/mentor/Dashboard';
import MentorMeetings from '../pages/mentor/Meetings';
import MentorMessages from '../pages/mentor/Messages';
import MentorProfile from '../pages/mentor/Profile';
import CurrentChallenges from '../pages/student/challenge-of-the-week/CurrentChallenges';
import CompletedChallenges from '../pages/student/challenge-of-the-week/CompletedChallenges';
import ChallengeResults from '../pages/student/challenge-of-the-week/ChallengeResults';
import StudentGoals from '../pages/student/Goals';
import SSAGoals from '../pages/ssa/Goals';
import AdminGoals from '../pages/admin/Goals';
import JobSearch from '../pages/student/career-planning/JobSearch';
import CareerInterests from '../pages/student/career-planning/CareerInterests';
import ActionPlan from '../pages/student/career-planning/ActionPlan';
import StudentCareerPlanning from '../pages/student/CareerPlanning';
import SSACareerPlanning from '../pages/ssa/CareerPlanning';
import AdminCareerPlanning from '../pages/admin/CareerPlanning';
// import RiseVideos from '../pages/student/RiseVideos';
import HealthyRecipes from '../pages/student/HealthyRecipes';
import LyricsOfLivin from '../pages/student/LyricsOfLivin';
import RiseMentorship from '../pages/student/rise/Mentorship';
import RiseChallenges from '../pages/student/rise/Challenges';
import RiseRewards from '../pages/student/rise/Rewards';
import WheelOfWellness from '../pages/student/heal/WheelOfWellness';
import WellnessAreaDetail from '../pages/student/WellnessAreaDetail';
import SSAReviewStudents from '../pages/ssa/ReviewStudents';
import AdminReviewStudents from '../pages/admin/ReviewStudents';
import StudentDetails from '../pages/ssa/StudentDetails';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// This is a bit of a workaround. Originally, the role "participant", was "student", but we had to rename it.
function getRoute(role?: string) {
  switch (role) {
    case 'participant':
      return 'student';
    case 'ssa':
      return 'ssa';
    case 'admin':
      return 'admin';
    case 'mentor':
      return 'mentor';
    default:
      return 'login';
  }
}

const AppRoutes: React.FC = () => {
  const { user } = useUser();

  return (
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Default Route - Redirect to login if no user */}
      <Route path="/" element={<Navigate to={user ? `/${getRoute(user.role)}` : '/login'} replace />} />

      {/* All Routes under MainLayout */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Routes>
                {/* Student Routes */}
                <Route path="student">
                  <Route index element={<StudentDashboard />} />
                  <Route path="dashboard" element={<Navigate to="/student" replace />} />
                  <Route path="journal" element={<StudentJournal />} />
                  <Route path="activities" element={<StudentActivities />} />
                  <Route path="activities/new" element={<ActivityForm />} />
                  <Route path="messages" element={<StudentMessages />} />
                  <Route path="profile" element={<StudentProfile />} />
                  <Route path="feedback" element={<StudentFeedback />} />
                  <Route path="documents" element={<Documents />} />
                  <Route path="assessments" element={<StudentAssessments />} />
                  <Route path="goals" element={<StudentGoals />} />
                  <Route path="healthy-recipes" element={<HealthyRecipes />} />
                  <Route path="lyrics-of-livin" element={<LyricsOfLivin />} />
                  <Route path="challenge-of-the-week">
                    <Route index element={<StudentChallengeOfTheWeek />} />
                    <Route path="current" element={<CurrentChallenges />} />
                    <Route path="completed" element={<CompletedChallenges />} />
                    <Route path="results" element={<ChallengeResults />} />
                    <Route path=":id" element={<StudentChallengeOfTheWeek />} />
                  </Route>
                  <Route path="question-of-the-day" element={<QuestionOfTheDay />} />
                  <Route path="mentorship" element={<StudentMentorship />} />
                  <Route path="activities/new" element={<ActivityForm />} />
                  <Route path="activities/:id/edit" element={<ActivityForm />} />
                  <Route path="career-planning" element={<StudentCareerPlanning />}>
                    <Route index element={<Navigate to="/student/career-planning/search" replace />} />
                    <Route path="search" element={<JobSearch />} />
                    <Route path="interests" element={<CareerInterests />} />
                    <Route path="action-plan" element={<ActionPlan />} />
                  </Route>
                  <Route path="rise">
                    <Route path="mentorship" element={<RiseMentorship />} />
                    <Route path="challenges" element={<RiseChallenges />} />
                    <Route path="rewards" element={<RiseRewards />} />
                  </Route>
                  <Route path="heal">
                    <Route path="wheel" element={<WheelOfWellness />} />
                    <Route path=":id" element={<WellnessAreaDetail />} />
                    <Route index element={<Navigate to="/student/heal/wheel" replace />} />
                  </Route>
                </Route>

                {/* SSA Routes */}
                <Route path="ssa">
                  <Route index element={<SSADashboard />} />
                  <Route path="dashboard" element={<Navigate to="/ssa" replace />} />
                  <Route path="challenge-of-the-week" element={<SSAChallengeOfTheWeek />} />
                  <Route path="mentorship" element={<SSAMentorship />} />
                  <Route path="students" element={<SSAStudents />} />
                  <Route path="students/:id" element={<StudentDetails />} />
                  <Route path="activities" element={<SSAActivities />} />
                  <Route path="registration" element={<RegistrationManagement />} />
                  <Route path="documents" element={<SSADocuments />} />
                  <Route path="reports" element={<SSAReports />} />
                  <Route path="messages" element={<SSAMessages />} />
                  <Route path="profile" element={<SSAProfile />} />
                  <Route path="assessments" element={<Assessments />} />
                  <Route path="goals" element={<SSAGoals />} />
                  <Route path="career-planning" element={<SSACareerPlanning />}>
                    <Route index element={<Navigate to="/ssa/career-planning/search" replace />} />
                    <Route path="search" element={<JobSearch />} />
                    <Route path="interests" element={<CareerInterests />} />
                    <Route path="action-plan" element={<ActionPlan />} />
                  </Route>
                  <Route path="rise">
                    <Route path="mentorship" element={<RiseMentorship />} />
                    <Route path="challenges" element={<RiseChallenges />} />
                    <Route path="rewards" element={<RiseRewards />} />
                  </Route>
                  <Route path="review-students" element={<SSAReviewStudents />} />
                </Route>

                {/* Admin Routes */}
                <Route path="admin">
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<Navigate to="/admin" replace />} />
                  <Route path="challenge-of-the-week" element={<AdminChallengeOfTheWeek />} />
                  <Route path="mentorship" element={<AdminMentorship />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="organizations" element={<AdminOrganizations />} />
                  <Route path="schools" element={<AdminSchools />} />
                  <Route path="scholarships" element={<AdminScholarships />} />
                  <Route path="programs" element={<AdminPrograms />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="goals" element={<AdminGoals />} />
                  <Route path="career-planning" element={<AdminCareerPlanning />}>
                    <Route index element={<Navigate to="/admin/career-planning/search" replace />} />
                    <Route path="search" element={<JobSearch />} />
                    <Route path="interests" element={<CareerInterests />} />
                    <Route path="action-plan" element={<ActionPlan />} />
                  </Route>
                  <Route path="review-students" element={<AdminReviewStudents />} />
                </Route>

                {/* Mentor Routes */}
                <Route path="mentor">
                  <Route index element={<MentorDashboard />} />
                  <Route path="dashboard" element={<Navigate to="/mentor" replace />} />
                  <Route path="meetings" element={<MentorMeetings />} />
                  <Route path="messages" element={<MentorMessages />} />
                  <Route path="profile" element={<MentorProfile />} />
                </Route>

                {/* Default Route - Redirect to user's role dashboard */}
                <Route index element={<Navigate to={`/${getRoute(user?.role)}`} replace />} />
              </Routes>
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes; 
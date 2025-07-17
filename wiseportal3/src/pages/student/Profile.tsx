import React, { useState, ChangeEvent } from 'react';
import { FaUser, FaBirthdayCake, FaIdBadge, FaSchool, FaPhone, FaEnvelope, FaHome, FaUserFriends, FaQuoteLeft, FaStar, FaMedal, FaEdit } from 'react-icons/fa';
import { useUser } from '@/contexts/UserContext';

const mockProfile = {
  firstName: 'Lauren',
  lastName: 'Williams',
  dateOfBirth: '2007-05-15',
  studentId: '98452167',
  scholarshipStatus: 'Active', // Active, On Hold, Alumni
  profilePhoto: 'https://randomuser.me/api/portraits/women/44.jpg',
  schoolName: 'Lincoln High School',
  gradeLevel: '10',
  program: 'BGCS-WISE Scholarship',
  graduationYear: '2025',
  email: 'lauren.williams@example.com',
  mobilePhone: '(555) 123-4567',
  parentName: 'Jennifer Williams',
  parentPhone: '(555) 987-6543',
  parentEmail: 'Jennifer@example.com',
  homeAddress: '1914 Fitz Tpke, Springfield, IL',
  shortBio: 'I am a tenacious and motivated student',
  postSecondaryGoals: 'I plan to attend a four-year university to study engineering',
  hobbies: 'Robotics, soccer, painting',
  motto: 'Dream big, work hard, stay humble.',
  skills: ['Python', 'Public Speaking', 'First Aid Certified'],
};

const statusColors: Record<string, string> = {
  Active: 'bg-green-500',
  'On Hold': 'bg-yellow-500',
  Alumni: 'bg-blue-500',
};

const Profile: React.FC = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockProfile);
  const [editProfile, setEditProfile] = useState(profile);
  const [photoPreview, setPhotoPreview] = useState<string | null>(profile.profilePhoto);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoPreview(URL.createObjectURL(file));
      setEditProfile((prev) => ({ ...prev, profilePhoto: URL.createObjectURL(file) }));
    }
  };

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile(profile);
    setPhotoPreview(profile.profilePhoto);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Edit Button */}
        <div className="flex justify-end mb-4">
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg shadow flex items-center gap-2 text-lg"
            >
              <FaEdit /> Edit Profile
            </button>
          )}
        </div>
        {/* General Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6 border-t-8 border-blue-200">
          <div className="relative">
            <img
              src={photoPreview || profile.profilePhoto}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer shadow-lg">
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
                <FaEdit />
              </label>
            )}
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 text-blue-700 font-semibold text-lg">
                <FaUser /> General Information
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <div className="text-xs text-gray-500">First Name</div>
                  {isEditing ? (
                    <input name="firstName" value={editProfile.firstName} onChange={handleInputChange} className="font-semibold text-gray-900 bg-blue-50 rounded px-2 py-1 w-full" />
                  ) : (
                    <div className="font-semibold text-gray-900 bg-blue-50 rounded px-2 py-1">{profile.firstName}</div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-500">Last Name</div>
                  {isEditing ? (
                    <input name="lastName" value={editProfile.lastName} onChange={handleInputChange} className="font-semibold text-gray-900 bg-blue-50 rounded px-2 py-1 w-full" />
                  ) : (
                    <div className="font-semibold text-gray-900 bg-blue-50 rounded px-2 py-1">{profile.lastName}</div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-500">Date of Birth</div>
                  {isEditing ? (
                    <input type="date" name="dateOfBirth" value={editProfile.dateOfBirth} onChange={handleInputChange} className="font-semibold text-gray-900 bg-blue-50 rounded px-2 py-1 w-full" />
                  ) : (
                    <div className="font-semibold text-gray-900 bg-blue-50 rounded px-2 py-1 flex items-center gap-1"><FaBirthdayCake className="text-pink-400" />{profile.dateOfBirth}</div>
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-500">Student ID</div>
                  <div className="font-semibold text-gray-900 bg-blue-50 rounded px-2 py-1">{profile.studentId}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Scholarship Status</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold shadow ${statusColors[profile.scholarshipStatus] || 'bg-gray-400'}`}>{profile.scholarshipStatus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* School & Program Details */}
        <div className="bg-pink-50 rounded-2xl shadow-lg p-6 mb-6 border-t-8 border-pink-200">
          <div className="flex items-center gap-2 mb-4 text-pink-700 font-semibold text-lg">
            <FaSchool /> School & Program Details
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Current School Name</div>
              {isEditing ? (
                <input name="schoolName" value={editProfile.schoolName} onChange={handleInputChange} className="font-semibold text-gray-900 bg-pink-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-pink-100 rounded px-2 py-1">{profile.schoolName}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500">Grade Level</div>
              {isEditing ? (
                <input name="gradeLevel" value={editProfile.gradeLevel} onChange={handleInputChange} className="font-semibold text-gray-900 bg-pink-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-pink-100 rounded px-2 py-1">{profile.gradeLevel}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500">Program / Track</div>
              {isEditing ? (
                <input name="program" value={editProfile.program} onChange={handleInputChange} className="font-semibold text-gray-900 bg-pink-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-pink-100 rounded px-2 py-1">{profile.program}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500">Expected Graduation Year</div>
              {isEditing ? (
                <input name="graduationYear" value={editProfile.graduationYear} onChange={handleInputChange} className="font-semibold text-gray-900 bg-pink-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-pink-100 rounded px-2 py-1">{profile.graduationYear}</div>
              )}
            </div>
          </div>
        </div>
        {/* Contact Information */}
        <div className="bg-yellow-50 rounded-2xl shadow-lg p-6 mb-6 border-t-8 border-yellow-200">
          <div className="flex items-center gap-2 mb-4 text-yellow-700 font-semibold text-lg">
            <FaPhone /> Contact Information
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Email</div>
              {isEditing ? (
                <input name="email" value={editProfile.email} onChange={handleInputChange} className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1 flex items-center gap-1"><FaEnvelope className="text-yellow-500" />{profile.email}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500">Mobile Phone</div>
              {isEditing ? (
                <input name="mobilePhone" value={editProfile.mobilePhone} onChange={handleInputChange} className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1">{profile.mobilePhone}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500">Parent/Guardian Name</div>
              {isEditing ? (
                <input name="parentName" value={editProfile.parentName} onChange={handleInputChange} className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1">{profile.parentName}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500">Parent/Guardian Phone</div>
              {isEditing ? (
                <input name="parentPhone" value={editProfile.parentPhone} onChange={handleInputChange} className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1">{profile.parentPhone}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500">Parent/Guardian Email</div>
              {isEditing ? (
                <input name="parentEmail" value={editProfile.parentEmail} onChange={handleInputChange} className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1 flex items-center gap-1"><FaEnvelope className="text-yellow-500" />{profile.parentEmail}</div>
              )}
            </div>
            <div className="md:col-span-2">
              <div className="text-xs text-gray-500">Home Address</div>
              {isEditing ? (
                <input name="homeAddress" value={editProfile.homeAddress} onChange={handleInputChange} className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-yellow-100 rounded px-2 py-1 flex items-center gap-1"><FaHome className="text-yellow-500" />{profile.homeAddress}</div>
              )}
            </div>
          </div>
        </div>
        {/* Biography & Aspirations */}
        <div className="bg-purple-50 rounded-2xl shadow-lg p-6 mb-6 border-t-8 border-purple-200">
          <div className="flex items-center gap-2 mb-4 text-purple-700 font-semibold text-lg">
            <FaQuoteLeft /> Biography & Aspirations
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500">Short Bio (About Me)</div>
              {isEditing ? (
                <textarea name="shortBio" value={editProfile.shortBio} onChange={handleInputChange} className="font-semibold text-gray-900 bg-purple-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-purple-100 rounded px-2 py-1">{profile.shortBio}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500">Post-Secondary Goals</div>
              {isEditing ? (
                <textarea name="postSecondaryGoals" value={editProfile.postSecondaryGoals} onChange={handleInputChange} className="font-semibold text-gray-900 bg-purple-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-purple-100 rounded px-2 py-1">{profile.postSecondaryGoals}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500">Hobbies / Interests</div>
              {isEditing ? (
                <input name="hobbies" value={editProfile.hobbies} onChange={handleInputChange} className="font-semibold text-gray-900 bg-purple-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-purple-100 rounded px-2 py-1">{profile.hobbies}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500">Personal Quote or Motto</div>
              {isEditing ? (
                <input name="motto" value={editProfile.motto} onChange={handleInputChange} className="italic text-gray-700 bg-purple-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="italic text-gray-700 bg-purple-100 rounded px-2 py-1 flex items-center gap-2"><FaStar className="text-yellow-400" />{profile.motto}</div>
              )}
            </div>
          </div>
        </div>
        {/* Additional Insights */}
        <div className="bg-orange-50 rounded-2xl shadow-lg p-6 border-t-8 border-orange-200">
          <div className="flex items-center gap-2 mb-4 text-orange-700 font-semibold text-lg">
            <FaMedal /> Additional Insights
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 font-semibold flex items-center gap-1"><FaStar className="text-yellow-400" /> Hobbies / Interests</div>
              {isEditing ? (
                <input name="hobbies" value={editProfile.hobbies} onChange={handleInputChange} className="font-semibold text-gray-900 bg-orange-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="font-semibold text-gray-900 bg-orange-100 rounded px-2 py-1">{profile.hobbies}</div>
              )}
            </div>
            <div>
              <div className="text-xs text-gray-500 font-semibold flex items-center gap-1"><FaMedal className="text-orange-400" /> Skills & Certifications</div>
              {isEditing ? (
                <input name="skills" value={editProfile.skills.join(', ')} onChange={e => setEditProfile(prev => ({ ...prev, skills: e.target.value.split(',').map(s => s.trim()) }))} className="font-semibold text-gray-900 bg-orange-100 rounded px-2 py-1 w-full" />
              ) : (
                <div className="flex flex-wrap gap-2 mt-1">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="inline-block bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs font-bold shadow">{skill}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Save/Cancel Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-4 mt-6">
            <button onClick={handleCancel} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg shadow">Cancel</button>
            <button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg shadow">Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 
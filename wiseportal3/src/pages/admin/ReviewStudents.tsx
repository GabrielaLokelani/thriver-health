import React, { useState } from 'react';
import Modal from '../../components/common/Modal';

const mockStudents = [
  { name: 'Fabian De La Cruz', location: '1001 E Brett St, Inglewood, CA 90302', dob: '3/16/08', school: 'Just Keep Livin Foundation' },
  { name: 'Dalila Hernandez', location: '7225 Brighton Ave, Los Angeles, CA 90047', dob: '6/01/09', school: 'Just Keep Livin Foundation' },
  { name: 'Agustin Estrada', location: '728 E Kelso St, Inglewood, CA 90301', dob: '5/01/24', school: 'Just Keep Livin Foundation' },
  { name: 'Henry Orantes', location: 'Henry', dob: '11/21/24', school: 'Just Keep Livin Foundation' },
  { name: 'Jacob Aldrete', location: 'Jacob', dob: '11/21/24', school: 'Just Keep Livin Foundation' },
  { name: 'Jacob Roman', location: 'Jacob', dob: '11/21/24', school: 'Just Keep Livin Foundation' },
];

const mockActivities = [
  { name: 'Jacob Roman', activity: 'TEST 2', details: 'TEST 2', pillar: 'Extracurricular Activities', period: '1', date: '5/16/2025', hours: '2', status: 'Submitted' },
];

const ReviewStudents: React.FC = () => {
  const [studentSearch, setStudentSearch] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [activitySearch, setActivitySearch] = useState('');
  const [status, setStatus] = useState('Submitted');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [comments, setComments] = useState('');
  const [points, setPoints] = useState('0.130');
  const [file, setFile] = useState<File | null>(null);

  const filteredStudents = mockStudents.filter(s =>
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) &&
    s.location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredActivities = mockActivities.filter(a =>
    a.name.toLowerCase().includes(activitySearch.toLowerCase()) &&
    (status === 'All' || a.status === status)
  );

  const openModal = (activity: any) => {
    setSelectedActivity(activity);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedActivity(null);
    setComments('');
    setPoints('0.130');
    setFile(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Student Points Overview</h2>
        <div className="flex gap-4 mb-2">
          <input className="border rounded px-2 py-1" placeholder="Search by name" value={studentSearch} onChange={e => setStudentSearch(e.target.value)} />
          <input className="border rounded px-2 py-1" placeholder="Location" value={locationSearch} onChange={e => setLocationSearch(e.target.value)} />
        </div>
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">Student name</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Date of birth</th>
              <th className="px-4 py-2 text-left">Related School</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{s.name}</td>
                <td className="px-4 py-2">{s.location}</td>
                <td className="px-4 py-2">{s.dob}</td>
                <td className="px-4 py-2">{s.school}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Students activity record</h2>
        <div className="flex gap-4 mb-2">
          <input className="border rounded px-2 py-1" placeholder="Search by name" value={activitySearch} onChange={e => setActivitySearch(e.target.value)} />
          <select className="border rounded px-2 py-1" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="Submitted">Submitted</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="All">All</option>
          </select>
        </div>
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-2 text-left">Student name</th>
              <th className="px-4 py-2 text-left">Activity name</th>
              <th className="px-4 py-2 text-left">Program Pillar</th>
              <th className="px-4 py-2 text-left">Program Period</th>
              <th className="px-4 py-2 text-left">Date performed</th>
              <th className="px-4 py-2 text-left">Hours/GPA</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredActivities.map((a, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-2">{a.name}</td>
                <td className="px-4 py-2">{a.activity}</td>
                <td className="px-4 py-2">{a.pillar}</td>
                <td className="px-4 py-2">{a.period}</td>
                <td className="px-4 py-2">{a.date}</td>
                <td className="px-4 py-2">{a.hours}</td>
                <td className="px-4 py-2">{a.status}</td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:underline mr-2" onClick={() => openModal(a)}>Review/Approve</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} title="Activity">
        {selectedActivity && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="font-medium">Student name</div>
                <div>{selectedActivity.name}</div>
                <div className="font-medium mt-2">Activity details</div>
                <div>{selectedActivity.details}</div>
                <div className="font-medium mt-2">Date performed</div>
                <div>{new Date(selectedActivity.date).toLocaleString()}</div>
                <div className="font-medium mt-2">Activity Pillar</div>
                <div>{selectedActivity.pillar}</div>
              </div>
              <div>
                <div className="font-medium">Activity name</div>
                <div>{selectedActivity.activity}</div>
                <div className="font-medium mt-2">Hours spent</div>
                <div>{selectedActivity.hours}</div>
                <div className="font-medium mt-2">Year</div>
                <div>{selectedActivity.period}</div>
              </div>
            </div>
            <hr className="my-4" />
            <div className="mb-2 font-semibold">Comments</div>
            <div className="mb-2 text-sm text-gray-600">Share your comments on the student's record activity</div>
            <textarea
              className="w-full border rounded p-2 mb-4"
              rows={3}
              placeholder="Comments"
              value={comments}
              onChange={e => setComments(e.target.value)}
            />
            <div className="mb-2 font-semibold">Set point earned</div>
            <input
              className="w-full border rounded p-2 mb-4"
              type="number"
              step="0.001"
              value={points}
              onChange={e => setPoints(e.target.value)}
            />
            <label className="block mb-4">
              <span className="block mb-2 font-semibold">Attach file</span>
              <input
                type="file"
                className="hidden"
                onChange={e => setFile(e.target.files ? e.target.files[0] : null)}
                id="activity-file-upload"
              />
              <label htmlFor="activity-file-upload" className="w-full flex items-center justify-center bg-blue-600 text-white py-3 rounded cursor-pointer">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.586-6.586a4 4 0 10-5.656-5.656l-6.586 6.586a6 6 0 108.485 8.485l6.586-6.586" /></svg>
                Attach file
              </label>
              {file && <div className="mt-2 text-sm text-gray-700">Selected: {file.name}</div>}
            </label>
            <div className="flex justify-between mt-6">
              <button className="border rounded px-4 py-2" onClick={closeModal}>Cancel</button>
              <button className="bg-green-500 text-white rounded px-4 py-2 ml-2">Approve</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReviewStudents; 
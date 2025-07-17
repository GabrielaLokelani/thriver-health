import {
  CalendarIcon,
  PencilIcon,
  PencilSquareIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FormContainer from '../../components/common/FormContainer';
import FormField, { Input, Textarea } from '../../components/common/FormField';
import { FaRegLightbulb, FaCamera, FaFileAlt, FaVideo } from 'react-icons/fa';
import { FaBookOpen, FaSmile, FaEdit, FaTrash } from 'react-icons/fa';

interface JournalEntry {
  id?: string;
  title: string;
  content: string;
  date: string;
  mood: string;
  photo?: File | null;
  document?: File | null;
  video?: File | null;
}

const Journal: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isNewEntry = searchParams.get('new') === 'true';
  const [formData, setFormData] = useState<JournalEntry>({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    mood: 'neutral',
    photo: null,
    document: null,
    video: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof JournalEntry, string>>>({});
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    // Placeholder for actual API call
    setEntries([
      {
        id: '1',
        title: 'First Day of School',
        content: 'Today was my first day at the new school...'
        , date: '2024-03-20', mood: 'excited',
      },
      {
        id: '2',
        title: 'Volunteering Experience',
        content: 'I spent the afternoon at the local food bank...',
        date: '2024-03-18', mood: 'fulfilled',
      },
    ]);
  }, []);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof JournalEntry, string>> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Placeholder for API call
      navigate('/student/journal');
    }
  };

  const moodOptions = [
    { value: 'great', label: 'Great', emoji: '😊' },
    { value: 'good', label: 'Good', emoji: '🙂' },
    { value: 'neutral', label: 'Neutral', emoji: '😐' },
    { value: 'bad', label: 'Bad', emoji: '🙁' },
    { value: 'terrible', label: 'Terrible', emoji: '😢' },
  ];

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      content: entry.content,
      date: entry.date,
      mood: entry.mood,
      photo: entry.photo,
      document: entry.document,
      video: entry.video,
    });
    // Add edit parameter to URL
    navigate(`/student/journal?edit=${entry.id}`);
  };

  const handleDelete = (id: string) => {
    // TODO: Delete journal entry from API
    setEntries(entries.filter(entry => entry.id !== id));
    navigate('/student/journal');
  };

  const handleCancel = () => {
    setEditingEntry(null);
    setFormData({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      mood: 'neutral',
      photo: null,
      document: null,
      video: null,
    });
    navigate('/student/journal');
  };

  if (isNewEntry || editingEntry) {
    return (
      <div className="min-h-screen bg-blue-50 py-8">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">New Journal Entry</span>
            <FaRegLightbulb className="text-yellow-400 text-4xl -rotate-12 drop-shadow" />
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block font-bold text-lg text-gray-900 mb-1">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                className="w-full rounded-lg border-none bg-yellow-100 focus:ring-2 focus:ring-yellow-300 px-4 py-2 text-lg placeholder-gray-400"
                placeholder="Enter title"
                value={formData.title}
                onChange={e => setFormData(f => ({ ...f, title: e.target.value }))}
                required
              />
              {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
            </div>
            {/* Content */}
            <div>
              <label className="block font-bold text-lg text-gray-900 mb-1">Content <span className="text-red-500">*</span></label>
              <textarea
                className="w-full rounded-lg border-none bg-purple-100 focus:ring-2 focus:ring-purple-300 px-4 py-2 text-lg placeholder-gray-400 min-h-[120px]"
                placeholder="Write your journal entry here..."
                value={formData.content}
                onChange={e => setFormData(f => ({ ...f, content: e.target.value }))}
                required
              />
              {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
            </div>
            {/* Mood Picker */}
            <div>
              <label className="block font-bold text-lg text-gray-900 mb-1">Mood</label>
              <div className="flex gap-3 mb-2">
                {moodOptions.map(option => (
                  <button
                    type="button"
                    key={option.value}
                    className={`flex flex-col items-center px-3 py-2 rounded-lg border-2 transition font-semibold text-lg ${formData.mood === option.value ? 'bg-yellow-200 border-yellow-400 text-yellow-900 shadow' : 'bg-yellow-50 border-yellow-200 text-gray-500 hover:bg-yellow-100'}`}
                    onClick={() => setFormData(f => ({ ...f, mood: option.value }))}
                  >
                    <span className="text-2xl mb-1">{option.emoji}</span>
                    <span className="text-xs">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            {/* Photo Upload */}
            <div>
              <label className="block font-bold text-lg text-gray-900 mb-1">Photo</label>
              <label className="flex items-center gap-3 bg-yellow-100 rounded-lg px-4 py-3 cursor-pointer border-2 border-yellow-200 hover:bg-yellow-200 transition">
                <FaCamera className="text-2xl text-orange-400" />
                <span className="text-base text-gray-700">{formData.photo ? formData.photo.name : 'Choose a photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setFormData(f => ({ ...f, photo: e.target.files?.[0] || null }))}
                />
              </label>
            </div>
            {/* Document Upload */}
            <div>
              <label className="block font-bold text-lg text-gray-900 mb-1">Document</label>
              <label className="flex items-center gap-3 bg-yellow-100 rounded-lg px-4 py-3 cursor-pointer border-2 border-yellow-200 hover:bg-yellow-200 transition">
                <FaFileAlt className="text-2xl text-orange-400" />
                <span className="text-base text-gray-700">{formData.document ? formData.document.name : 'Choose a document'}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf"
                  className="hidden"
                  onChange={e => setFormData(f => ({ ...f, document: e.target.files?.[0] || null }))}
                />
              </label>
            </div>
            {/* Video Upload */}
            <div>
              <label className="block font-bold text-lg text-gray-900 mb-1">Video</label>
              <label className="flex items-center gap-3 bg-yellow-100 rounded-lg px-4 py-3 cursor-pointer border-2 border-yellow-200 hover:bg-yellow-200 transition">
                <FaVideo className="text-2xl text-orange-400" />
                <span className="text-base text-gray-700">{formData.video ? formData.video.name : 'Choose a video'}</span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={e => setFormData(f => ({ ...f, video: e.target.files?.[0] || null }))}
                />
              </label>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-6 py-2 rounded-lg text-lg shadow"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg text-lg shadow"
              >
                Save Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Redesigned Journal List Page
  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <FaBookOpen className="text-3xl text-blue-400 drop-shadow" />
            <h1 className="text-3xl font-bold text-gray-900">My Journal</h1>
          </div>
          <button
            onClick={() => navigate('/student/journal?new=true')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-lg text-lg shadow flex items-center gap-2"
          >
            <FaEdit className="-ml-1" /> New Entry
          </button>
        </div>
        <div className="grid gap-6">
          {entries.map((entry, idx) => (
            <div
              key={entry.id}
              className={`rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-6 border-t-8 ${idx % 3 === 0 ? 'bg-yellow-50 border-yellow-200' : idx % 3 === 1 ? 'bg-pink-50 border-pink-200' : 'bg-purple-50 border-purple-200'}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-900">{entry.title}</span>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-700 ml-2">{entry.date}</span>
                </div>
                <div className="text-gray-700 mb-2 whitespace-pre-line">{entry.content}</div>
                <div className="flex items-center gap-2 mt-2">
                  {(() => {
                    const mood = moodOptions.find(m => m.value === entry.mood);
                    return mood ? (
                      <>
                        <span className="text-2xl">{mood.emoji}</span>
                        <span className="text-sm font-semibold text-gray-700 capitalize">{mood.label}</span>
                      </>
                    ) : null;
                  })()}
                </div>
              </div>
              <div className="flex flex-col gap-2 md:items-end">
                <button
                  onClick={() => handleEdit(entry)}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold shadow text-sm"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(entry.id || '')}
                  className="flex items-center gap-1 px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded-lg font-bold shadow text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
          {entries.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center text-gray-500 text-lg">
              No journal entries yet. Click <span className="font-bold text-orange-500">New Entry</span> to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal; 
import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PaperAirplaneIcon,
  InformationCircleIcon,
  PlusIcon,
  XMarkIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isFromMe: boolean;
}

interface Chat {
  id: string;
  name: string;
  role: 'student' | 'ssa' | 'mentor';
  organization: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}

const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [newMessageRecipient, setNewMessageRecipient] = useState('');
  const [newMessageContent, setNewMessageContent] = useState('');
  const [newMessageRole, setNewMessageRole] = useState<Chat['role']>('student');

  const chats: Chat[] = [
    {
      id: '1',
      name: 'Jane Smith',
      role: 'student',
      organization: 'University of Technology',
      lastMessage: 'Thank you for your assistance!',
      timestamp: '1 day',
      unread: true,
      messages: [
        { id: '1', sender: 'Jane', content: 'Hello, I need help with my scholarship application', timestamp: '1 day ago', isFromMe: false },
        { id: '2', sender: 'Me', content: 'I\'ll be happy to help. What specific questions do you have?', timestamp: '1 day ago', isFromMe: true },
        { id: '3', sender: 'Jane', content: 'Thank you for your assistance!', timestamp: '1 day ago', isFromMe: false },
      ]
    },
    // Add more chats as needed
  ];

  const handleNewMessage = () => {
    if (!newMessageRecipient.trim() || !newMessageContent.trim()) return;
    
    // Here you would typically make an API call to create a new chat
    const newChat: Chat = {
      id: Date.now().toString(),
      name: newMessageRecipient,
      role: newMessageRole,
      organization: 'WISE Organization',
      lastMessage: newMessageContent,
      timestamp: 'Just now',
      unread: false,
      messages: [
        {
          id: '1',
          sender: 'Me',
          content: newMessageContent,
          timestamp: 'Just now',
          isFromMe: true
        }
      ]
    };

    // Add the new chat to the list
    chats.unshift(newChat);
    setSelectedChat(newChat);
    setIsNewMessageModalOpen(false);
    setNewMessageRecipient('');
    setNewMessageContent('');
    setNewMessageRole('student');
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    // Handle sending message
    setNewMessage('');
  };

  const getRoleColor = (role: Chat['role']) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800';
      case 'ssa':
        return 'bg-purple-100 text-purple-800';
      case 'mentor':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Left sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <button 
              className="btn-icon"
              onClick={() => setIsNewMessageModalOpen(true)}
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-transparent"
              />
            </div>
            <div className="flex items-center">
              <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="ssa">SSAs</option>
                <option value="mentor">Mentors</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats
            .filter(chat => selectedRole === 'all' || chat.role === selectedRole)
            .map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full p-4 text-left hover:bg-gray-50 ${
                  selectedChat?.id === chat.id ? 'bg-[var(--wise-yellow-light)]' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{chat.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(chat.role)}`}>
                        {chat.role.toUpperCase()}
                      </span>
                      <p className="text-xs text-gray-500">{chat.organization}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-500">{chat.timestamp}</span>
                    {chat.unread && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[var(--wise-orange)] text-white">
                        New
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 truncate mt-1">{chat.lastMessage}</p>
              </button>
            ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Info banner */}
        <div className="bg-[var(--wise-yellow-light)] p-4">
          <div className="flex items-start gap-3">
            <InformationCircleIcon className="h-6 w-6 text-[var(--wise-orange)] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-600">
              My Network enables communication across the WISE Portal platform. As an administrator, 
              you can communicate with students, SSAs, and mentors. All communications are monitored 
              to ensure appropriate interactions and support.
            </p>
          </div>
        </div>

        {selectedChat ? (
          <>
            {/* Chat header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{selectedChat.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(selectedChat.role)}`}>
                      {selectedChat.role.toUpperCase()}
                    </span>
                    <p className="text-sm text-gray-500">{selectedChat.organization}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {selectedChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.isFromMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isFromMe
                        ? 'bg-[var(--wise-orange)] text-white'
                        : 'bg-white text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 opacity-75">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write a message"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="btn-primary"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a conversation to start messaging</p>
          </div>
        )}
      </div>

      {/* New Message Modal */}
      {isNewMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">New Message</h3>
              <button 
                className="btn-icon"
                onClick={() => setIsNewMessageModalOpen(false)}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  type="text"
                  id="recipient"
                  value={newMessageRecipient}
                  onChange={(e) => setNewMessageRecipient(e.target.value)}
                  placeholder="Enter recipient name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  id="role"
                  value={newMessageRole}
                  onChange={(e) => setNewMessageRole(e.target.value as Chat['role'])}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-transparent"
                >
                  <option value="student">Student</option>
                  <option value="ssa">SSA</option>
                  <option value="mentor">Mentor</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={newMessageContent}
                  onChange={(e) => setNewMessageContent(e.target.value)}
                  placeholder="Write your message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-transparent"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className="btn-secondary"
                  onClick={() => setIsNewMessageModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handleNewMessage}
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages; 
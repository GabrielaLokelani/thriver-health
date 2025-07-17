import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  PaperAirplaneIcon,
  InformationCircleIcon,
  PlusIcon,
  XMarkIcon
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
  role: 'ssa' | 'mentor';
  organization: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  messages: Message[];
}

const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);
  const [newMessageRecipient, setNewMessageRecipient] = useState('');
  const [newMessageContent, setNewMessageContent] = useState('');

  const chats: Chat[] = [
    {
      id: '1',
      name: 'testing 123',
      role: 'ssa',
      organization: 'WISE Organization',
      lastMessage: 'Howdy',
      timestamp: '68 days',
      unread: false,
      messages: [
        { id: '1', sender: 'Jane', content: 'Hi Jane!', timestamp: '68 days ago', isFromMe: false },
        { id: '2', sender: 'Me', content: 'Hello!', timestamp: '68 days ago', isFromMe: true },
        { id: '3', sender: 'Jane', content: 'Howdy', timestamp: '68 days ago', isFromMe: false },
      ]
    },
    // Add more chats as needed
  ];

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    // Handle sending message
    setNewMessage('');
  };

  const handleNewMessage = () => {
    if (!newMessageRecipient.trim() || !newMessageContent.trim()) return;
    
    // Here you would typically make an API call to create a new chat
    const newChat: Chat = {
      id: Date.now().toString(),
      name: newMessageRecipient,
      role: 'ssa',
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
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--wise-orange)] focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`w-full p-4 text-left hover:bg-gray-50 ${
                selectedChat?.id === chat.id ? 'bg-[var(--wise-yellow-light)]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{chat.name}</span>
                <span className="text-sm text-gray-500">{chat.timestamp}</span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
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
              My Network is your gateway to communicate directly with your Senior Scholarship Administrator, 
              designed to ensure you receive the support you need throughout your educational journey. 
              Keep in mind, communications here are subject to review. We ensure confidentiality and 
              discretion in managing your interactions; however, the Steele Family Foundation is not 
              liable for personal content shared through these communications.
            </p>
          </div>
        </div>

        {selectedChat ? (
          <>
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
            <p className="text-gray-500">Select a chat to start messaging</p>
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
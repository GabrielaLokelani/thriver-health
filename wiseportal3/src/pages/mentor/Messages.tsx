import {
  ChatBubbleLeftIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import MessageModal from '../../components/modals/MessageModal';

interface Message {
  id: string;
  menteeName: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  menteeName: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const sampleConversations: Conversation[] = [
  {
    id: '1',
    menteeName: 'Andrés Fernandez',
    lastMessage: 'Thank you for the feedback on my project proposal.',
    timestamp: '2024-03-15T10:30:00',
    unreadCount: 2,
  },
  {
    id: '2',
    menteeName: 'Maria Garcia',
    lastMessage: 'I have a question about the upcoming meeting.',
    timestamp: '2024-03-15T09:15:00',
    unreadCount: 1,
  },
];

const sampleMessages: Message[] = [
  {
    id: '1',
    menteeName: 'Andrés Fernandez',
    content: 'Thank you for the feedback on my project proposal.',
    timestamp: '2024-03-15T10:30:00',
    isRead: false,
  },
  {
    id: '2',
    menteeName: 'Andrés Fernandez',
    content: 'I\'ve made the suggested changes and would like your review.',
    timestamp: '2024-03-15T10:35:00',
    isRead: false,
  },
];

const MentorMessages: React.FC = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // TODO: Implement message sending
    setNewMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <button
          onClick={() => setIsMessageModalOpen(true)}
          className="btn-primary"
        >
          <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
          New Message
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Conversations</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {sampleConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">
                    {conversation.menteeName}
                  </h3>
                  {conversation.unreadCount > 0 && (
                    <span className="h-2 w-2 rounded-full bg-[var(--wise-orange)]" />
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500 truncate">
                  {conversation.lastMessage}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(conversation.timestamp).toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Messages View */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md border border-gray-200">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  {sampleConversations.find(c => c.id === selectedConversation)?.menteeName}
                </h2>
              </div>
              <div className="h-[600px] overflow-y-auto p-4 space-y-4">
                {sampleMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isRead ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isRead
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-[var(--wise-orange)] text-white'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isRead ? 'text-gray-500' : 'text-white/80'
                        }`}
                      >
                        {new Date(message.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)]"
                  />
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    <PaperAirplaneIcon className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="h-[600px] flex items-center justify-center text-gray-500">
              Select a conversation to view messages
            </div>
          )}
        </div>
      </div>

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        onSubmit={handleSendMessage}
      />
    </div>
  );
};

export default MentorMessages; 
import React, { useState } from 'react';
import { ChatBubbleLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import MessageModal from '../../components/modals/MessageModal';

const MenteeMessages: React.FC = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  // Sample data - in a real app, this would come from an API
  const conversations = [
    {
      id: '1',
      mentor: 'Dr. Sarah Johnson',
      lastMessage: 'You\'re welcome! The proposal looks much stronger now. Let me know if you need any further assistance.',
      timestamp: '2024-03-10T14:35:00',
      unread: false,
    },
  ];

  const messages = {
    '1': [
      {
        id: '1',
        sender: 'Andrés Fernandez',
        content: 'Thank you for the feedback on my research proposal.',
        timestamp: '2024-03-10T14:30:00',
        isMentee: true,
      },
      {
        id: '2',
        sender: 'Dr. Sarah Johnson',
        content: 'You\'re welcome! The proposal looks much stronger now. Let me know if you need any further assistance.',
        timestamp: '2024-03-10T14:35:00',
        isMentee: false,
      },
    ],
  };

  const handleSendMessage = (messageData: any) => {
    console.log('Sending message:', messageData);
    // In a real app, this would make an API call
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <button
          onClick={() => setIsMessageModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)]"
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
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`w-full p-4 text-left hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? 'bg-gray-50' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">
                    {conversation.mentor}
                  </h3>
                  {conversation.unread && (
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
                  {conversations.find((c) => c.id === selectedConversation)?.mentor}
                </h2>
              </div>
              <div className="h-[600px] overflow-y-auto p-4 space-y-4">
                {messages[selectedConversation as keyof typeof messages].map(
                  (message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isMentee ? 'justify-start' : 'justify-end'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.isMentee
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-[var(--wise-orange)] text-white'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isMentee ? 'text-gray-500' : 'text-white/80'
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="p-4 border-t border-gray-200">
                <form className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)]"
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

export default MenteeMessages; 
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PaperClipIcon } from '@heroicons/react/24/outline';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (messageData: any) => void;
  recipientName?: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  recipientName,
}) => {
  const [messageData, setMessageData] = useState({
    subject: '',
    content: '',
    attachments: [] as File[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(messageData);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMessageData({
        ...messageData,
        attachments: Array.from(e.target.files),
      });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-white p-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              New Message
            </Dialog.Title>
            <button
              type="button"
              className="rounded-md text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {recipientName && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  To
                </label>
                <p className="mt-1 text-sm text-gray-500">{recipientName}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                value={messageData.subject}
                onChange={(e) => setMessageData({ ...messageData, subject: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                value={messageData.content}
                onChange={(e) => setMessageData({ ...messageData, content: e.target.value })}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--wise-orange)] focus:ring-[var(--wise-orange)] sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Attachments
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <label className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)] cursor-pointer">
                  <PaperClipIcon className="h-5 w-5 mr-2" />
                  Add Files
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {messageData.attachments.length > 0 && (
                  <span className="text-sm text-gray-500">
                    {messageData.attachments.length} file(s) selected
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--wise-orange)] hover:bg-[var(--wise-orange-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--wise-orange)]"
              >
                Send Message
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default MessageModal; 
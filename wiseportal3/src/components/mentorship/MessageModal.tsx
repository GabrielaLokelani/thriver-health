import React, { useState } from 'react';
import FormContainer from '../common/FormContainer';
import FormField, { Input, Textarea } from '../common/FormField';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: { subject: string; content: string }) => void;
  recipient?: string;
}

const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  recipient,
}) => {
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Message content is required';
    } else if (formData.content.length > 1000) {
      newErrors.content = 'Message cannot exceed 1000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <FormContainer 
          title={`New Message${recipient ? ` to ${recipient}` : ''}`}
          showBackButton={false}
          className="p-0"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField
              label="Subject"
              id="subject"
              required
              error={errors.subject}
            >
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter message subject"
                required
                error={errors.subject}
              />
            </FormField>

            <FormField
              label="Message"
              id="content"
              required
              error={errors.content}
              helper={`${formData.content.length}/1000 characters`}
            >
              <Textarea
                id="content"
                rows={6}
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Type your message here..."
                required
                error={errors.content}
                maxLength={1000}
              />
            </FormField>

            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </FormContainer>
      </div>
    </div>
  );
};

export default MessageModal; 
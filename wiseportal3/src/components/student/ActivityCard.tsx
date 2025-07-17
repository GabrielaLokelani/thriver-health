import { UserActivity, UserActivityStatus } from '@/types';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';
import {
    ChatBubbleLeftIcon,
    CheckCircleIcon,
    ClockIcon,
    PencilIcon,
  } from '@heroicons/react/24/outline';
  import React, { useState } from 'react';

type ActivityCardParams = { 
    activity: UserActivity, 
    handleEdit: (activity: UserActivity) => void 
}

export const ActivityCard: React.FC<ActivityCardParams> = ({ activity }) => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  // const [statusIcon, setStatusIcon] = useState();
  // "accepted" | "submitted" | "rejected" | "archive";
  // const statusColors = {
  //   draft: 'bg-gray-100 text-gray-700',
  //   pending: 'bg-yellow-100 text-yellow-700',
  //   approved: 'bg-green-100 text-green-700',
  //   rejected: 'bg-red-100 text-red-700',
  // };

  function getStatus(status?: UserActivityStatus): string {
    switch (status) {
      case 'accepted':
        return 'Approved';
      case 'rejected':
        return "Feedback Ready"
      case 'submitted':
        return "Waiting for Feedback";
      default:
        return "Draft" // Not yet implemented
    }
  }

  // const statusIcons = {
  //   draft: PencilIcon,
  //   pending: ClockIcon,
  //   approved: CheckCircleIcon,
  //   rejected: XCircleIcon,
  // };

  function getStatusIcon(status: UserActivityStatus) {
    switch (status) {
      case 'accepted':
        return CheckCircleIcon;
      case 'rejected':
        return PencilIcon
      case 'submitted':
        return ClockIcon;
      default:
        return PencilIcon // Not yet implemented; draft step
    }
  }


  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-medium text-gray-900">{activity.title}</h3>
            <span className="text-sm text-gray-500">{activity?.datePerformed}</span>
          </div>
          <div className="flex flex-row align-items baseline">
            {
              (activity?.description && activity?.description?.length > 20) && showDetails ?
              <ChevronDownIcon className="w-8 h-8 cursor-pointer" onClick={() => setShowDetails(!showDetails)} /> :
              (activity?.description && activity?.description?.length > 20) && !showDetails ?
              <ChevronUpIcon className="w-8 h-8 cursor-pointer" fontSize={12} onClick={() => setShowDetails(!showDetails)}/> :
              null
            }
            {
              (showDetails || (activity?.description && activity.description?.length <= 20)) ?
              <p className="text-sm text-gray-500 mt-1">{activity.description}</p> :
              <p className="text-sm text-gray-500 mt-1">{activity.description?.substring(0,20)}...</p>
            }
          </div>
          
          
          <div className="flex items-center space-x-4 mt-2">
            {!!activity.points &&
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {activity.points} points
            </span>}
            {/* {activity.documents.length > 0 && (
              <span className="inline-flex items-center text-sm text-gray-500">
                <DocumentIcon className="w-4 h-4 mr-1" />
                {activity.documents.length} document{activity.documents.length !== 1 ? 's' : ''}
              </span>
            )} */}
            {(activity.status === 'rejected' || activity.status === 'accepted') && activity.feedback && (
              <button
                onClick={() => setShowFeedback(!showFeedback)}
                className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
              >
                <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                View Feedback
              </button>
            )}
          </div>

          {showFeedback && (
            <div className="mt-4 space-y-4">
              {/* {activity.documents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Documents</h4>
                  <div className="flex flex-wrap gap-2">
                    {activity.documents.map(doc => (
                      <a
                        key={doc.id}
                        href={doc.url}
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm text-gray-700 bg-gray-100 hover:bg-gray-200"
                      >
                        <DocumentIcon className="w-4 h-4 mr-2" />
                        {doc.name}
                      </a>
                    ))}
                  </div>
                </div>
              )} */}
              
              {(activity.feedback && activity.feedback.length > 0) && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Feedback</h4>
                  <div className="bg-gray-50 rounded-md p-3">
                    <p className="text-sm text-gray-600">{activity.feedback}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          {
            // TODO: This will be for the DRAFT step
            // activity?.status === 'submitted' &&
            // <button
            //   onClick={() => handleEdit(activity)}
            //   className="bg-primary-50 text-primary-600 border-primary-200"
            // >
            //   Edit
            // </button>
          }
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-light`}>
            {activity.status && (() => {
              const Icon = getStatusIcon(activity.status);
              return <Icon className="w-4 h-4 mr-1 text-primary-500" />;
            })()}
            {getStatus(activity?.status)}
          </span>
        </div>
      </div>
    </div>
  );
};
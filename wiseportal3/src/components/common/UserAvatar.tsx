import { UserIcon } from '@heroicons/react/16/solid';
import React from 'react';

interface UserAvatarProps {
  givenName?: string;
  familyName?: string;
  size?: number; // Diameter in pixels
  useInitials?: boolean
}

const getInitials = (givenName?: string, familyName?: string) => {
  if (!givenName && ! familyName) return '';
  const initials = (givenName ? givenName[0].toUpperCase() : '') + (familyName ? familyName[0].toUpperCase() : '');

  return initials;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ givenName, familyName, size=40, useInitials=true }) => {
  const initials = getInitials(givenName, familyName);

  return (
    <div
      className="flex items-center justify-center bg-gray-500 text-white font-semibold rounded-full shadow"
      style={{ width: size, height: size, fontSize: size / 2 }}
    >
      {
        useInitials && initials
      }
      { (!useInitials || !initials) &&       
        <UserIcon />
      }
    </div>
  );
};

export default UserAvatar;

import React from 'react';

interface LogoHeadProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LogoHead: React.FC<LogoHeadProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: { height: 60, width: 60 },
    md: { height: 80, width: 80 },
    lg: { height: 120, width: 120 },
    xl: { height: 160, width: 160 },
  };

  const { height, width } = sizes[size];

  return (
    <img 
      src="/thriver-head.svg"
      alt="ThriverHealth.Ai"
      height={height}
      width={width}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default LogoHead;



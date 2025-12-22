import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizes = {
    sm: { height: 45, width: 180 },
    md: { height: 60, width: 240 },
    lg: { height: 80, width: 320 },
    xl: { height: 120, width: 480 },
  };

  const { height, width } = sizes[size];

  return (
    <img 
      src="/thriver-logo.svg"
      alt="ThriverHealth.Ai"
      height={height}
      width={width}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default Logo;


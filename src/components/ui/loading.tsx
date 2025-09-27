import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-primary/20 border-t-primary',
        sizeClasses[size]
      )} />
    </div>
  );
};

export const LoadingSpinner: React.FC<LoadingProps> = ({ size = 'md', className }) => {
  return (
    <div className={cn('flex items-center justify-center p-8', className)}>
      <div className="glass-card p-6 text-center">
        <Loading size={size} />
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

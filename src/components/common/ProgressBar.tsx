import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  showText?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showText = true,
  className = '',
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {showText && (
        <div className="flex justify-between items-center text-xs text-muted-foreground font-medium">
          <span>{percentage}% Completed</span>
          <span>{current} of {total} steps</span>
        </div>
      )}
      <div className="h-2 w-full bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

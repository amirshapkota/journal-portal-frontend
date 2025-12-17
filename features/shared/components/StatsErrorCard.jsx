import { Info } from 'lucide-react';
import React from 'react';

/**
 * StatsErrorCard - Full width error card for stats sections
 * @param {object} props
 * @param {string} [props.title] - Error title
 * @param {string} [props.message] - Error message
 * @param {React.ReactNode} [props.icon] - Optional icon (defaults to alert icon)
 * @param {string} [props.className] - Additional className
 */
export default function StatsErrorCard({
  title = 'Error loading statistics',
  message = 'An unexpected error occurred while loading stats.',
  icon,
  className = '',
}) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg py-5 px-4 gap-2 ${className}`}
      role="alert"
    >
      <div className="flex items-center gap-2 text-red-600">
        {icon || <Info />}
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <div className="text-sm text-red-500 text-center max-w-xl">{message}</div>
    </div>
  );
}

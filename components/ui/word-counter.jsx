'use client';

import { useMemo } from 'react';
import { countWords, validateWordCount, getPercentageUsed } from '@/lib/wordCounter';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';

/**
 * WordCounter component that displays word count with validation
 *
 * @param {Object} props
 * @param {string} props.text - Text to count words in
 * @param {number} props.limit - Maximum word limit (0 = no limit)
 * @param {boolean} props.showProgress - Whether to show progress bar
 * @param {string} props.className - Additional CSS classes
 */
export function WordCounter({ text, limit = 0, showProgress = false, className = '' }) {
  const count = useMemo(() => countWords(text), [text]);
  const validation = useMemo(() => validateWordCount(count, limit), [count, limit]);
  const percentage = useMemo(() => getPercentageUsed(count, limit), [count, limit]);

  if (limit === 0) {
    return (
      <div className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
        <span>{count} words</span>
      </div>
    );
  }

  const getStatusColor = () => {
    switch (validation.status) {
      case 'error':
        return 'text-destructive';
      case 'warning':
        return 'text-yellow-600';
      case 'success':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = () => {
    switch (validation.status) {
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getProgressColor = () => {
    if (percentage > 100) return 'bg-destructive';
    if (percentage >= 90) return 'bg-yellow-500';
    return 'bg-primary';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-2 text-sm ${getStatusColor()}`}>
          {getStatusIcon()}
          <span>
            {count} / {limit} words
          </span>
        </div>
        {validation.message && (
          <Badge
            variant={
              validation.status === 'error'
                ? 'destructive'
                : validation.status === 'warning'
                  ? 'outline'
                  : 'secondary'
            }
          >
            {validation.message}
          </Badge>
        )}
      </div>

      {showProgress && limit > 0 && (
        <Progress
          value={Math.min(percentage, 100)}
          className="h-2"
          indicatorClassName={getProgressColor()}
        />
      )}
    </div>
  );
}

/**
 * Inline word counter that shows minimal info
 */
export function InlineWordCounter({ text, limit = 0, className = '' }) {
  const count = useMemo(() => countWords(text), [text]);
  const validation = useMemo(() => validateWordCount(count, limit), [count, limit]);

  if (limit === 0) {
    return <span className={`text-xs text-muted-foreground ${className}`}>{count} words</span>;
  }

  const getTextColor = () => {
    if (!validation.isValid) return 'text-destructive';
    if (validation.status === 'warning') return 'text-yellow-600';
    return 'text-muted-foreground';
  };

  return (
    <span className={`text-xs ${getTextColor()} ${className}`}>
      {count} / {limit} words
      {!validation.isValid && ' (exceeds limit)'}
    </span>
  );
}

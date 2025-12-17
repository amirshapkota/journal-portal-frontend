import { Badge } from '@/components/ui/badge';

/**
 * DecisionBadge - Reusable badge for displaying decision types with color config
 * @param {Object} props
 * @param {string} props.decisionType - Decision type key (ACCEPT, REJECT, MINOR_REVISION, MAJOR_REVISION)
 * @param {Object} props.config - Decision config object (maps decision type to {bg, text, label})
 * @param {string} [props.displayLabel] - Optional custom label to override config label
 * @param {string} [props.className] - Additional className for Badge
 */
export default function DecisionBadge({ decisionType, config, displayLabel, className = '' }) {
  const typeConfig = config?.[decisionType] || config?.ACCEPT || {};
  return (
    <Badge className={`${typeConfig.bg || ''} ${typeConfig.text || ''} border-0 ${className}`}>
      {displayLabel || typeConfig.label || decisionType}
    </Badge>
  );
}

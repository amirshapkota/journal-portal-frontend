/**
 * Utility functions for word counting and validation
 */

/**
 * Count words in text, stripping HTML tags if present
 * @param {string} text - Text to count words in
 * @returns {number} Number of words
 */
export function countWords(text) {
  if (!text) return 0;
  
  // Remove HTML tags
  const strippedText = text.replace(/<[^>]+>/g, '');
  
  // Remove extra whitespace and count words
  const words = strippedText.trim().split(/\s+/);
  
  // Filter out empty strings
  return words.filter(word => word.length > 0).length;
}

/**
 * Check if word count exceeds limit
 * @param {number} count - Current word count
 * @param {number} limit - Maximum allowed (0 = no limit)
 * @returns {boolean} True if over limit
 */
export function isOverLimit(count, limit) {
  if (limit === 0) return false;
  return count > limit;
}

/**
 * Check if word count is approaching limit (within 10%)
 * @param {number} count - Current word count
 * @param {number} limit - Maximum allowed (0 = no limit)
 * @returns {boolean} True if approaching limit
 */
export function isApproachingLimit(count, limit) {
  if (limit === 0) return false;
  return count >= (limit * 0.9) && count <= limit;
}

/**
 * Get percentage of limit used
 * @param {number} count - Current word count
 * @param {number} limit - Maximum allowed (0 = no limit)
 * @returns {number} Percentage (0-100+)
 */
export function getPercentageUsed(count, limit) {
  if (limit === 0) return 0;
  return Math.round((count / limit) * 100);
}

/**
 * Validate word count against limit
 * @param {number} count - Current word count
 * @param {number} limit - Maximum allowed (0 = no limit)
 * @returns {object} Validation result with status and message
 */
export function validateWordCount(count, limit) {
  if (limit === 0) {
    return {
      isValid: true,
      status: 'none',
      message: '',
    };
  }
  
  if (count > limit) {
    return {
      isValid: false,
      status: 'error',
      message: `Exceeds limit by ${count - limit} words`,
    };
  }
  
  if (count >= (limit * 0.9)) {
    return {
      isValid: true,
      status: 'warning',
      message: `${limit - count} words remaining`,
    };
  }
  
  return {
    isValid: true,
    status: 'success',
    message: `${limit - count} words remaining`,
  };
}

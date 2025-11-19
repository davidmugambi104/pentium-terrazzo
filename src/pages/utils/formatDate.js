/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options
  };

  return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
};

/**
 * Format date for structured data (ISO 8601)
 * @param {string|Date} date - Date to format
 * @returns {string} ISO 8601 formatted date string
 */
export const formatDateISO = (date) => {
  return new Date(date).toISOString().split('T')[0];
};
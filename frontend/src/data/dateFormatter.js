// utils/dateFormatter.js
export const formatDateTime = (isoDateString) => {
  if (!isoDateString) return '';
  try {
    return new Date(isoDateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'UTC',
    });
  } catch (e) {
    console.error('Invalid date:', isoDateString);
    return isoDateString;
  }
};

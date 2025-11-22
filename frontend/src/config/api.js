// API Configuration
// Centralized API base URL configuration for the frontend

const API_CONFIG = {
  // Base URL for API requests
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000',
  
  // API endpoints
  ENDPOINTS: {
    // Core endpoints
    NAVIGATION: '/api/navigation/',
    PAGES: '/api/pages/',
    SEARCH: '/api/search/',
    CHAT: '/api/chat/',
    VISITORS: '/api/visitors/',
    
    // Content endpoints
    CAREERS: '/api/careers/',
    TENDERS: '/api/tenders/',
    NEWS: '/api/news/',
    EVENTS: '/api/events/',
    MEDIA: '/api/media/',
    
    // Documents
    DOCUMENTS: '/api/documents/',
    GOVERNMENT_ORDERS: '/api/government-orders/',
    MPR: '/api/mpr/',
    
    // Gallery
    ALBUMS: '/api/albums/',
    VIDEOS: '/api/videos/',
    
    // Projects
    ONGOING_PROJECTS: '/api/ongoing-projects/',
    COMPLETED_PROJECTS: '/api/completed-projects/',
    
    // Organization
    BOARD_MEMBERS: '/api/board-members/',
    CEOS: '/api/ceos/',
    STAFF: '/api/staff/',
    OFFICIALS: '/api/officials/',
    CONTACT_INFO: '/api/contact/',
    
    // Forms
    CONTACT_MESSAGES: '/api/contact-messages/',
    COMPLAINTS: '/api/complaints/',
    POLL_FEEDBACK: '/api/api/poll-feedback/',
    
    // Other
    INTERNSHIPS: '/api/internships/',
    CONCLAVE_SPEAKERS: '/api/conclave-speakers/',
    CONCLAVE_RECORDINGS: '/api/conclave-recordings/',
    ANNIVERSARY_IMAGES: '/api/anniversary-images/',
    INAUGURATION_IMAGES: '/api/inauguration-images/',
  },
  
  // Helper function to get full URL
  getUrl: (endpoint) => {
    const base = API_CONFIG.BASE_URL.replace(/\/+$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
  },
  
  // Helper function to get media URL
  getMediaUrl: (mediaPath) => {
    if (!mediaPath) return null;
    if (mediaPath.startsWith('http')) return mediaPath;
    const base = API_CONFIG.BASE_URL.replace(/\/+$/, '');
    return `${base}${mediaPath}`;
  },
};

export default API_CONFIG;


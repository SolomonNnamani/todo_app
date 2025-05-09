// src/utils/apiFetch.js
const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("Base URL from env:", baseUrl);

export const apiFetch = (path, options = {}) => {
  // Make sure headers exist
  options.headers = options.headers || {};
  
  // Add standard headers
  options.headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  // Include credentials (cookies) if needed
  options.credentials = 'include';
  
  // Log request details for debugging
  console.log(`Making request to: ${baseUrl}${path}`);
  
  return fetch(`${baseUrl}${path}`, options);
};
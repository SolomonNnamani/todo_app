const baseUrl = import.meta.env.VITE_API_BASE_URL;
console.log("Base URL from env:", baseUrl);

export const apiFetch = (path, options = {}) => {
  return fetch(`${baseUrl}${path}`, options);
};

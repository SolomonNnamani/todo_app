const baseUrl = import.meta.env.VITE_API_BASE_URL;
let sessionExpired = false; // flag to prevent multiple alerts
export const fetchWithAuth = async (path, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(`${baseUrl}${path}`, { ...options, headers });

    //Handle unauthorized or expired token
    if ((response.status === 401 || response.status === 403) && !sessionExpired) {
      sessionExpired = true
      alert("Session timed out. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return null;
    }
    return response
  } catch (err) {
    console.log("Network error:", err);
    return null;
  }
};

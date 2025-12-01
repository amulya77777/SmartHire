// Get API base URL from environment variable or use default
const API_PORT = import.meta.env.VITE_API_PORT || 3000;
const API_BASE_URL = import.meta.env.VITE_API_URL ;

export const USER_API_END_POINT = `${API_BASE_URL}/api/user`;
export const JOB_API_END_POINT = `${API_BASE_URL}/api/job`;
export const APPLICATION_API_END_POINT = `${API_BASE_URL}/api/application`;
export const COMPANY_API_END_POINT = `${API_BASE_URL}/api/company`;

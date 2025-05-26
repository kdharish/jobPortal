import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Get all jobs
export const getAllJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/jobs`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create a new job
export const createJob = async (jobData) => {
  try {
    const response = await axios.post(`${API_URL}/jobs`, jobData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a job
export const deleteJob = async (jobId) => {
  try {
    const response = await axios.delete(`${API_URL}/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Apply to a job
export const applyToJob = async (jobId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/jobs/${jobId}/apply`, { userId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 
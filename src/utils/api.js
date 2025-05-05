import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Data Collection Services
export const dataCollectionService = {
  getAllData: async (page = 1, limit = 10) => {
    const response = await api.get(`/dataset/list?page=${page}&limit=${limit}`);
    return response.data;
  },

  getDataById: async (id) => {
    const response = await api.get(`/dataset/${id}`);
    return response.data;
  },

  createDataManual: async (data) => {
    const response = await api.post('/dataset/manual', data);
    return response.data;
  },

  uploadCSV: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/dataset/csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteData: async (id) => {
    const response = await api.delete(`/dataset/${id}`);
    return response.data;
  },

  deleteAllData: async () => {
    const response = await api.delete('/dataset/delete-all');
    return response.data;
  },
};

// Processing Services
export const processingService = {
  preprocessData: async (dataId) => {
    const response = await api.post(`/processing/preprocess/${dataId}`);
    return response.data;
  },

  processData: async (dataId) => {
    const response = await api.post(`/processing/process/${dataId}`);
    return response.data;
  },

  getProcessingStatus: async (dataId) => {
    const response = await api.get(`/processing/status/${dataId}`);
    return response.data;
  },
};

// Validation Services
export const validationService = {
  validateData: async (data) => {
    const response = await api.post('/validation/validate', data);
    return response.data;
  },
};

// Preprocessing Services
export const preprocessingService = {
  preprocessData: async (data) => {
    const response = await api.post('/preprocessing/preprocess', data);
    return response.data;
  },
};

export default api; 
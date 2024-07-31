import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost:8084/api/conges'; // Update with your backend URL
const accessToken = localStorage.getItem("accessToken")
const headers = {
    headers: { Authorization: "Bearer " + accessToken }  
  }
 
const congeService = {
  getAllConges: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`, headers);
      return response.data;
    } catch (error) {
      congeService.handleError(error);
      throw error;
    }
  },

  getCongeById: async (id:any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`, headers);
      return response.data;
    } catch (error) {
      congeService.handleError(error);
      throw error;
    }
  },

  addConge: async (conge:any ) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, conge, headers);
      return response.data;
    } catch (error) {
      congeService.handleError(error);
      throw error;
    }
  },

  updateConge: async (id:any, conge:any) => {
    try {
      const response = await axios.patch(`${API_BASE_URL}/${id}`, conge, headers);
      return response.data;
    } catch (error) {
      congeService.handleError(error);
      throw error;
    }
  },

  deleteConge: async (id:any) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`, headers);
      return response.data;
    } catch (error) {
      congeService.handleError(error);
      throw error;
    }
  },

  accepterConge: async (id:any) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/accepter/${id}`, null,  headers);
      return response.data;
    } catch (error) {
      congeService.handleError(error);
      throw error;
    }
  },

  refuserConge: async (id:any) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/refuser/${id}`, null, headers);
      return response.data;
    } catch (error) {
      congeService.handleError(error);
      throw error;
    }
  },

  getCongesByEtatConge: async (etatConge:any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/etat/${etatConge}`, headers);
      return response.data;
    } catch (error) {
      congeService.handleError(error);
      throw error;
    }
  },

  getCongesByNatureConge: async (natureconge:any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/nature/${natureconge}`, headers);
      return response.data;
    } catch (error) {
      congeService.handleError(error);
      throw error;
    }
  },

  getCongeByUserId: async (userId:any) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`, headers);
      return response.data;
    } catch (error) {
      congeService.handleError(error);
      throw error;
    }
  },

  handleError: (error:any) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.response) {
        console.error('Server error:', axiosError.response.data);
        // Handle error accordingly (e.g., display a toast message)
      } else if (axiosError.request) {
        console.error('No response from server:', axiosError.request);
        // Handle error accordingly
      } else {
        console.error('Request error:', axiosError.message);
        // Handle error accordingly
      }
    } else {
      console.error('Non-Axios error:', error);
      // Handle error accordingly
    }
  }
};

export default congeService;

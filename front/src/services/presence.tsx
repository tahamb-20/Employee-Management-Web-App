import { Presence } from '@/types';
import axios, { AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8084/api';
const accessToken = localStorage.getItem("accessToken")
const headers = {
    headers: { Authorization: "Bearer " + accessToken }  
  }
 
const handleError = (error: any): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
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
};

const PresenceService = {
  getAllPresence: async (): Promise<Presence[]> => {
    try {
      const response: AxiosResponse<Presence[]> = await axios.get(`${API_BASE_URL}/presences`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  removePresence: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/presences/${id}`, headers);
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  modifyPresence: async (id: string, presence: Presence): Promise<Presence> => {
    try {
      const response: AxiosResponse<Presence> = await axios.patch(`${API_BASE_URL}/presences/${id}`, presence, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  findPresenceByEtat: async (etat: string): Promise<Presence[]> => {
    try {
      const response: AxiosResponse<Presence[]> = await axios.get(`${API_BASE_URL}/etatpresence/${etat}`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  findPresenceByNature: async (nature: string): Promise<Presence[]> => {
    try {
      const response: AxiosResponse<Presence[]> = await axios.get(`${API_BASE_URL}/Nature/${nature}`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getPresenceByUserId: async (userId: number): Promise<Presence[]> => {
    try {
      const response: AxiosResponse<Presence[]> = await axios.get(`${API_BASE_URL}/presences/${userId}`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  addPresenceAndAssignToEmployee: async (presence: Presence ): Promise<Presence> => {
    try {
      const response: AxiosResponse<Presence> = await axios.post(`${API_BASE_URL}/presences`, presence, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  countPresenceAndAbsenceByDay: async (): Promise<Object[]> => {
    try {
      const response: AxiosResponse<Object[]> = await axios.get(`${API_BASE_URL}/count`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

export default PresenceService;

import { Tache } from '@/types';
import axios, { AxiosError, AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:8084/tache';

 
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
const accessToken = localStorage.getItem("accessToken")
const headers = {
    headers: { Authorization: "Bearer " + accessToken }  
  }
const TacheService = {
  getAllTaches: async (): Promise<Tache[]> => {
    try {
      const response: AxiosResponse<Tache[]> = await axios.get(`${API_BASE_URL}/retrieve-all-tache`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  removeTache: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/remove-tache/${id}`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  modifyTache: async (id: number, tache: Tache): Promise<Tache> => {
    try {
      const response: AxiosResponse<Tache> = await axios.put(`${API_BASE_URL}/modifytache/${id}`, tache, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  updateEtatTache: async (id: number, nouvelEtat: string): Promise<Tache> => {
    try {
      const accessToken = localStorage.getItem("accessToken"); // Retrieve access token
      const headers = { Authorization: "Bearer " + accessToken }; // Define headers here
  
      const response: AxiosResponse<Tache> = await axios.put(`${API_BASE_URL}/${id}/etat?etat=${nouvelEtat}`, null, { headers });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  findTacheByEtat: async (etat: string): Promise<Tache[]> => {
    try {
      const response: AxiosResponse<Tache[]> = await axios.get(`${API_BASE_URL}/etattache/${etat}`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  findTacheByNature: async (nature: string): Promise<Tache[]> => {
    try {
      const response: AxiosResponse<Tache[]> = await axios.get(`${API_BASE_URL}/Nature/${nature}`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getTachesByUserId: async (userId: number): Promise<Tache[]> => {
    try {
      const response: AxiosResponse<Tache[]> = await axios.get(`${API_BASE_URL}/utilisateur/${userId}`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  addTacheAndAssignToEmployee: async (tache: any, idUtilisateur: number): Promise<Tache> => {
    try {
      const response: AxiosResponse<Tache> = await axios.post(`${API_BASE_URL}/affecter/${idUtilisateur}`, tache, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  getNombreDeTaches: async (): Promise<number> => {
    try {
      const response: AxiosResponse<number> = await axios.get(`${API_BASE_URL}/nombre`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  countNombreDeTachesEnAttente: async (): Promise<number> => {
    try {
      const response: AxiosResponse<number> = await axios.get(`${API_BASE_URL}/en-attente/count`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  countNombreDeTachesTermine: async (): Promise<number> => {
    try {
      const response: AxiosResponse<number> = await axios.get(`${API_BASE_URL}/Termine/count`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  countNombreDeTachesParUtilisateur: async (): Promise<Object[]> => {
    try {
      const response: AxiosResponse<Object[]> = await axios.get(`${API_BASE_URL}/nombre-taches-utilisateur`, headers);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

export default TacheService;

import { RQUtilisateur, Utilisateur } from "@/types";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";

const BASE_URL = 'http://localhost:8084/api/';
const accessToken = localStorage.getItem("accessToken")
const headers = {
    headers: { Authorization: "Bearer " + accessToken }  
  }
const userService = {
    getUtilisateur: async (): Promise<Utilisateur> => {
        try {
          
            const response: AxiosResponse = await axios.get(BASE_URL + 'users', headers );
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },
    getUtilisateurById: async (id: any): Promise<Utilisateur> => {
        try {
          
            const response: AxiosResponse = await axios.get(BASE_URL + 'users/'+id, headers );
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },

    addUser: async (user: RQUtilisateur): Promise<Utilisateur> => {
        try {
            const response: AxiosResponse = await axios.post(BASE_URL + 'users', user, headers);
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },

    updateUser: async (id: any, user: any): Promise<Utilisateur> => {
        try {
            const response: AxiosResponse = await axios.put(`${BASE_URL}users/${id}`, user, headers);
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    },

    deleteUser: async (id: any): Promise<Utilisateur> => {
        try {
            const response: AxiosResponse = await axios.delete(BASE_URL + 'users/' + id, headers);
            return response.data;
        } catch (error) {
            handleError(error);
            throw error;
        }
    }
};

function handleError(error: any): void {
    if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response) {
            console.error('Server error:', axiosError.response.data);
            toast.error("Something went wrong");
        } else if (axiosError.request) {
            console.error('No response from server:', axiosError.request);
            toast.error("Something went wrong");
        } else {
            console.error('Request error:', axiosError.message);
            toast.error("Something went wrong");
        }
    } else {
        console.error('Non-Axios error:', error);
        toast.error("Something went wrong");
    }
}

export default userService;

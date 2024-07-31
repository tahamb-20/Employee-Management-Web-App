import axios, { AxiosResponse, AxiosError } from "axios";
import { Societe } from "@/types";
import toast from "react-hot-toast";

const BASE_URL = 'http://localhost:8084/Societe/';
const accessToken = localStorage.getItem("accessToken")
const headers = {
    headers: { Authorization: "Bearer " + accessToken }  
  }
 
export default async function getSocietes(): Promise<Societe> {
 
    try {
        const response: AxiosResponse = await axios.get(BASE_URL + 'retrieve-all-societe', headers);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}
 
export async function addSociete(societe: Societe): Promise<Societe> {
    try {
        const response: AxiosResponse = await axios.post(BASE_URL + 'add', societe, headers);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}
export async function UpdateSociete(id: any, societe: any): Promise<Societe> {
    try {
        const response: AxiosResponse = await axios.put(`${BASE_URL}modifysociete/${id}`, societe, headers);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}
export async function deleteSociete(id:any): Promise<Societe> {
    try {
        const response: AxiosResponse = await axios.delete(BASE_URL + 'remove-societe/'+id, headers);
        return response.data;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

 
function handleError(error: any): void {

    if (axios.isAxiosError(error)) {
        // Axios error, handle it accordingly
        const axiosError: AxiosError = error;
        if (axiosError.response) {
            // The request was made and the server responded with a status code
            console.error('Server error:', axiosError.response.data);
            toast.error("Something went wrong");

        } else if (axiosError.request) {
            // The request was made but no response was received
            console.error('No response from server:', axiosError.request);
            toast.error("Something went wrong");

        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Request error:', axiosError.message);
            toast.error("Something went wrong");

        }
    } else {
        // Non-Axios error, handle it accordingly
        console.error('Non-Axios error:', error);
        toast.error("Something went wrong");

    }
}

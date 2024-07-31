import axios, { AxiosError, AxiosResponse } from 'axios';
import { UserInfoResponse, LoginRequest, SignupRequest } from '@/types'; // Adjust import paths as necessary
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8084/api';

const handleError = (error: any): void => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Server error:', axiosError.response.data);
      toast.error('Server error:'+ axiosError.response.data)
    } else if (axiosError.request) {
      console.error('No response from server:', axiosError.request);
      toast.error('No response from server:'+ axiosError.request)
    } else {
      console.error('Request error:', axiosError.message);
      toast.error('Request error:'+ axiosError.message)
    }
  } else {
    console.error('Non-Axios error:', error);
    toast.error('Non-Axios error : '+ error)
  }
};

const AuthService = {
  signin: async (loginRequest: LoginRequest): Promise<{ userInfo: UserInfoResponse }> => {
    try {
         const response = await axios.post(`${API_BASE_URL}/login`, loginRequest );
        if (response.status === 200) {
          localStorage.setItem('accessToken',  response.data.accessToken )
             
            localStorage.setItem('role',  response.data.role)
            localStorage.setItem('userInfo', JSON.stringify(response.data)  )
        
            const userInfo = response.data;
             return { userInfo };
        } else {
            console.error("Sign-in request failed with status code:", response.status);
            toast.error("Sign-in request failed with status code:" + response.status)
        }
    } catch (error) {
        console.error("Error occurred during sign-in request:", error);
        toast.error("Error occurred during sign-in request:" + error)
      }
  },

  signup: async (signupRequest: SignupRequest): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/register`, signupRequest);
    } catch (error) {
      handleError(error);
      throw error;
    }
  },

  signout: async (): Promise<void> => {
    try {
      await axios.post(`${API_BASE_URL}/signout`);
    } catch (error) {
      handleError(error);
      throw error;
    }
  },
};

export default AuthService;

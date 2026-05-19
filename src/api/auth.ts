import type { AxiosResponse } from 'axios';
import axios from 'axios';

const API_URL = import.meta.env.VITE_DEV_URL;

export const loginUser = async (): Promise<AxiosResponse> => {
    try {
        const res: AxiosResponse = await axios.get<AxiosResponse>(
            `${API_URL}/auth/tsu/start?return_to=/`,
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const fetchSession = async (): Promise<AxiosResponse> => {
    try {
        const res: AxiosResponse = await axios.get<AxiosResponse>(`${API_URL}/auth/session`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async (): Promise<AxiosResponse> => {
    try {
        const res: AxiosResponse = await axios.post<AxiosResponse>(`${API_URL}/auth/logout`, {});
        return res.data;
    } catch (error) {
        throw error;
    }
};

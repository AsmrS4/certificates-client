import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const loginUser = (): void => {
    window.location.href = `/api/auth/tsu/start?return_to=/`;
};

export const fetchSession = async (): Promise<AxiosResponse> => {
    try {
        const res: AxiosResponse = await axios.get<AxiosResponse>(`/api/auth/session`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async (): Promise<AxiosResponse> => {
    try {
        const res: AxiosResponse = await axios.post<AxiosResponse>(`/api/auth/logout`, {});
        return res.data;
    } catch (error) {
        throw error;
    }
};

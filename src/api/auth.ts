import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const loginUser = (): void => {
    window.location.href = `/api/auth/tsu/start?return_to=${encodeURIComponent(location.pathname + location.search)}`;
};

export const exchangeSession = async () => {
    const uri = window.location.href;
    try {
        const res = await axios.get(uri, {});
        console.log(res);
    } catch (error) {
        throw error;
    }
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

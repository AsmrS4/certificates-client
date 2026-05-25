import type { AuthResponse } from '@/models/auth';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const loginUser = (): void => {
    window.location.href = `/api/auth/tsu/start?return_to=${encodeURIComponent(location.pathname + location.search)}`;
};

export const fetchSession = async (): Promise<AuthResponse> => {
    try {
        const res: AxiosResponse<AuthResponse> = await axios.get(`/api/auth/session`, {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async (): Promise<AxiosResponse> => {
    try {
        const res: AxiosResponse = await axios.post<AxiosResponse>(
            `/api/auth/logout`,
            {},
            {
                withCredentials: true,
            },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

import type { AuthResponse } from '@/models/auth';
import { routes } from '@/router/routes';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const BASENAME = '/plugins/certificates_plugin/app/';

export const loginUser = (): void => {
    const returnTo = `${BASENAME}${routes.certificates.home}`;
    window.location.href = `/api/auth/tsu/start?return_to=${encodeURIComponent(returnTo)}`;
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

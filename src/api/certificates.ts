import type { CertificateOrder, Certificates, Params } from '@/models/certificates';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

const BASE_URI = '/api/triggers/http/certificates_plugin/api/certificates';

export const fetchOrderedCertificates = async (params: Params): Promise<Certificates> => {
    try {
        const res: AxiosResponse<Certificates> = await axios.get(`${BASE_URI}/all`, {
            withCredentials: true,
            params: { ...params },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const fetchOrderedCertificateDetails = async (
    orderId: number,
): Promise<CertificateOrder> => {
    try {
        const res: AxiosResponse<CertificateOrder> = await axios.get(
            `${BASE_URI}/details?id=${orderId}`,
            {
                withCredentials: true,
            },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const rejectOrderedCertificate = async (
    orderId: number,
    reason: string,
): Promise<boolean> => {
    try {
        const res: AxiosResponse<boolean> = await axios.delete(`${BASE_URI}/reject?id=${orderId}`, {
            withCredentials: true,
            data: { reason: reason },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const processOrderedCertificate = async (orderId: number): Promise<boolean> => {
    try {
        const res: AxiosResponse<boolean> = await axios.post(
            `${BASE_URI}/process?id=${orderId}`,
            {},
            { withCredentials: true },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const finishProcessingPaperOrder = async (orderId: number): Promise<boolean> => {
    try {
        const res: AxiosResponse<boolean> = await axios.post(
            `${BASE_URI}/finish?id=${orderId}`,
            {},
            { withCredentials: true },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

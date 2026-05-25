import type { CertificateOrder, Certificates, Params } from '@/models/certificates';
import type { AxiosResponse } from 'axios';
import axios from 'axios';

export const fetchOrderedCertificates = async (params: Params): Promise<Certificates> => {
    try {
        const res: AxiosResponse<Certificates> = await axios.get(
            `/api/triggers/http/certificates/api/certificates/all`,
            {
                withCredentials: true,
                params: { ...params },
            },
        );
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
            `/api/triggers/http/certificates/api/certificates?id=${orderId}`,
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
        const res: AxiosResponse<boolean> = await axios.delete(
            `/api/triggers/http/certificates/api/certificates/reject?id=${orderId}`,
            { withCredentials: true, data: { reason: reason } },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const processOrderedCertificate = async (orderId: number): Promise<boolean> => {
    try {
        const res: AxiosResponse<boolean> = await axios.post(
            `/api/triggers/http/certificates/api/certificates/process?id=${orderId}`,
            {},
            { withCredentials: true },
        );
        return res.data;
    } catch (error) {
        throw error;
    }
};

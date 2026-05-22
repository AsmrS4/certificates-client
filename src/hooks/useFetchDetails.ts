import { fetchOrderedCertificateDetails } from '@/api/certificates';
import type { CertificateOrder } from '@/models/certificates';
import { useEffect, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';

export const useFetchDetails = (orderId: string | undefined) => {
    const [order, setOrder] = useState<CertificateOrder | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const { errorMessage, handleError, clearError } = useErrorHandler();

    const fetchDetails = async () => {
        clearError();
        setLoading(true);
        try {
            const id = parseInt(orderId || '1');
            const res: CertificateOrder = await fetchOrderedCertificateDetails(id);
            setOrder({ ...res });
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleProcess = async (): Promise<boolean> => {
        return true;
    };

    const handleReject = async (): Promise<boolean> => {
        return true;
    };

    useEffect(() => {
        let isMounted = true;
        const init = async (): Promise<void> => {
            if (orderId && isMounted) {
                await fetchDetails();
            }
        };
        init();
        return () => {
            isMounted = false;
        };
    }, [orderId]);

    return { order, handleProcess, handleReject, isLoading, errorMessage };
};

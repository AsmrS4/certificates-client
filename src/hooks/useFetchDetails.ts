import { fetchOrderedCertificateDetails } from '@/api/certificates';
import type { CertificateOrder } from '@/models/certificates';
import { useEffect, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { useNotification } from './useNotification';

export const useFetchDetails = (orderId: string | undefined) => {
    const [order, setOrder] = useState<CertificateOrder | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const { errorMessage, handleError, clearError } = useErrorHandler();
    const { handleErrorNotification } = useNotification();

    const fetchDetails = async (): Promise<void> => {
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

    const handleChangeOrderStatus = (status: string): void => {
        setOrder((prev) => ({ ...prev!, application_status: status }));
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

    useEffect(() => {
        if (errorMessage) handleErrorNotification(errorMessage);
    }, [errorMessage]);

    return { order, isLoading, errorMessage, handleChangeOrderStatus };
};

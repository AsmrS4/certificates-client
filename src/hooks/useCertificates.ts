import type { CertificateOrder, Certificates, Pagination, Params } from '@/models/certificates';
import { useEffect, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { fetchOrderedCertificates } from '@/api/certificates';
import { useNavigate } from 'react-router-dom';

export const useCertificates = () => {
    const [certificates, setCertificates] = useState<CertificateOrder[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ limit: 10, offset: 1, total: 0 });
    const [params, setParams] = useState<Params>({
        limit: 10,
        offset: 1,
        status: '',
        type: '',
        user_id: null,
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const { errorMessage, handleError, clearError } = useErrorHandler();
    const navigate = useNavigate();

    const handleSelectOrder = (id: number): void => {
        navigate(`/certificates/${id}`);
    };
    const updateFilters = (newParams: Partial<Params>) => {
        setParams((prev) => ({ ...prev, ...newParams, offset: 1 }));
    };
    const handleStatus = (status: string) => updateFilters({ status });
    const handleType = (type: string) => updateFilters({ type });
    const handleOffset = (offset: number) => setParams((prev) => ({ ...prev, offset }));
    const initialize = (initialParams: Partial<Params>) => {
        setParams((prev) => ({ ...prev, ...initialParams }));
        setIsInitialized(true);
    };

    const fetchCertificates = async (): Promise<void> => {
        try {
            setLoading(true);
            clearError();
            setCertificates([]);
            const res: Certificates = await fetchOrderedCertificates(params);
            setCertificates(res.data);
            setPagination((prev) => ({ ...prev, ...res.pagination }));
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;
        const init = async (): Promise<void> => {
            if (isMounted) {
                await fetchCertificates();
            }
        };
        if (isInitialized) {
            init();
        }
        return () => {
            isMounted = false;
        };
    }, [params, isInitialized]);

    return {
        certificates,
        pagination,
        isLoading,
        errorMessage,
        handleType,
        handleStatus,
        handleOffset,
        handleSelectOrder,
        initialize,
    };
};

import type { CertificateOrder, Certificates, Pagination, Params } from '@/models/certificates';
import { useEffect, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';
import { useNavigate } from 'react-router-dom';

export const useCertificates = (fetchFn: (params: Params) => Promise<Certificates>) => {
    const [certificates, setCertificates] = useState<CertificateOrder[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ limit: 10, offset: 0, total: 0 });
    const [params, setParams] = useState<Params>({
        limit: 10,
        offset: 0,
        status: '',
        type: '',
        nationality_type: undefined,
        faculty_name: '',
        group_code: '',
        full_name: '',
        user_id: null,
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState(false);
    const { errorMessage, handleError, clearError } = useErrorHandler();
    const [searchName, setSearchName] = useState<string>('');
    const navigate = useNavigate();

    const handleSelectOrder = (id: number): void => {
        navigate(`/certificates/${id}`);
    };

    const updateFilters = (newParams: Partial<Params>) => {
        setParams((prev) => {
            const updated = { ...prev, ...newParams, offset: 0 };
            if (
                prev.offset === 0 &&
                Object.keys(newParams).every(
                    (key) => prev[key as keyof Params] === newParams[key as keyof Params],
                )
            ) {
                return prev;
            }
            return updated;
        });
    };

    const handleStatus = (status: string) => updateFilters({ status });
    const handleType = (type: string) => updateFilters({ type });
    const handleOffset = (offset: number) => setParams((prev) => ({ ...prev, offset }));
    const handleSearchName = (value: string) => {
        setParams((prev) => ({ ...prev, full_name: value, offset: 0 }));
    };
    const handleNationality = (value: string | null) => {
        updateFilters({ nationality_type: value as 'domestic' | 'foreign' | undefined });
    };
    const handleFacultyName = (value: string) => updateFilters({ faculty_name: value });
    const handleGroupCode = (value: string) => updateFilters({ group_code: value });

    const initialize = (initialParams: Partial<Params>) => {
        setParams((prev) => ({ ...prev, ...initialParams }));
        setIsInitialized(true);
    };

    const fetchCertificates = async (): Promise<void> => {
        try {
            setLoading(true);
            clearError();
            setCertificates([]);
            const res: Certificates = await fetchFn(params);
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
            if (isMounted && isInitialized) {
                await fetchCertificates();
            }
        };
        init();
        return () => {
            isMounted = false;
        };
    }, [params, isInitialized, fetchFn]);

    return {
        certificates,
        searchName,
        pagination,
        isLoading,
        errorMessage,
        handleType,
        handleStatus,
        handleOffset,
        handleSearchName,
        handleNationality,
        handleFacultyName,
        handleGroupCode,
        handleSelectOrder,
        setSearchName,
        initialize,
    };
};

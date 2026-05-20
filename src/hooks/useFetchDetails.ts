import type { CertificateOrder } from '@/models/certificates';
import { useEffect, useState } from 'react';

export const useFetchDetails = (orderId: string | undefined) => {
    const [order, setOrder] = useState<CertificateOrder | null>(null);
    const fetchDetails = async () => {
        setOrder({
            id: 123,
            student_id: 10,
            application_status: 'Prepare',
            certificate_type: 'Academic',
            obtain_method: 'Electronic',
            rejection_reason: '',
            created_at: '2026-12-12T00:12:23',
        });
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

    return { order, handleProcess, handleReject };
};

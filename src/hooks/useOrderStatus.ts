import type { CertificateOrder } from '@/models/certificates';
import { useEffect, useState } from 'react';

export const useOrderStatus = (id: string | undefined, order: CertificateOrder | null) => {
    const [currentStepStatus, setStepStatus] = useState<number>(0);
    const handleStepStatus = (): void => {
        if (order && id) {
            if (
                order.application_status === 'Rejected' ||
                order.application_status === 'Cancelled'
            ) {
                return setStepStatus(-1);
            }
            if (order.application_status === 'Pending') return setStepStatus(1);
            if (order.application_status === 'Prepare') return setStepStatus(2);
            if (order.application_status === 'Done') return setStepStatus(3);
        }
        return setStepStatus(0);
    };
    useEffect(() => {
        handleStepStatus();
    }, [id, order?.application_status]);
    return { currentStepStatus, handleStepStatus };
};

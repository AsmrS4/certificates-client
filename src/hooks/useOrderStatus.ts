import type { CertificateOrder } from '@/models/certificates';
import { useEffect, useState } from 'react';
import { useErrorHandler } from './useErrorHandler';
import {
    finishProcessingPaperOrder,
    processOrderedCertificate,
    rejectOrderedCertificate,
} from '@/api/certificates';
import { useNotification } from './useNotification';
import { uploadFile } from '@/api/file';
import type { UploadedFile } from '@/models/file';

export const useOrderStatus = (
    id: string | undefined,
    order: CertificateOrder | null,
    orderCallback: (status: string) => void,
) => {
    const [currentStepStatus, setStepStatus] = useState<number>(0);
    const [isLoading, setLoading] = useState<boolean>(false);
    const { errorMessage, handleError, clearError } = useErrorHandler();
    const { handleErrorNotification, handleSuccessNotification } = useNotification();
    const handleFinishOrder = async (): Promise<void> => {
        clearError();
        try {
            setLoading(true);
            const res: boolean = await finishProcessingPaperOrder(order?.id || 0);
            if (res) orderCallback('Done');
            handleSuccessNotification('Заявка обработана');
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };
    const handleUploadCertificate = async (file: File): Promise<void> => {
        clearError();
        try {
            setLoading(true);
            const res: UploadedFile = await uploadFile({
                pluginId: 'certificates',
                file: file,
                fileType: file.type,
            });
            if (res) orderCallback('Done');
            handleSuccessNotification('Заявка обработана');
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };
    const handleProcessOrder = async (): Promise<void> => {
        clearError();
        try {
            setLoading(true);
            const res: boolean = await processOrderedCertificate(order?.id || 0);
            if (res) orderCallback('Prepare');
            handleSuccessNotification('Заявка принята в обработку');
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };
    const handleRejectOrder = async (message: string): Promise<void> => {
        clearError();
        try {
            setLoading(true);
            const res: boolean = await rejectOrderedCertificate(order?.id || 0, message);
            if (res) orderCallback('Rejected');
            handleSuccessNotification('Заявка успешно отклонена');
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
        }
    };
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
            if (order.application_status === 'Done') return setStepStatus(4);
        }
        return setStepStatus(0);
    };

    useEffect(() => {
        if (errorMessage) handleErrorNotification(errorMessage);
    }, [errorMessage]);
    useEffect(() => {
        handleStepStatus();
    }, [id, order?.application_status]);

    return {
        currentStepStatus,
        errorMessage,
        isLoading,
        handleStepStatus,
        handleProcessOrder,
        handleRejectOrder,
        handleFinishOrder,
        handleUploadCertificate,
    };
};

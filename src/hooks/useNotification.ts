import { notifications } from '@mantine/notifications';

export const useNotification = () => {
    const handleSuccessNotification = (message: string) => {
        notifications.show({
            title: 'Успех',
            color: 'blue',
            message: message,
            autoClose: 2000,
            withCloseButton: true,
        });
    };
    const handleErrorNotification = (message: string) => {
        notifications.show({
            title: 'Ошибка',
            color: 'red',
            message: message,
            autoClose: 2000,
            withCloseButton: true,
        });
    };

    return { handleSuccessNotification, handleErrorNotification };
};

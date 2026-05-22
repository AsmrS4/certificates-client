import dayjs from 'dayjs';

export const formatDate = (isoString: string | undefined): string => {
    if (!isoString) {
        return dayjs(new Date()).format('DD.MM.YYYY HH:mm');
    }
    return dayjs(isoString).format('DD.MM.YYYY HH:mm');
};

type StatusKey = 'Pending' | 'Prepare' | 'Done' | 'Rejected' | string;

interface StatusInfo {
    label: string;
    color: string;
}

export const statusMap: Record<StatusKey, StatusInfo> = {
    Pending: { label: 'Новая', color: 'blue' },
    Prepare: { label: 'В процессе', color: 'yellow' },
    Done: { label: 'Готова', color: 'green' },
    Rejected: { label: 'Отклонена', color: 'red' },
    Cancelled: { label: 'Отозвана', color: 'red' },
};

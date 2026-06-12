import type { CertificateOrder } from '@/models/certificates';
import { Badge, Card, Divider, Group, Text } from '@mantine/core';
import { statusMap } from '@/utils/statusMapper';

interface OrderCardProps extends CertificateOrder {
    onClick: (id: number) => void;
}

export const OrderCard = (props: OrderCardProps) => {
    const status = statusMap[props.application_status];
    return (
        <Card shadow='xs' padding='sm' withBorder orientation='horizontal'>
            <div
                className='flex flex-col w-full px-4 gap-2 hover:cursor-pointer'
                onClick={() => props.onClick(props.id)}
            >
                <div className='w-full flex flex-row items-center justify-between'>
                    <Text fz='lg'>Заказ номер #{props.id}</Text>
                    <Badge color={status?.color} variant='dot' size='lg' radius='xl'>
                        {status?.label}
                    </Badge>
                </div>
                <Divider />
                <Group mt='sm'>
                    <div className='flex flex-row gap-10 w-full'>
                        <div>
                            <Text size='xs' c='dimmed'>
                                {'ФИО студента'}
                            </Text>
                            <Text size='md' className='truncate'>
                                {props?.full_name ? props?.full_name : 'Неизвестный получатель'}
                            </Text>
                        </div>
                    </div>
                </Group>
            </div>
        </Card>
    );
};

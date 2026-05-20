import type { CertificateOrder } from '@/models/certificates';
import { Badge, Card, Divider, Group, Text } from '@mantine/core';
import { statusMap } from '@/utils/statusMapper';
import { typeMap, obtainMap } from '@/utils/enumMapper';

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
                                {'Тип справки'}
                            </Text>
                            <Text size='md'>{typeMap[props.certificate_type]}</Text>
                        </div>
                        <div>
                            <Text size='xs' c='dimmed'>
                                {'Формат'}
                            </Text>
                            <Text size='md'>{obtainMap[props.obtain_method]}</Text>
                        </div>
                    </div>
                </Group>
            </div>
        </Card>
    );
};

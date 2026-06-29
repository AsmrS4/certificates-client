import type { CertificateOrder } from '@/models/certificates';
import { Badge, Card, Divider, Text, SimpleGrid } from '@mantine/core';
import { statusMap } from '@/utils/statusMapper';
import { typeMap, obtainMap } from '@/utils/enumMapper';

interface OrderCardProps extends CertificateOrder {
    onClick: (id: number) => void;
}

export const OrderCard = (props: OrderCardProps) => {
    const status = statusMap[props.status];
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
                <div className='mt-2'>
                    <Text size='xs' c='dimmed'>
                        ФИО студента
                    </Text>
                    <Text size='md' className='truncate'>
                        {props.full_name || 'Неизвестный получатель'}
                    </Text>
                </div>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='sm' className='mt-1'>
                    <div>
                        <Text size='xs' c='dimmed'>
                            Группа
                        </Text>
                        <Text size='md'>{props.group_code || '—'}</Text>
                    </div>
                    <div>
                        <Text size='xs' c='dimmed'>
                            Факультет
                        </Text>
                        <Text size='md' className='truncate'>
                            {props.faculty_name || '—'}
                        </Text>
                    </div>
                </SimpleGrid>
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='sm' className='mt-1'>
                    <div>
                        <Text size='xs' c='dimmed'>
                            Тип справки
                        </Text>
                        <Text size='md'>
                            {typeMap[props.type] || props.type || 'Неизвестный тип'}
                        </Text>
                    </div>
                    <div>
                        <Text size='xs' c='dimmed'>
                            Способ получения
                        </Text>
                        <Text size='md'>
                            {obtainMap[props.obtain_method] || props.obtain_method || '—'}
                        </Text>
                    </div>
                </SimpleGrid>
            </div>
        </Card>
    );
};

import { Badge, Box, Card, Divider, Group, Text } from '@mantine/core';
import React from 'react';

const stats = [
    { value: 'Период обучения', label: 'Тип справки' },
    { value: 'Бумажная', label: 'Формат' },
];

const items = stats.map((stat) => (
    <div key={stat.label}>
        <Text size='xs' c='dimmed'>
            {stat.label}
        </Text>
        <Text size='md'>{stat.value}</Text>
    </div>
));

interface OrderCardProps {
    id: number;
    onClick: (id: number) => void;
}

export const OrderCard = (props: OrderCardProps) => {
    return (
        <Card shadow='xs' padding='sm' withBorder orientation='horizontal'>
            <div
                className='flex flex-col w-full px-4 gap-2 hover:cursor-pointer'
                onClick={() => props.onClick(props.id)}
            >
                <div className='w-full flex flex-row items-center justify-between'>
                    <Text fz='xl'>Заказ номер #12</Text>
                    <Badge color='blue' variant='dot' size='lg' radius='lg'>
                        На рассмотрении
                    </Badge>
                </div>
                <Divider />
                <Group mt='sm'>
                    <div className='flex flex-row gap-10 w-full'>{items}</div>
                </Group>
            </div>
        </Card>
    );
};

import { Badge, Box, Card, Divider, Group, Text } from '@mantine/core';
import React from 'react';

const stats = [
    { value: 'Период обучения', label: 'Тип справки' },
    { value: 'Бумажная', label: 'Формат' },
    { value: '12 мая 2026', label: 'Дата' },
];

const items = stats.map((stat) => (
    <div key={stat.label}>
        <Text size='xs' c='dimmed'>
            {stat.label}
        </Text>
        <Text>{stat.value}</Text>
    </div>
));

export const OrderCard = () => {
    return (
        <Card shadow='xs' padding='sm' withBorder orientation='horizontal'>
            <div className='flex flex-col w-full px-4 gap-2 hover:cursor-pointer'>
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

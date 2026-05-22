import { Card, Divider, Group, Skeleton } from '@mantine/core';

export const OrderCardSkeleton = () => {
    return (
        <Card shadow='xs' padding='sm' withBorder orientation='horizontal'>
            <div className='flex flex-col w-full px-4 gap-2 hover:cursor-pointer'>
                <div className='w-full flex flex-row items-center justify-between gap-12'>
                    <Skeleton height={24} />
                    <Skeleton height={24} />
                </div>
                <Divider />
                <Group mt='sm'>
                    <div className='flex flex-row gap-10 w-full'>
                        <Skeleton height={48} radius='md' />
                    </div>
                </Group>
            </div>
        </Card>
    );
};

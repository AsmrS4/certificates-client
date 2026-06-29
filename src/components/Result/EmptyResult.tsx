import { Box, Button, Card, Text, Title } from '@mantine/core';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';

interface CallbackProps {
    onClick: () => void;
}

export const EmptyResult = ({ onClick }: CallbackProps) => {
    return (
        <div className='w-full px-4'>
            <Card shadow='xs' withBorder w={'100%'} orientation='horizontal'>
                <div className='flex flex-col w-full items-center gap-6 py-12 px-4'>
                    <div className='flex flex-col items-center gap-4'>
                        <Box
                            bg={'#f4f4f4'}
                            style={{
                                padding: 16,
                                borderRadius: 48,
                                width: 90,
                                height: 90,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <MagnifyingGlassIcon size={40} weight='regular' color='gray' />
                        </Box>
                        <Title order={3}>Заказы не найдены</Title>
                    </div>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: 'center',
                            overflowWrap: 'break-word',
                        }}
                    >
                        Нет заказанных справок, подходящих под текущие фильтры. <br />
                        Попробуйте изменить параметры поиска.
                    </Text>
                    <Button onClick={onClick}>Сбросить фильтры</Button>
                </div>
            </Card>
        </div>
    );
};

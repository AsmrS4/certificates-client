import { Box, Button, Card, Text, Title } from '@mantine/core';
import { RocketLaunchIcon } from '@phosphor-icons/react';

interface CallbackProps {
    onClick: () => void;
}

export const NotImplemented = ({ onClick }: CallbackProps) => {
    return (
        <div className='w-full px-8'>
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
                            <RocketLaunchIcon size={40} weight='regular' color='gray' />
                        </Box>
                        <Title order={3}>Сервис в разработке</Title>
                    </div>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: 'center',
                            overflowWrap: 'break-word',
                        }}
                    >
                        Сервис находится на стадии активной разработки. <br />
                        Следите за обновлениями!
                    </Text>
                    <Button onClick={onClick}>Назад</Button>
                </div>
            </Card>
        </div>
    );
};

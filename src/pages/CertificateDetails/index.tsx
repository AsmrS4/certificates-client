import type { CertificateOrder } from '@/models/certificates';
import { Text, Badge, Button, CheckIcon, Divider, FileInput, Group, Paper } from '@mantine/core';
import { XIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const CertificateDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState<CertificateOrder | null>(null);
    const fetchDetails = async () => {
        setOrder({
            id: 123,
            student_id: 10,
            application_status: 'Prepare',
            certificate_type: 'Academic',
            obtain_method: 'Electronic',
            rejection_reason: '',
            created_at: '2026-12-12T00:12:23',
        });
    };
    const handleProcess = async (): Promise<boolean> => {
        return true;
    };
    const handleReject = async (): Promise<boolean> => {
        return true;
    };
    useEffect(() => {
        let isMounted = true;
        const init = async (): Promise<void> => {
            if (id && isMounted) {
                await fetchDetails();
            }
        };
        init();
        return () => {
            isMounted = false;
        };
    }, [id]);
    return (
        <div className='flex flex-col w-full p-8'>
            <Paper shadow='xs' p='xl' withBorder>
                <header className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center gap-8'>
                        <h1 className='font-semibold text-3xl'>{`Заказ номер #${order?.id}`}</h1>
                        <Badge color='blue' variant='dot' size='xl' radius='lg'>
                            На рассмотрении
                        </Badge>
                    </div>
                    {order?.application_status === 'Pending' && (
                        <div className='flex flex-row items-center gap-2'>
                            <Button
                                color='green'
                                size='md'
                                rightSection={<CheckIcon size={16} />}
                                onClick={handleProcess}
                            >
                                Принять
                            </Button>
                            <Button
                                color='red'
                                size='md'
                                rightSection={<XIcon size={18} />}
                                onClick={handleReject}
                            >
                                Отклонить
                            </Button>
                        </div>
                    )}
                    {order?.application_status === 'Prepare' &&
                        order.obtain_method == 'Electronic' && (
                            <FileInput
                                variant='filled'
                                size='md'
                                clearable
                                label='Загрузить справку'
                                placeholder='Выберите файл'
                            />
                        )}
                </header>
                <Divider className='my-4' />
                <Group mt='sm'>
                    <div className='flex flex-row gap-10 w-full'>
                        <div key={order?.certificate_type}>
                            <Text size='sm' c='dimmed'>
                                Тип справки
                            </Text>
                            <Text size='lg'>{order?.certificate_type}</Text>
                        </div>
                        <div key={order?.obtain_method}>
                            <Text size='sm' c='dimmed'>
                                Способ получения
                            </Text>
                            <Text size='lg'>{order?.obtain_method}</Text>
                        </div>
                        <div key={order?.created_at}>
                            <Text size='sm' c='dimmed'>
                                Дата
                            </Text>
                            <Text size='lg'>{order?.created_at}</Text>
                        </div>
                    </div>
                </Group>
            </Paper>
        </div>
    );
};

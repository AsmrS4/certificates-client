import { FieldSkeleton } from '@/components/Skeletons/FieldSkeleton';
import { StatusStepper } from '@/components/Stepper/StatusStepper';
import { useFetchDetails } from '@/hooks/useFetchDetails';
import { useOrderStatus } from '@/hooks/useOrderStatus';
import { formatDate } from '@/utils/dateFormatter';
import { obtainMap, typeMap } from '@/utils/enumMapper';
import { statusMap } from '@/utils/statusMapper';
import { Text, Badge, Button, CheckIcon, Divider, FileInput, Group, Paper } from '@mantine/core';
import { XIcon } from '@phosphor-icons/react';
import { useParams } from 'react-router-dom';

export const CertificateDetails = () => {
    const { id } = useParams();
    const { order, handleProcess, handleReject, isLoading, errorMessage } = useFetchDetails(id);
    const status = order && statusMap[order.application_status];
    const { currentStepStatus } = useOrderStatus(id, order);

    return (
        <div className='flex flex-col w-full p-8 gap-12'>
            {!errorMessage && (
                <>
                    <h1 className='font-semibold text-3xl flex flex-row items-center'>
                        {`Текущий статус заявки`}
                    </h1>
                    <div className='w-full items-center justify-between px-8'>
                        <StatusStepper active={currentStepStatus} />
                    </div>
                </>
            )}
            {errorMessage ? (
                <div>Не удалось получить данные</div>
            ) : (
                <Paper shadow='xs' p='xl' withBorder>
                    <header className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row items-center gap-8'>
                            <h1 className='font-semibold text-3xl flex flex-row items-center'>
                                {`Заказ номер #`}
                                {isLoading ? <FieldSkeleton w={40} /> : order?.id}
                            </h1>
                            {isLoading ? (
                                <FieldSkeleton w={240} r='lg' />
                            ) : (
                                <Badge color={status?.color} variant='dot' size='xl' radius='lg'>
                                    {status?.label}
                                </Badge>
                            )}
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
                                {isLoading ? (
                                    <FieldSkeleton />
                                ) : (
                                    <Text size='lg'>
                                        {typeMap[order?.certificate_type || 'Common']}
                                    </Text>
                                )}
                            </div>
                            <div key={order?.obtain_method}>
                                <Text size='sm' c='dimmed'>
                                    Способ получения
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton />
                                ) : (
                                    <Text size='lg'>
                                        {obtainMap[order?.obtain_method || 'Paper']}
                                    </Text>
                                )}
                            </div>
                            <div key={order?.created_at}>
                                <Text size='sm' c='dimmed'>
                                    Дата и время
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton />
                                ) : (
                                    <Text size='lg'>{formatDate(order?.created_at)}</Text>
                                )}
                            </div>
                        </div>
                    </Group>
                </Paper>
            )}
        </div>
    );
};

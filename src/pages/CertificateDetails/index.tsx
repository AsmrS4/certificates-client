import { CommentModal } from '@/components/Modal/CommentModal';
import { FieldSkeleton } from '@/components/Skeletons/FieldSkeleton';
import { StatusStepper } from '@/components/Stepper/StatusStepper';
import { useFetchDetails } from '@/hooks/useFetchDetails';
import { useOrderStatus } from '@/hooks/useOrderStatus';
import { formatDate } from '@/utils/dateFormatter';
import { obtainMap, typeMap } from '@/utils/enumMapper';
import { statusMap } from '@/utils/statusMapper';
import {
    Text,
    Badge,
    Button,
    CheckIcon,
    Divider,
    FileInput,
    Group,
    Paper,
    useModalsStack,
    Textarea,
} from '@mantine/core';
import { CloudArrowUpIcon, XIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const CertificateDetails = () => {
    const { id } = useParams();
    const { order, isLoading, errorMessage, handleChangeOrderStatus } = useFetchDetails(id);
    const [file, setFile] = useState<File | null>(null);
    const stack = useModalsStack(['reject-action', 'confirm-action']);
    const status = order && statusMap[order.application_status];
    const {
        currentStepStatus,
        isLoading: isProcessStatus,
        handleProcessOrder,
        handleRejectOrder,
        handleFinishOrder,
        handleUploadCertificate,
    } = useOrderStatus(id, order, handleChangeOrderStatus);
    const handleFileChange = (payload: File | null) => {
        setFile(payload);
    };
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
                <div className='flex flex-col w-full items-start gap-4'>
                    <Paper shadow='xs' p='md' px='lg' withBorder className='w-full'>
                        <header className='flex flex-row items-center justify-between h-16 px-4'>
                            <div className='flex flex-row items-center gap-8'>
                                <h1 className='font-semibold text-3xl flex flex-row items-center'>
                                    {`Заказ номер #`}
                                    {isLoading ? <FieldSkeleton w={40} /> : order?.id}
                                </h1>
                                {isLoading ? (
                                    <FieldSkeleton w={240} r='lg' />
                                ) : (
                                    <Badge
                                        color={status?.color}
                                        variant='dot'
                                        size='xl'
                                        radius='lg'
                                    >
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
                                        onClick={handleProcessOrder}
                                        disabled={isProcessStatus}
                                    >
                                        Принять
                                    </Button>
                                    <Button
                                        color='red'
                                        size='md'
                                        rightSection={<XIcon size={18} />}
                                        onClick={() => stack.open('reject-action')}
                                        disabled={isProcessStatus}
                                    >
                                        Отклонить
                                    </Button>
                                </div>
                            )}
                            {order?.application_status === 'Prepare' &&
                                (order.obtain_method == 'Electronic' ? (
                                    <div className='flex flex-row items-end gap-2'>
                                        <FileInput
                                            variant='filled'
                                            size='md'
                                            clearable
                                            label='Загрузить справку'
                                            placeholder='Выберите файл'
                                            value={file}
                                            onChange={handleFileChange}
                                        />
                                        <Button
                                            color='blue'
                                            size='md'
                                            rightSection={<CloudArrowUpIcon size={16} />}
                                            onClick={() => {
                                                file && handleUploadCertificate(file);
                                            }}
                                            disabled={isProcessStatus || file === null}
                                        >
                                            Отправить
                                        </Button>
                                    </div>
                                ) : (
                                    <Button
                                        color='green'
                                        size='md'
                                        rightSection={<CheckIcon size={16} />}
                                        onClick={handleFinishOrder}
                                        disabled={isProcessStatus}
                                    >
                                        Подтвердить готовность
                                    </Button>
                                ))}
                        </header>
                        <Divider className='my-4' />
                        <Group mt='sm'>
                            <div className='flex flex-row gap-10 w-full px-4'>
                                <div key={order?.full_name}>
                                    <Text size='sm' c='dimmed'>
                                        ФИО получателя
                                    </Text>
                                    {isLoading ? (
                                        <FieldSkeleton w={240} />
                                    ) : (
                                        <Text size='lg'>
                                            {order?.full_name
                                                ? order?.full_name
                                                : 'Неизвестный получатель'}
                                        </Text>
                                    )}
                                </div>
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
                    {order?.rejection_reason && (
                        <Textarea
                            label='Причина отказа'
                            labelProps={{
                                size: 'md',
                                color: 'dimmed',
                                fw: 500,
                                fs: 'md',
                                style: { margin: '4px' },
                            }}
                            placeholder='Комментарий'
                            variant='filled'
                            readOnly
                            minRows={4}
                            className='max-w-xl w-full'
                            value={order.rejection_reason}
                        />
                    )}
                </div>
            )}
            <CommentModal stack={stack} callback={handleRejectOrder} />
        </div>
    );
};

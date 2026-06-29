import { CommentModal } from '@/components/Modal/CommentModal';
import { FieldSkeleton } from '@/components/Skeletons/FieldSkeleton';
import { StatusStepper } from '@/components/Stepper/StatusStepper';
import { useFetchDetails } from '@/hooks/useFetchDetails';
import { useOrderStatus } from '@/hooks/useOrderStatus';
import { formatDate } from '@/utils/dateFormatter';
import {
    educationFormMap,
    fundingMap,
    nationalityMap,
    obtainMap,
    studentPositionStatusMap,
    typeMap,
} from '@/utils/enumMapper';
import { statusMap } from '@/utils/statusMapper';
import {
    Text,
    Badge,
    Button,
    Divider,
    FileInput,
    Group,
    Paper,
    useModalsStack,
    Textarea,
    Flex,
    Card,
    List,
    Anchor,
    Title,
    SimpleGrid,
    Grid,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { CloudArrowUpIcon, XIcon, FileIcon } from '@phosphor-icons/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const cleanFormData = (data: Record<string, unknown>): Record<string, unknown> => {
    if (!data) return {};

    const result: Record<string, unknown> = {};
    const keys = Object.keys(data);

    for (const key of keys) {
        if (!key.includes(':')) {
            result[key] = data[key];
        }
    }

    return result;
};

export const CertificateDetails = () => {
    const { id } = useParams();
    const { order, isLoading, errorMessage, handleChangeOrderStatus } = useFetchDetails(id);
    const [file, setFile] = useState<File | null>(null);
    const stack = useModalsStack(['reject-action', 'confirm-action']);
    const status = order && statusMap[order.application_status];
    const isMobile = useMediaQuery('(max-width: 48em)');

    const {
        currentStepStatus,
        isLoading: isProcessStatus,
        handleProcessOrder,
        handleRejectOrder,
        handleUploadCertificate,
    } = useOrderStatus(id, order, handleChangeOrderStatus);
    const handleFileChange = (payload: File | null) => {
        setFile(payload);
    };

    const renderFormData = () => {
        if (!order?.form_data) return null;
        const cleaned = cleanFormData(order.form_data);
        const entries = Object.entries(cleaned).filter(([key]) => key !== 'attachments');
        if (entries.length === 0) return null;

        return (
            <Card withBorder p='md' mt='md'>
                <Title order={5} mb='sm'>
                    {'Дополнительная информация(комментарий):'}
                </Title>
                <List>
                    {entries.map(([key, value]) => (
                        <List.Item key={key}>
                            <Text size='sm' component='span'>
                                {String(value)}
                            </Text>
                        </List.Item>
                    ))}
                </List>
            </Card>
        );
    };

    const renderAttachments = () => {
        if (!order?.attachments || order.attachments.length === 0) {
            return null;
        }
        return (
            <Card withBorder p='md' mt='md'>
                <Title order={5} mb='sm'>
                    Прикреплённые файлы
                </Title>
                <List>
                    {order.attachments.map((att, idx) => (
                        <List.Item key={att.id}>
                            <Group gap='md'>
                                <FileIcon size={16} />
                                <Text size='sm'>{att.file_name + '_' + idx + 1}</Text>
                                <Text size='xs' c='dimmed'>
                                    ({att.file_type})
                                </Text>
                                {att.file_url && (
                                    <Badge
                                        variant='light'
                                        color='blue'
                                        className='inline-flex items-center gap-1 px-2 py-1'
                                    >
                                        <Anchor
                                            href={att.file_url}
                                            target='_blank'
                                            size='sm'
                                            className='flex items-center gap-1 text-xs'
                                            style={{ textDecoration: 'none', color: 'inherit' }}
                                        >
                                            <span className='text-xs !important'>Скачать</span>
                                        </Anchor>
                                    </Badge>
                                )}
                                <Text size='xs' c='dimmed'>
                                    Загружено: {formatDate(att.uploaded_at)}
                                </Text>
                            </Group>
                        </List.Item>
                    ))}
                </List>
            </Card>
        );
    };

    const renderCertificateFile = () => {
        if (!order?.certificate_file) {
            return null;
        }
        const file = order.certificate_file;
        return (
            <Card withBorder p='md' mt='md'>
                <Title order={5} mb='sm'>
                    Готовая справка
                </Title>
                <Group gap='sm'>
                    <FileIcon size={16} />
                    <Text size='sm'>{file.file_name}</Text>
                    {file.storage_url && (
                        <Badge
                            variant='light'
                            color='blue'
                            className='inline-flex items-center gap-1 px-2 py-1'
                        >
                            <Anchor
                                href={file.storage_url}
                                target='_blank'
                                size='sm'
                                className='flex items-center gap-1 text-xs'
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <span className='text-xs !important'>Скачать</span>
                            </Anchor>
                        </Badge>
                    )}
                    <Text size='xs' c='dimmed'>
                        Загружено: {formatDate(file.uploaded_at)}
                    </Text>
                </Group>
            </Card>
        );
    };

    return (
        <div className='flex flex-col w-full py-8 px-2 sm:px-8 gap-12'>
            {!errorMessage && !isMobile && (
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
                        <header className='flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2 sm:py-0 sm:h-16'>
                            <div className='flex flex-wrap items-center gap-2 sm:gap-8 w-full sm:w-auto'>
                                <h1 className='font-semibold text-xl sm:text-3xl flex flex-row items-center'>
                                    {`Заказ номер #`}
                                    {isLoading ? <FieldSkeleton w={40} /> : order?.id}
                                </h1>
                                {isLoading ? (
                                    <FieldSkeleton w={240} r='lg' />
                                ) : (
                                    <Badge
                                        color={status?.color}
                                        variant='dot'
                                        size={isMobile ? 'md' : 'xl'}
                                        radius='lg'
                                    >
                                        {status?.label}
                                    </Badge>
                                )}
                            </div>
                            <div className='flex flex-wrap items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-start sm:justify-end'>
                                {order?.application_status === 'Pending' && (
                                    <>
                                        <Button
                                            variant='light'
                                            color='green'
                                            size='sm'
                                            onClick={handleProcessOrder}
                                            disabled={isProcessStatus}
                                        >
                                            Принять
                                        </Button>
                                        <Button
                                            variant='light'
                                            color='red'
                                            size='sm'
                                            rightSection={<XIcon size={18} />}
                                            onClick={() => stack.open('reject-action')}
                                            disabled={isProcessStatus}
                                        >
                                            Отклонить
                                        </Button>
                                    </>
                                )}
                                {order?.application_status === 'Prepare' && (
                                    <div className='flex flex-row items-end gap-2'>
                                        <FileInput
                                            variant='filled'
                                            size='sm'
                                            clearable
                                            label='Загрузить справку'
                                            placeholder='Выберите файл'
                                            value={file}
                                            onChange={handleFileChange}
                                            className='w-full sm:w-auto'
                                        />
                                        <Button
                                            color='blue'
                                            size='sm'
                                            rightSection={<CloudArrowUpIcon size={16} />}
                                            onClick={() => {
                                                file && handleUploadCertificate(file);
                                            }}
                                            disabled={isProcessStatus || file === null}
                                        >
                                            Отправить
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </header>

                        <Divider className='my-4' />
                        <Grid mt='sm' px='md'>
                            <Grid.Col span={{ base: 12, sm: 8 }}>
                                <Text size='sm' c='dimmed'>
                                    ФИО получателя
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton w={240} />
                                ) : (
                                    <Text size='lg'>
                                        {order?.full_name || 'Неизвестный получатель'}
                                    </Text>
                                )}
                            </Grid.Col>
                            <Grid.Col span={{ base: 12, sm: 4 }}>
                                <Text size='sm' c='dimmed'>
                                    Статус студента
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton w={100} />
                                ) : (
                                    <Text size='lg'>
                                        {studentPositionStatusMap[order?.position_status!] ||
                                            'Неизвестен'}
                                    </Text>
                                )}
                            </Grid.Col>
                        </Grid>
                        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='md' mt='sm' px='sm'>
                            <div>
                                <Text size='sm' c='dimmed'>
                                    Факультет
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton w={150} />
                                ) : (
                                    <Text size='lg'>{order?.faculty_name || '—'}</Text>
                                )}
                            </div>
                            <div>
                                <Text size='sm' c='dimmed'>
                                    Поток
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton w={150} />
                                ) : (
                                    <Text size='lg'>{order?.stream_name || '—'}</Text>
                                )}
                            </div>
                            <div>
                                <Text size='sm' c='dimmed'>
                                    Группа
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton w={80} />
                                ) : (
                                    <Text size='lg'>{order?.group_code || '—'}</Text>
                                )}
                            </div>
                            <div>
                                <Text size='sm' c='dimmed'>
                                    Гражданство
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton w={100} />
                                ) : (
                                    <Text size='lg'>
                                        {nationalityMap[order?.nationality_type!] || 'Не указано'}
                                    </Text>
                                )}
                            </div>

                            <div>
                                <Text size='sm' c='dimmed'>
                                    Финансирование
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton w={100} />
                                ) : (
                                    <Text size='lg'>
                                        {fundingMap[order?.funding_type!] || 'Не указано'}
                                    </Text>
                                )}
                            </div>
                            <div>
                                <Text size='sm' c='dimmed'>
                                    Форма обучения
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton w={100} />
                                ) : (
                                    <Text size='lg'>
                                        {educationFormMap[order?.education_form!] || 'Не указана'}
                                    </Text>
                                )}
                            </div>
                        </SimpleGrid>
                        <Divider className='my-4' />
                        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing='lg' mt='sm' px='md'>
                            <div>
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
                            <div>
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
                            <div>
                                <Text size='sm' c='dimmed'>
                                    Дата обращения
                                </Text>
                                {isLoading ? (
                                    <FieldSkeleton />
                                ) : (
                                    <Text size='lg'>{formatDate(order?.created_at)}</Text>
                                )}
                            </div>
                        </SimpleGrid>
                        {order?.comment && (
                            <>
                                <Divider className='my-4' />
                                <Flex direction='column' gap={'sm'} align='start' px={'sm'}>
                                    <Text size='sm' c='dimmed'>
                                        Комментарий к заказу
                                    </Text>
                                    <Textarea
                                        placeholder='Комментарий'
                                        variant='filled'
                                        readOnly
                                        minRows={4}
                                        className='max-w-xl w-full'
                                        value={order.comment}
                                    />
                                </Flex>
                            </>
                        )}
                        {!isLoading && renderFormData()}
                        {!isLoading && renderAttachments()}
                        {!isLoading && renderCertificateFile()}
                    </Paper>
                </div>
            )}
            <CommentModal stack={stack} callback={handleRejectOrder} />
        </div>
    );
};

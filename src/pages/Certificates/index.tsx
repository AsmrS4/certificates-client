import { useState } from 'react';
import { OrderCard } from '@/components/OrderCard';
import { useCertificates } from '@/hooks/useCertificates';
import { Button, Pagination, Select, SimpleGrid } from '@mantine/core';
import { FunnelSimpleIcon } from '@phosphor-icons/react';
import { OrderCardSkeleton } from '@/components/Skeletons/OrderCardSkeleton';

const statusOptions = [
    { value: 'Pending', label: 'Новые' },
    { value: 'Prepare', label: 'Готовится' },
    { value: 'Done', label: 'Готова' },
    { value: 'Rejected', label: 'Отклонена' },
];

const typeOptions = [
    { value: 'StudyPeriod', label: 'Период обучения' },
    { value: 'Academic', label: 'Академическая' },
    { value: 'Recommendation', label: 'Реком. письмо' },
    { value: 'Common', label: 'Иная' },
];

export const CertificatesPage = () => {
    const {
        isLoading,
        certificates,
        pagination,
        handleSelectOrder,
        handleStatus,
        handleType,
        handleOffset,
    } = useCertificates();
    const hasOrders = certificates && certificates.length > 0;
    const [statusValue, setStatusValue] = useState<string | null>(null);
    const [typeValue, setTypeValue] = useState<string | null>(null);

    const handleApplyFilters = () => {
        if (isLoading) return;
        handleStatus(statusValue ?? '');
        handleType(typeValue ?? '');
    };

    return (
        <div className='flex flex-col w-full p-8'>
            <div className='flex flex-row items-end gap-8 px-4 mb-4'>
                <div className='flex flex-row items-center gap-4'>
                    <Select
                        label='Статус заказа'
                        size='md'
                        placeholder='Выберите статус'
                        data={statusOptions}
                        value={statusValue}
                        onChange={setStatusValue}
                        comboboxProps={{
                            transitionProps: { transition: 'pop', duration: 100 },
                            shadow: 'sm',
                        }}
                        clearable
                    />
                    <Select
                        label='Тип справки'
                        size='md'
                        placeholder='Выберите тип'
                        data={typeOptions}
                        value={typeValue}
                        onChange={setTypeValue}
                        comboboxProps={{
                            transitionProps: { transition: 'pop', duration: 100 },
                            shadow: 'sm',
                        }}
                        clearable
                    />
                </div>
                <Button
                    rightSection={<FunnelSimpleIcon size={16} />}
                    variant='filled'
                    size='md'
                    radius='md'
                    onClick={handleApplyFilters}
                >
                    Применить
                </Button>
            </div>

            <SimpleGrid className='w-full my-8 px-4' cols={3} spacing='md' verticalSpacing='lg'>
                {isLoading && [...Array(5)].map((_, index) => <OrderCardSkeleton key={index} />)}
                {hasOrders
                    ? certificates.map((item) => {
                          return <OrderCard key={item.id} onClick={handleSelectOrder} {...item} />;
                      })
                    : !isLoading && <div>Ничего не найдено</div>}
            </SimpleGrid>

            {hasOrders && (
                <Pagination
                    className='px-4'
                    total={Math.floor(pagination.total / pagination.limit) + 1}
                    size='lg'
                    radius='sm'
                    value={pagination.offset}
                    onChange={handleOffset}
                />
            )}
        </div>
    );
};

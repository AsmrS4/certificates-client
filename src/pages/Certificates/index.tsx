import { useEffect, useState } from 'react';
import { OrderCard } from '@/components/OrderCard';
import { useCertificates } from '@/hooks/useCertificates';
import { Button, Pagination, Select, SimpleGrid } from '@mantine/core';
import { ArrowClockwiseIcon, FunnelSimpleIcon } from '@phosphor-icons/react';
import { OrderCardSkeleton } from '@/components/Skeletons/OrderCardSkeleton';
import { EmptyResult } from '@/components/Result/EmptyResult';
import { useNotification } from '@/hooks/useNotification';
import { useSearchParams } from 'react-router-dom';

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
    const [searchParams, setSearchParams] = useSearchParams();
    const {
        isLoading,
        errorMessage,
        certificates,
        pagination,
        handleSelectOrder,
        handleStatus,
        handleType,
        handleOffset,
        initialize,
    } = useCertificates();
    const hasOrders = certificates && certificates.length > 0;
    const [statusValue, setStatusValue] = useState<string | null>(null);
    const [typeValue, setTypeValue] = useState<string | null>(null);

    useEffect(() => {
        const statusParam = searchParams.get('status') || '';
        const typeParam = searchParams.get('type') || '';
        const pageParam = searchParams.get('page');
        const page = pageParam ? parseInt(pageParam, 10) : 1;

        setStatusValue(statusParam || null);
        setTypeValue(typeParam || null);

        initialize({
            status: statusParam,
            type: typeParam,
            offset: page,
        });
    }, []);

    const handleApplyFilters = () => {
        if (isLoading) return;

        const newParams = new URLSearchParams();
        if (statusValue) newParams.set('status', statusValue);
        if (typeValue) newParams.set('type', typeValue);
        newParams.set('page', '1');
        setSearchParams(newParams);

        handleStatus(statusValue ?? '');
        handleType(typeValue ?? '');
    };

    const handlePageChange = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page.toString());
        setSearchParams(newParams);
        handleOffset(page);
    };

    const resetFilters = () => {
        setSearchParams(new URLSearchParams());
        setStatusValue(null);
        setTypeValue(null);

        handleStatus('');
        handleType('');
    };

    const handlePaginationTotal = (): number => {
        const remainder = pagination.total % pagination.limit;
        if (remainder === 0) return pagination.total / pagination.limit;
        return Math.floor(pagination.total / pagination.limit) + 1;
    };

    const { handleErrorNotification } = useNotification();
    useEffect(() => {
        if (errorMessage) handleErrorNotification(errorMessage);
    }, [errorMessage]);

    return (
        <div className='flex flex-col w-full p-8 overflow-y-scroll h-full'>
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
                <div className='flex flex-row items-center gap-2'>
                    <Button
                        rightSection={<FunnelSimpleIcon size={16} />}
                        variant='filled'
                        size='md'
                        radius='md'
                        onClick={handleApplyFilters}
                    >
                        Применить
                    </Button>
                    {(statusValue || typeValue) && (
                        <Button variant='filled' size='md' radius='md' onClick={resetFilters}>
                            <ArrowClockwiseIcon size={24} />
                        </Button>
                    )}
                </div>
            </div>

            <SimpleGrid className='w-full my-8 px-4' cols={2} spacing='md' verticalSpacing='lg'>
                {isLoading && [...Array(10)].map((_, index) => <OrderCardSkeleton key={index} />)}
                {hasOrders
                    ? certificates.map((item) => {
                          return <OrderCard key={item.id} onClick={handleSelectOrder} {...item} />;
                      })
                    : !isLoading && <></>}
            </SimpleGrid>
            {!hasOrders && !isLoading && <EmptyResult onClick={resetFilters} />}

            {hasOrders && (
                <Pagination
                    className='px-4'
                    total={handlePaginationTotal()}
                    size='lg'
                    radius='sm'
                    value={pagination.offset}
                    onChange={handlePageChange}
                />
            )}
        </div>
    );
};

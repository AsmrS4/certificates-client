import { useEffect, useState, type ChangeEvent } from 'react';
import { OrderCard } from '@/components/OrderCard';
import { useCertificates } from '@/hooks/useCertificates';
import { Button, Input, Pagination, Select, SimpleGrid } from '@mantine/core';
import { ArrowClockwiseIcon, FunnelSimpleIcon } from '@phosphor-icons/react';
import { OrderCardSkeleton } from '@/components/Skeletons/OrderCardSkeleton';
import { EmptyResult } from '@/components/Result/EmptyResult';
import { useNotification } from '@/hooks/useNotification';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';

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
        searchName,
        errorMessage,
        certificates,
        pagination,
        handleSelectOrder,
        handleStatus,
        handleType,
        setSearchName,
        handleSearchName,
        handleOffset,
        initialize,
    } = useCertificates();

    const hasOrders = certificates && certificates.length > 0;
    const [statusValue, setStatusValue] = useState<string | null>(null);
    const [typeValue, setTypeValue] = useState<string | null>(null);

    const debouncedSearchName = useDebounce(searchName, 700);

    useEffect(() => {
        if (debouncedSearchName !== undefined) {
            const newParams = new URLSearchParams(searchParams);
            if (debouncedSearchName) {
                newParams.set('search', debouncedSearchName);
            } else {
                newParams.delete('search');
            }
            newParams.set('page', '1');
            setSearchParams(newParams);
            handleSearchName(debouncedSearchName);
        }
    }, [debouncedSearchName]);

    useEffect(() => {
        const statusParam = searchParams.get('status') || '';
        const typeParam = searchParams.get('type') || '';
        const pageParam = searchParams.get('page');
        const searchNameParam = searchParams.get('search') || '';
        const page = pageParam ? parseInt(pageParam, 10) : 1;

        setStatusValue(statusParam || null);
        setTypeValue(typeParam || null);
        setSearchName(searchNameParam || '');

        initialize({
            status: statusParam,
            type: typeParam,
            offset: page,
        });
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchName(val);
    };

    const handleApplyFilters = () => {
        if (isLoading) return;

        const newParams = new URLSearchParams();
        if (statusValue) newParams.set('status', statusValue);
        if (typeValue) newParams.set('type', typeValue);
        if (searchName) newParams.set('search', searchName);
        newParams.set('page', '1');
        setSearchParams(newParams);

        handleStatus(statusValue ?? '');
        handleType(typeValue ?? '');
        handleSearchName(searchName ?? '');
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
        setSearchName('');

        handleStatus('');
        handleType('');
        handleSearchName('');
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
            <div className='flex flex-col items-start gap-2'>
                <div className='flex flex-row items-end gap-8 px-4 mb-2'>
                    <div className='flex flex-row items-end gap-4'>
                        <Select
                            label='Статус заказа'
                            size='md'
                            placeholder='Выберите статус'
                            data={statusOptions}
                            value={statusValue}
                            onChange={setStatusValue}
                            className='w-full max-w-40'
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
                            className='w-full max-w-50'
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
                <Input
                    size='md'
                    className='w-full px-4'
                    placeholder='Искать по ФИО...'
                    value={searchName}
                    onChange={handleInputChange}
                />
            </div>

            <SimpleGrid className='w-full my-3 px-4' cols={2} spacing='md' verticalSpacing='lg'>
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

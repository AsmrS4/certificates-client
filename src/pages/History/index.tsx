import { useEffect, useState, type ChangeEvent } from 'react';
import { OrderCard } from '@/components/OrderCard';
import { useCertificates } from '@/hooks/useCertificates';
import { Button, Input, Pagination, Select, SimpleGrid, Modal, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FunnelSimpleIcon } from '@phosphor-icons/react';
import { OrderCardSkeleton } from '@/components/Skeletons/OrderCardSkeleton';
import { EmptyResult } from '@/components/Result/EmptyResult';
import { useNotification } from '@/hooks/useNotification';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';

const statusOptions = [
    { value: 'Done', label: 'Готова' },
    { value: 'Rejected', label: 'Отклонена' },
];

const typeOptions = [
    { value: 'study_period', label: 'Справка об обучении' },
    { value: 'study_period_en', label: 'Справка об обучении (англ.)' },
    { value: 'call', label: 'Справка-вызов' },
    { value: 'name_change', label: 'Справка о смене ФИО' },
    { value: 'mvd', label: 'Справка в МВД (ФМС)' },
    { value: 'recommendation_letter', label: 'Реком. письмо' },
    { value: 'common', label: 'Иная' },
];

export const HistoryPage = () => {
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
        handleNationality,
        handleFacultyName,
        handleGroupCode,
        handleOffset,
        initialize,
    } = useCertificates();

    const hasOrders = certificates && certificates.length > 0;
    const [statusValue, setStatusValue] = useState<string | null>(null);
    const [typeValue, setTypeValue] = useState<string | null>(null);
    const [nationalityValue, setNationalityValue] = useState<string | null>('');
    const [facultyValue, setFacultyValue] = useState<string>('');
    const [groupValue, setGroupValue] = useState<string>('');

    const [filtersOpened, { open: openFilters, close: closeFilters }] = useDisclosure(false);

    const debouncedSearchName = useDebounce(searchName, 700);

    useEffect(() => {
        const statusParam = searchParams.get('status') || '';
        const typeParam = searchParams.get('type') || '';
        const pageParam = searchParams.get('page');
        const searchNameParam = searchParams.get('search') || '';
        const facultyParam = searchParams.get('faculty') || '';
        const nationalityParam = searchParams.get('nationality') || '';
        const groupParam = searchParams.get('group') || '';
        const page = pageParam ? parseInt(pageParam, 10) : 0;

        setStatusValue(statusParam || null);
        setTypeValue(typeParam || null);
        setSearchName(searchNameParam || '');
        setNationalityValue(nationalityParam || '');
        setFacultyValue(facultyParam || '');
        setGroupValue(groupParam || '');

        initialize({
            status: statusParam,
            type: typeParam,
            offset: page,
            nationality_type: undefined,
            faculty_name: facultyParam,
            group_code: groupParam,
        });
    }, []);

    useEffect(() => {
        if (debouncedSearchName !== undefined) {
            const newParams = new URLSearchParams(searchParams);
            if (debouncedSearchName) {
                newParams.set('search', debouncedSearchName);
            } else {
                newParams.delete('search');
            }
            newParams.set('page', '0');
            setSearchParams(newParams);
            handleSearchName(debouncedSearchName);
        }
    }, [debouncedSearchName]);

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
        if (nationalityValue) newParams.set('nationality', nationalityValue);
        if (facultyValue) newParams.set('faculty', facultyValue);
        if (groupValue) newParams.set('group', groupValue);
        newParams.set('page', '0');
        setSearchParams(newParams);

        handleStatus(statusValue ?? '');
        handleType(typeValue ?? '');
        handleSearchName(searchName ?? '');
        handleFacultyName(facultyValue);
        handleNationality(nationalityValue ?? '');
        handleGroupCode(groupValue);
        closeFilters();
    };

    const handlePageChange = (page: number) => {
        const selectedPage = page - 1 < 0 ? 0 : page - 1;
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', selectedPage.toString());
        setSearchParams(newParams);
        handleOffset(selectedPage);
    };

    const resetFilters = () => {
        setSearchParams(new URLSearchParams());
        setStatusValue(null);
        setTypeValue(null);
        setSearchName('');
        setNationalityValue('');
        setFacultyValue('');
        setGroupValue('');
        handleStatus('');
        handleType('');
        handleSearchName('');
        handleNationality(null);
        handleFacultyName('');
        handleGroupCode('');
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
        <div className='flex flex-col w-full py-8 px-2 overflow-y-scroll h-full'>
            <div className='w-full flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 px-2'>
                <Input
                    size='md'
                    variant='filled'
                    className='w-full sm:w-2/3'
                    placeholder='Искать по ФИО...'
                    value={searchName}
                    onChange={handleInputChange}
                />
                <Button
                    variant='outline'
                    className='w-full sm:w-1/3 px-4'
                    size='md'
                    onClick={openFilters}
                    rightSection={<FunnelSimpleIcon size={16} />}
                >
                    Фильтры
                </Button>
            </div>

            <SimpleGrid
                className='w-full my-4 px-2'
                cols={{ base: 1, lg: 2 }}
                spacing='md'
                verticalSpacing='lg'
            >
                {isLoading && [...Array(10)].map((_, index) => <OrderCardSkeleton key={index} />)}
                {hasOrders
                    ? certificates.map((item) => (
                          <OrderCard key={item.id} onClick={handleSelectOrder} {...item} />
                      ))
                    : !isLoading && <></>}
            </SimpleGrid>
            {!hasOrders && !isLoading && <EmptyResult onClick={resetFilters} />}

            {hasOrders && (
                <Pagination
                    className='px-2'
                    total={handlePaginationTotal()}
                    size='lg'
                    radius='sm'
                    value={pagination.offset + 1}
                    onChange={handlePageChange}
                />
            )}

            <Modal
                opened={filtersOpened}
                onClose={closeFilters}
                title='Дополнительные фильтры'
                size='lg'
                padding='md'
            >
                <Stack gap='md'>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 px-2'>
                        <Input.Wrapper label='Факультет' className='w-full sm:w-2/3'>
                            <Input
                                placeholder='Введите название факультета'
                                value={facultyValue}
                                className='w-full'
                                onChange={(e) => setFacultyValue(e.currentTarget.value)}
                            />
                        </Input.Wrapper>
                        <Input.Wrapper label='Группа' className='w-full sm:w-1/3'>
                            <Input
                                placeholder='Введите номер группы'
                                value={groupValue}
                                className='w-full'
                                onChange={(e) => setGroupValue(e.currentTarget.value)}
                            />
                        </Input.Wrapper>
                    </div>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 px-2'>
                        <Select
                            label='Гражданство'
                            placeholder='Укажите гражданство'
                            className='w-full'
                            data={statusOptions}
                            value={nationalityValue}
                            onChange={setNationalityValue}
                            comboboxProps={{
                                transitionProps: { transition: 'pop', duration: 100 },
                                shadow: 'sm',
                            }}
                            clearable
                        />
                        <Select
                            label='Статус заказа'
                            placeholder='Выберите статус'
                            className='w-full'
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
                            placeholder='Выберите тип'
                            className='w-full'
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
                    <div className='flex flex-col sm:flex-row items-stretch gap-2 px-2'>
                        <Button
                            className='w-full sm:flex-1'
                            variant='outline'
                            size='sm'
                            radius='md'
                            onClick={resetFilters}
                        >
                            Сбросить
                        </Button>
                        <Button
                            className='w-full sm:flex-1'
                            onClick={handleApplyFilters}
                            size='sm'
                            radius='md'
                        >
                            Применить
                        </Button>
                    </div>
                </Stack>
            </Modal>
        </div>
    );
};

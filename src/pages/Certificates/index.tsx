import { OrderCard } from '@/components/OrderCard';
import { Button, Paper, Select, SimpleGrid } from '@mantine/core';
import { FunnelIcon, FunnelSimpleIcon } from '@phosphor-icons/react';

export const CertificatesPage = () => {
    return (
        <div className='flex flex-col w-full p-8'>
            <div className='flex flex-row items-end gap-8 px-4 mb-4'>
                <div className='flex flex-row items-center gap-4'>
                    <Select
                        label='Статус заказа'
                        size='md'
                        placeholder='Выберите статус'
                        data={['Новые', 'Готовится', 'Готова', 'Отклонена']}
                        comboboxProps={{
                            transitionProps: { transition: 'pop', duration: 100 },
                            shadow: 'sm',
                        }}
                    />
                    <Select
                        label='Тип справки'
                        size='md'
                        placeholder='Выберите тип'
                        data={['Период обучения', 'Академическая', 'Реком. письмо', 'Иная']}
                        comboboxProps={{
                            transitionProps: { transition: 'pop', duration: 100 },
                            shadow: 'sm',
                        }}
                    />
                    <Select
                        label='Элементов на стр.'
                        size='md'
                        placeholder='Выберите размер'
                        data={[5, 10, 20, 50]}
                        comboboxProps={{
                            transitionProps: { transition: 'pop', duration: 100 },
                            shadow: 'sm',
                        }}
                        defaultValue={10}
                    />
                </div>
                <Button
                    rightSection={<FunnelSimpleIcon size={16} />}
                    variant='filled'
                    size='md'
                    radius='md'
                >
                    Применить
                </Button>
            </div>
            <SimpleGrid className='w-full my-8 px-4' cols={2} spacing='md' verticalSpacing='lg'>
                {[...Array(3)].map((_, index) => {
                    return <OrderCard />;
                })}
            </SimpleGrid>
        </div>
    );
};

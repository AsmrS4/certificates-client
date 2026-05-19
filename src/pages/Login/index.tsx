import { useLogin } from '@/hooks/useLogin';
import { Button, Divider, Paper } from '@mantine/core';
import { CertificateIcon, UserCircleCheckIcon } from '@phosphor-icons/react';

export const LoginPage = () => {
    const { errorMessage, isLoading, handleLogin } = useLogin();
    return (
        <Paper withBorder shadow='xs' p='xl' className='box-border p-2 max-w-lg w-full min-h-96'>
            <div className='flex flex-col justify-between h-full w-full'>
                <div className='flex flex-col items-center justify-between gap-1'>
                    <CertificateIcon size={48} />
                    <h1 className='font-semibold text-3xl'>Сервис заказа справок</h1>
                    <p className='font-light text-lg text-center'>
                        Авторизуйтесь через ТГУ-аккаунт для работы
                    </p>
                </div>
                <Divider my='md' label='нажмите на кнопку ниже' labelPosition='center' />
                <Button
                    justify='center'
                    fullWidth
                    size='lg'
                    variant='filled'
                    mt='lg'
                    onClick={handleLogin}
                    disabled={isLoading}
                    loading={isLoading}
                >
                    Войти через ТГУ-аккаунт
                </Button>
            </div>
        </Paper>
    );
};

import { logoutUser } from '@/api/auth';
import { errors } from '@/constants/messages';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useNotification } from '@/hooks/useNotification';
import { routes } from '@/router/routes';
import { AppShell, Burger, Button, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CertificateIcon, SignOutIcon, StudentIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const data = [
    {
        icon: CertificateIcon,
        label: 'Заказы справок',
        id: 'certificates',
        link: routes.certificates.home,
        description: 'заявки от студентов',
    },
    {
        icon: StudentIcon,
        label: 'Восстановление',
        id: 'recovery',
        link: routes.certificates.recovery,
        description: 'заявки на восстановление студентов',
    },
];

export const Layout = () => {
    const [opened, { toggle }] = useDisclosure();
    const [active, setActive] = useState('certificates');
    const { errorMessage, handleError, clearError } = useErrorHandler();
    const { handleErrorNotification } = useNotification();

    const handleSetActive = () => {
        const page = window.location.pathname.split('/').pop() || 'certificates';
        setActive(page);
    };

    const handleLogout = async () => {
        try {
            clearError();
            const res = await logoutUser();
            if (res) window.location.href = routes.auth.login;
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) handleSetActive();
        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        if (errorMessage) handleErrorNotification(errorMessage || errors.default);
    }, [errorMessage]);

    const items = data.map((item, _) => (
        <NavLink
            href={item.link}
            key={item.id}
            active={item.id === active}
            label={item.label}
            description={item.description}
            leftSection={<item.icon size={16} />}
            onClick={() => handleSetActive()}
            className='rounded-lg'
            variant='filled'
        />
    ));
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 324, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            layout='default'
            className='w-full'
        >
            <AppShell.Header>
                <Group h='100%' px='md'>
                    <div className='flex flex-row items-center w-full'>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom='sm'
                            size='sm'
                            lineSize={1}
                        />
                        <div className='mx-auto w-5/6 flex flex-row justify-between items-center'>
                            <h1 className='font-semibold text-xl'>Сервис заказа справок HIT's</h1>
                            <Button
                                leftSection={<SignOutIcon size={16} />}
                                variant='subtle'
                                radius='md'
                                onClick={handleLogout}
                            >
                                Выйти
                            </Button>
                        </div>
                    </div>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p='xs'>
                <div className='flex flex-col items-center justify-between w-full box-border'>
                    <nav className='flex flex-col gap-2 box-border w-full'>{items}</nav>
                </div>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

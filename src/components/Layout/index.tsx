import { logoutUser } from '@/api/auth';
import { errors } from '@/constants/messages';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { useNotification } from '@/hooks/useNotification';
import { routes } from '@/router/routes';
import { AppShell, Burger, Button, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CertificateIcon, SignOutIcon, StudentIcon, ArchiveIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const data = [
    {
        icon: CertificateIcon,
        label: 'Заказы справок(РФ)',
        id: 'certificates',
        link: routes.certificates.home,
        description: 'заявки от студентов',
    },
    {
        icon: CertificateIcon,
        label: 'Заказы справок(Англ.)',
        id: 'foreign',
        link: routes.certificates.foreign,
        description: 'заявки от студентов',
    },
    {
        icon: ArchiveIcon,
        label: 'История заказов',
        id: 'history',
        link: routes.certificates.history,
        description: 'обработанные заявки',
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
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (link: string, id: string) => {
        setActive(id);
        navigate(link);
    };

    const handleLogout = async () => {
        try {
            clearError();
            const res = await logoutUser();
            if (res) navigate(routes.auth.login);
        } catch (error) {
            handleError(error);
        }
    };

    useEffect(() => {
        const currentPath = location.pathname.split('/').pop() || 'certificates';
        setActive(currentPath);
    }, [location]);

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
            onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.link, item.id);
            }}
            className='rounded-lg'
            variant='filled'
        />
    ));

    return (
        <AppShell
            header={{ height: 60, offset: true }}
            navbar={{ width: 324, breakpoint: 'md', collapsed: { mobile: !opened } }}
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
                <div className='flex flex-col items-center justify-between box-border'>
                    <nav className='flex flex-col gap-2 box-border w-full'>{items}</nav>
                </div>
            </AppShell.Navbar>
            <AppShell.Main className='overflow-y-auto h-dvh box-border'>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

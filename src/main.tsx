import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { App } from '@/App.tsx';
import { AuthProvider } from './router/AuthContext';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
        <Notifications limit={3} autoClose={2000} />
    </MantineProvider>,
);

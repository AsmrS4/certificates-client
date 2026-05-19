import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import '@mantine/core/styles.css';
import { App } from '@/App.tsx';
import { AuthProvider } from './router/AuthContext';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </MantineProvider>,
);

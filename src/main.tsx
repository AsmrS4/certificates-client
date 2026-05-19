import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import { App } from '@/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './router/AuthContext';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>,
);

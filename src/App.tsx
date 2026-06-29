import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/router';

export const App = () => {
    return (
        <main className='h-dvh w-full box-border flex flex-col items-center justify-center'>
            <RouterProvider router={router} />
        </main>
    );
};

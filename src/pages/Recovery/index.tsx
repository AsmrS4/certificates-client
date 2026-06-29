import { NotImplemented } from '@/components/Result/NotImplemented';
import { useNavigate } from 'react-router-dom';

export const RecoveryPage = () => {
    const navigate = useNavigate();

    return (
        <div className='flex flex-col w-full p-8 overflow-y-scroll h-full'>
            <NotImplemented onClick={() => navigate(-1)} />
        </div>
    );
};

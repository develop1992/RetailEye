import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('user'); // or localStorage.clear() if needed
        navigate('/login');
    }, [navigate]);

    return null; // You can also show a spinner or "Logging out..." message
}
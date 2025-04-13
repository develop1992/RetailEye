import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

export default function RequireRole({ role, children }) {
    const user = getCurrentUser();

    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/logout" />;

    return children;
}
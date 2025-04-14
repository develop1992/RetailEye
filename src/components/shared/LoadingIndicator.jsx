import { FaSpinner } from 'react-icons/fa';

export default function LoadingIndicator({ message = 'Loading...' }) {
    return (
        <div className="flex items-center gap-3 text-white text-lg">
            <FaSpinner className="animate-spin text-2xl" />
            <span>{message}</span>
        </div>
    );
}
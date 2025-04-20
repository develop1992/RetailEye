import { FaSpinner } from 'react-icons/fa';

export default function LoadingIndicator({ message = 'Loading...' }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm text-white">
            <FaSpinner className="animate-spin text-4xl mb-4" />
            <p className="text-lg">{message}</p>
        </div>
    );
}
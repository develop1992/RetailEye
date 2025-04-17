import { FaExclamationTriangle } from 'react-icons/fa';

export default function ErrorMessage({ message = 'Something went wrong.', details }) {
    return (
        <div className="flex items-center gap-3 text-red-400 bg-red-900/30 border border-red-400 p-4 rounded-lg shadow-sm max-w-xl mx-auto">
            <FaExclamationTriangle className="text-2xl shrink-0" />
            <div>
                <p className="text-left font-semibold">Error</p>
                <p className="text-sm">{message}</p>
                {details && <p className="text-left text-xs mt-1 italic opacity-70">{details}</p>}
            </div>
        </div>
    );
};
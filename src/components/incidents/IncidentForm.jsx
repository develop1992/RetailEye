import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { formatForDateTimeLocal } from '../../utils/formUtils';

const normalizeIncident = (values) => {
    const safe = values || {};
    return {
        ...safe,
        occurrenceTime: formatForDateTimeLocal(safe.occurrenceTime),
    };
};

export default function IncidentForm({ onSubmit, defaultValues = {} }) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: normalizeIncident(defaultValues),
    });

    useEffect(() => {
        reset(normalizeIncident(defaultValues));
    }, [defaultValues, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md text-gray-800 space-y-4"
        >
            <div>
                <label className="block text-sm font-medium">Occurrence Time</label>
                <input
                    {...register('occurrenceTime')}
                    type="datetime-local"
                    className="w-full p-2 border rounded"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Severity</label>
                <select {...register('severity')} className="w-full p-2 border rounded">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">Status</label>
                <select {...register('status')} className="w-full p-2 border rounded">
                    <option value="Open">Open</option>
                    <option value="Investigating">Investigating</option>
                    <option value="Resolved">Resolved</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">Description</label>
                <textarea {...register('description')} className="w-full p-2 border rounded" />
            </div>
            <button type="submit" className="bg-[#43af52] text-white px-4 py-2 rounded cursor-pointer">
                Save
            </button>
        </form>
    );
};
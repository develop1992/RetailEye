import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { convertBooleansToStrings, formatForDateTimeLocal } from '@/utils/formUtils';

const normalizeShiftValues = (values) => {
    const safe = values || {};
    return {
        ...convertBooleansToStrings(safe, { isAvailable: true }),
        startTime: formatForDateTimeLocal(safe.startTime),
        endTime: formatForDateTimeLocal(safe.endTime),
    };
};

export default function ShiftForm({ onSubmit, initialValues = {} }) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: normalizeShiftValues(initialValues),
    });

    useEffect(() => {
        reset(normalizeShiftValues(initialValues));
    }, [initialValues, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md text-gray-800 space-y-4"
        >
            <div>
                <label className="block text-sm font-medium">Type</label>
                <input {...register('type')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Start Time</label>
                <input {...register('startTime')} type="datetime-local" className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">End Time</label>
                <input {...register('endTime')} type="datetime-local" className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Is Available</label>
                <select {...register('isAvailable')} className="w-full p-2 border rounded">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <button type="submit" className="bg-[#43af52] text-white px-4 py-2 rounded cursor-pointer">
                Save
            </button>
        </form>
    );
};
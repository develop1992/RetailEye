import { useForm } from 'react-hook-form';

export default function ShiftForm({ onSubmit, defaultValues = {} }) {
    const { register, handleSubmit } = useForm({ defaultValues });

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
                <input {...register('start_time')} type="time" className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">End Time</label>
                <input {...register('end_time')} type="time" className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Is Available</label>
                <select {...register('is_available')} className="w-full p-2 border rounded">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <button type="submit" className="bg-[#43af52] text-white px-4 py-2 rounded">
                Save
            </button>
        </form>
    );
}
import { useForm } from 'react-hook-form';

export default function BodyCameraForm({ onSubmit, defaultValues = {} }) {
    const { register, handleSubmit } = useForm({ defaultValues });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md text-gray-800 space-y-4"
        >
            <div>
                <label className="block text-sm font-medium">Serial Number</label>
                <input {...register('serialNumber')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Model</label>
                <input {...register('model')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Manufacturer</label>
                <input {...register('manufacturer')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Is Available</label>
                <select {...register('isAvailable')} className="w-full p-2 border rounded">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium">Is Active</label>
                <select {...register('isActive')} className="w-full p-2 border rounded">
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
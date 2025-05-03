import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { convertBooleansToStrings } from '@/utils/formUtils';

export default function BodyCameraForm({ onSubmit, initialValues = {} }) {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: convertBooleansToStrings(initialValues, {
            isAvailable: true,
            isActive: true,
        }),
    });

    // Reset form when switching between create/edit
    useEffect(() => {
        reset(convertBooleansToStrings(initialValues, {
            isAvailable: true,
            isActive: true,
        }));
    }, [initialValues, reset]);

    return (
        <div className="overflow-y-auto max-h-[70vh]">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-6 rounded-lg shadow-md text-gray-800 space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium">Serial Number</label>
                    <input
                        {...register('serialNumber')}
                        className="w-full p-2 border rounded"
                        readOnly={!!initialValues?.serialNumber}  // Make the field read-only if it's being edited
                    />
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
                    <select
                        {...register('isAvailable')}
                        className="w-full p-2 border rounded bg-gray-100 text-gray-500 cursor-not-allowed"
                        disabled
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <p className="text-xs italic text-gray-500 mt-1">
                        Availability is managed when assigned to a shift.
                    </p>
                </div>
                <div>
                    <label className="block text-sm font-medium">Is Active</label>
                    <select {...register('isActive')} className="w-full p-2 border rounded">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </div>
                <button type="submit" className="bg-[#43af52] text-white px-4 py-2 rounded cursor-pointer">
                    Save
                </button>
            </form>
        </div>
    );
};
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function EmployeeForm({ onSubmit, initialValues = {} }) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            firstName: '',
            middleName: '',
            lastName: '',
            role: '',
            phoneNumber: '',
            email: '',
            address: '',
            ...initialValues,
        },
    });

    // Reset form when initialValues change (e.g., editing a new employee)
    useEffect(() => {
        reset({
            firstName: '',
            middleName: '',
            lastName: '',
            role: '',
            phoneNumber: '',
            email: '',
            address: '',
            ...initialValues,
        });
    }, [initialValues, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md text-gray-800 space-y-4"
        >
            <div>
                <label className="block text-sm font-medium">First Name</label>
                <input {...register('firstName')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Middle Name</label>
                <input {...register('middleName')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input {...register('lastName')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Role</label>
                <input {...register('role')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input {...register('phoneNumber')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input {...register('email')} type="email" className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Address</label>
                <textarea {...register('address')} className="w-full p-2 border rounded" />
            </div>

            <button type="submit" className="bg-[#43af52] text-white px-4 py-2 rounded cursor-pointer">
                Save
            </button>
        </form>
    );
};
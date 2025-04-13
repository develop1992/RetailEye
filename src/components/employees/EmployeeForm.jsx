import { useForm } from 'react-hook-form';

export default function EmployeeForm({ onSubmit, defaultValues = {} }) {
    const { register, handleSubmit, reset } = useForm({
        defaultValues,
    });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md text-gray-800 space-y-4"
        >
            <div>
                <label className="block text-sm font-medium">First Name</label>
                <input {...register('first_name')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Middle Name</label>
                <input {...register('middle_name')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Last Name</label>
                <input {...register('last_name')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Role</label>
                <input {...register('role')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Phone Number</label>
                <input {...register('phone_number')} className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Email</label>
                <input {...register('email')} type="email" className="w-full p-2 border rounded" />
            </div>
            <div>
                <label className="block text-sm font-medium">Address</label>
                <textarea {...register('address')} className="w-full p-2 border rounded" />
            </div>

            <button type="submit" className="bg-[#43af52] text-white px-4 py-2 rounded">
                Save
            </button>
        </form>
    );
}
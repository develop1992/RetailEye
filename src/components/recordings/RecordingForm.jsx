import { useForm } from 'react-hook-form';

export default function RecordingForm({ onSubmit }) {
    const { register, handleSubmit } = useForm();

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-6 rounded-lg shadow-md text-gray-800 space-y-4"
        >
            <div>
                <label className="block text-sm font-medium">Upload Recording</label>
                <input
                    {...register('recording_file', { required: true })}
                    type="file"
                    accept="video/*"
                    className="w-full p-2 border rounded"
                />
            </div>
            <button type="submit" className="bg-[#43af52] text-white px-4 py-2 rounded">
                Upload
            </button>
        </form>
    );
}
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { LoadingIndicator } from '@/components';

export default function RecordingForm({ onSubmit }) {
    const { register, handleSubmit } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = async (data) => {
        setIsLoading(true);
        try {
            await onSubmit(data);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to upload recording.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingIndicator message="Analyzing recording..." />}
            <form
                onSubmit={handleSubmit(handleUpload)}
                className="bg-white p-6 rounded-lg shadow-md text-gray-800 space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium">Upload Recording</label>
                    <input
                        {...register('recording_file', { required: true })}
                        type="file"
                        accept="video/*,audio/*"
                        className="w-full p-2 border rounded"
                    />
                </div>
                <button type="submit" className="bg-[#43af52] text-white px-4 py-2 rounded cursor-pointer">
                    Upload
                </button>
            </form>
        </>
    );
}
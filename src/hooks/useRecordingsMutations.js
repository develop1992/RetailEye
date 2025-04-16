import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecording, deleteRecording } from '../api/recordings';

export const useCreateRecording = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRecording,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recordings'] });
        },
    });
};

export const useDeleteRecording = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRecording,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recordings'] });
        },
    });
};
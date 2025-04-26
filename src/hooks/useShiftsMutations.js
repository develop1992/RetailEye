import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShift, updateShift, deleteShift } from '@/api/shifts';

export const useCreateShift = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createShift,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['shifts'] });
        },
    });
};

export const useUpdateShift = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateShift,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['shifts'] });
        },
    });
};

export const useDeleteShift = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteShift,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['shifts'] });
        },
    });
};
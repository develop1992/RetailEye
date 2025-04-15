import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBodyCamera, deleteBodyCamera } from '../api/bodyCameras';

export const useUpdateBodyCamera = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateBodyCamera,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['body-cameras'] });
        },
    });
};

export const useDeleteBodyCamera = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBodyCamera,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['body-cameras'] });
        },
    });
};
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createIncident, updateIncident, deleteIncident, deleteAllIncidents } from '@/api/incidents';

export const useCreateIncident = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createIncident,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incidents'] });
        },
    });
};

export const useUpdateIncident = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateIncident,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incidents'] });
        },
    });
};

export const useDeleteIncident = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteIncident,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['incidents'] });
        },
    });
};

export const useDeleteAllIncidents = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAllIncidents,
        onSuccess: () => {
            queryClient.invalidateQueries(['incidents']);
        },
    });
};
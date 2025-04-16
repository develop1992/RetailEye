import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createEmployee, updateEmployee, deleteEmployee } from '../api/employees';

export const useCreateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });
};

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });
};

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        },
    });
};
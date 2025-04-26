import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    createEmployeeShift,
    deleteMyEmployeeShift,
    assignCameraToShift,
    deleteMyEmployeeShiftCamera
} from '@/api/employeeShifts';

export const useCreateEmployeeShift = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEmployeeShift,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees-shifts'] });
        },
    });
};

export function useDeleteMyEmployeeShift() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteMyEmployeeShift,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees-shifts'] });
        },
    });
}

export const useAssignCameraToShift = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: assignCameraToShift,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees-shifts-cameras'] });
        },
    });
};

export function useDeleteMyEmployeeShiftCamera() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteMyEmployeeShiftCamera,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees-shifts-cameras'] });
        },
    });
}
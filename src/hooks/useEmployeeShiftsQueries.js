import { useQuery } from '@tanstack/react-query';
import {
    fetchMyEmployeeShift,
    fetchMyEmployeeShiftCamera,
} from '../api/employeeShifts';

export const useMyEmployeeShift = (userId) =>
    useQuery({
        queryKey: ['employees-shifts', userId],
        queryFn: () => fetchMyEmployeeShift(userId)
    });

export const useMyEmployeeShiftCamera = (userId) =>
    useQuery({
        queryKey: ['employees-shifts-cameras', userId],
        queryFn: () => fetchMyEmployeeShiftCamera(userId)
    });

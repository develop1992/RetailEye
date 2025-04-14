import { useQuery } from '@tanstack/react-query';
import {
    fetchEmployees,
    fetchShifts,
    fetchBodyCameras,
    fetchRecordings,
    fetchIncidents
} from '../api/retaileyeApi';

export const useEmployees = () =>
    useQuery({ queryKey: ['employees'], queryFn: fetchEmployees });

export const useShifts = () =>
    useQuery({ queryKey: ['shifts'], queryFn: fetchShifts });

export const useBodyCameras = () =>
    useQuery({ queryKey: ['body-cameras'], queryFn: fetchBodyCameras });

export const useRecordings = () =>
    useQuery({ queryKey: ['recordings'], queryFn: fetchRecordings });

export const useIncidents = () =>
    useQuery({ queryKey: ['incidents'], queryFn: fetchIncidents });
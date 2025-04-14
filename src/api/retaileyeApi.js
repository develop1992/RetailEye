const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/retaileye';

export const fetchEmployees = async () => {
    const res = await fetch(`${BASE_URL}/employees`);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
};

export const fetchShifts = async () => {
    const res = await fetch(`${BASE_URL}/shifts`);
    if (!res.ok) throw new Error('Failed to fetch shifts');
    return res.json();
};

export const fetchBodyCameras = async () => {
    const res = await fetch(`${BASE_URL}/body-cameras`);
    if (!res.ok) throw new Error('Failed to fetch body cameras');
    return res.json();
};

export const fetchRecordings = async () => {
    const res = await fetch(`${BASE_URL}/recordings`);
    if (!res.ok) throw new Error('Failed to fetch recordings');
    return res.json();
};

export const fetchIncidents = async () => {
    const res = await fetch(`${BASE_URL}/incidents`);
    if (!res.ok) throw new Error('Failed to fetch incidents');
    return res.json();
};
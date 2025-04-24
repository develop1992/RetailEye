import { BASE_URL } from './base';

const EMPLOYEES_SHIFTS_URL = BASE_URL + "/employees-shifts";
const EMPLOYEES_SHIFTS_CAMERAS_URL = BASE_URL + "/employees-shifts-cameras";

export const fetchMyEmployeeShift = async (id) => {
    const res = await fetch(`${EMPLOYEES_SHIFTS_URL}/employee/${id}`);
    if (!res.ok) throw new Error('Failed to fetch employee shift');
    return res.json();
};

export const createEmployeeShift = async (payload) => {
    const res = await fetch(EMPLOYEES_SHIFTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create shift');
    return res.json();
};

export const deleteMyEmployeeShift = async (id) => {
    const res = await fetch(`${EMPLOYEES_SHIFTS_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete employee shift');
    }

    return true;
};

export const fetchMyEmployeeShiftCamera = async (id) => {
    const res = await fetch(`${EMPLOYEES_SHIFTS_CAMERAS_URL}/employee/${id}`);
    if (!res.ok) throw new Error('Failed to fetch employee shift camera');
    return res.json();
};

export const assignCameraToShift = async (payload) => {
    const res = await fetch(EMPLOYEES_SHIFTS_CAMERAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to assign camera');
    return res.json();
};

export const deleteMyEmployeeShiftCamera = async (id) => {
    const res = await fetch(`${EMPLOYEES_SHIFTS_CAMERAS_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete employee shift camera');
    }

    return true;
};
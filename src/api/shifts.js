import { BASE_URL } from './base';

const SHIFTS_URL = BASE_URL + "/shifts";

export const fetchShifts = async () => {
    const res = await fetch(SHIFTS_URL);
    if (!res.ok) throw new Error('Failed to fetch shifts');
    return res.json();
};

export const createShift = async (shift) => {
    const res = await fetch(SHIFTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shift),
    });

    if (!res.ok) {
        throw new Error('Failed to create shift');
    }

    return res.json();
};

export const updateShift = async (shift) => {
    const res = await fetch(`${SHIFTS_URL}/${shift.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shift),
    });

    if (!res.ok) {
        throw new Error('Failed to update shift');
    }

    return res.json();
};

export const deleteShift = async (id) => {
    const res = await fetch(`${SHIFTS_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete shift');
    }

    return true;
};
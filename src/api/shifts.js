import { BASE_URL } from './base';

export const fetchShifts = async () => {
    const res = await fetch(`${BASE_URL}/shifts`);
    if (!res.ok) throw new Error('Failed to fetch shifts');
    return res.json();
};
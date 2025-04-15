import { BASE_URL } from './base';

export const fetchIncidents = async () => {
    const res = await fetch(`${BASE_URL}/incidents`);
    if (!res.ok) throw new Error('Failed to fetch incidents');
    return res.json();
};
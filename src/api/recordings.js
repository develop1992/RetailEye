import { BASE_URL } from './base';

export const fetchRecordings = async () => {
    const res = await fetch(`${BASE_URL}/recordings`);
    if (!res.ok) throw new Error('Failed to fetch recordings');
    return res.json();
};
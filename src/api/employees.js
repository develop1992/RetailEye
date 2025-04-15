import { BASE_URL } from './base';

export const fetchEmployees = async () => {
    const res = await fetch(`${BASE_URL}/employees`);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
};
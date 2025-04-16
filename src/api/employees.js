import { BASE_URL } from './base';

const EMPLOYEES_URL = BASE_URL + "/employees";

export const fetchEmployees = async () => {
    const res = await fetch(EMPLOYEES_URL);
    if (!res.ok) throw new Error('Failed to fetch employees');
    return res.json();
};

export const createEmployee = async (employee) => {
    const res = await fetch(EMPLOYEES_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
    });

    if (!res.ok) {
        throw new Error('Failed to create employee');
    }

    return res.json();
};

export const updateEmployee = async (employee) => {
    const res = await fetch(`${EMPLOYEES_URL}/${employee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
    });

    if (!res.ok) {
        throw new Error('Failed to update employee');
    }

    return res.json();
};

export const deleteEmployee = async (id) => {
    const res = await fetch(`${EMPLOYEES_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete employee');
    }

    return true;
};

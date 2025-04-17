import { BASE_URL } from './base';

const INCIDENTS_URL = BASE_URL + "/incidents";

export const fetchIncidents = async () => {
    const res = await fetch(INCIDENTS_URL);
    if (!res.ok) throw new Error('Failed to fetch incidents');
    return res.json();
};

export const createIncident = async (incident) => {
    const res = await fetch(INCIDENTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incident),
    });

    if (!res.ok) {
        throw new Error('Failed to create incident');
    }

    return res.json();
};

export const updateIncident = async (incident) => {
    const res = await fetch(`${INCIDENTS_URL}/${incident.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incident),
    });

    if (!res.ok) {
        throw new Error('Failed to update incident');
    }

    return res.json();
};

export const deleteIncident = async (id) => {
    const res = await fetch(`${INCIDENTS_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete incident');
    }

    return true;
};

export const deleteAllIncidents = async () => {
    const res = await fetch(`${INCIDENTS_URL}/all`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete all incidents');
    }

    return true;
};
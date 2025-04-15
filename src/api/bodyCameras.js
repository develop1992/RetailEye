import { BASE_URL } from './base';

export const fetchBodyCameras = async () => {
    const res = await fetch(`${BASE_URL}/body-cameras`);
    if (!res.ok) throw new Error('Failed to fetch body cameras');
    return res.json();
};

export const updateBodyCamera = async (camera) => {
    const res = await fetch(`${BASE_URL}/body-cameras/${camera.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(camera),
    });

    if (!res.ok) {
        throw new Error('Failed to update body camera');
    }

    return res.json();
};

export const deleteBodyCamera = async (id) => {
    const res = await fetch(`${BASE_URL}/body-cameras/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete body camera');
    }

    return true; // no content expected
};
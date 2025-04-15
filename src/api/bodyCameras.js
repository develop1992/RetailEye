import { BASE_URL } from './base';

const BODY_CAMERAS_URL = BASE_URL + "/body-cameras";

export const fetchBodyCameras = async () => {
    const res = await fetch(BODY_CAMERAS_URL);
    if (!res.ok) throw new Error('Failed to fetch body cameras');
    return res.json();
};

export const createBodyCamera = async (camera) => {
    const res = await fetch(BODY_CAMERAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(camera),
    });

    if (!res.ok) {
        throw new Error('Failed to create body camera');
    }

    return res.json();
};

export const updateBodyCamera = async (camera) => {
    const res = await fetch(`${BODY_CAMERAS_URL}/${camera.id}`, {
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
    const res = await fetch(`${BODY_CAMERAS_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete body camera');
    }

    return true; // no content expected
};
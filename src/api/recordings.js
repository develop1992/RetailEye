import { BASE_URL } from './base';

const RECORDINGS_URL = BASE_URL + "/recordings";

export const getRecordingStreamUrl = (id) =>
    `${RECORDINGS_URL}/view/${id}`;

export const fetchRecordings = async () => {
    const res = await fetch(RECORDINGS_URL);
    if (!res.ok) throw new Error('Failed to fetch recordings');
    return res.json();
};

export const createRecording = async (recording) => {
    const res = await fetch(RECORDINGS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recording),
    });

    if (!res.ok) {
        throw new Error('Failed to create recording');
    }

    return res.json();
};

export const uploadRecording = async (formData) => {
    const res = await fetch('http://localhost:8080/retaileye/recordings/upload', {
        method: 'POST',
        body: formData,
    });

    if (!res.ok) {
        throw new Error('Failed to upload recording');
    }

    return res.json();
};

export const deleteRecording = async (id) => {
    const res = await fetch(`${RECORDINGS_URL}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        throw new Error('Failed to delete recording');
    }

    return true;
};
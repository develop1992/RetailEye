import React, { useState } from 'react';
import { RecordingForm, GenericTable } from '../components';
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import {FaEye, FaTrash} from 'react-icons/fa';

const initialRecordings = [
    {
        id: 1,
        file_name: 'Security Shift - Morning',
        start_time: '2025-04-13T08:00:00',
        end_time: '2025-04-13T16:00:00',
    },
    {
        id: 2,
        file_name: 'Security Shift - Evening',
        start_time: '2025-04-12T16:00:00',
        end_time: '2025-04-13T00:00:00',
    },
    {
        id: 3,
        file_name: 'Security Shift - Overnight',
        start_time: '2025-04-12T00:00:00',
        end_time: '2025-04-12T08:00:00',
    },
];

const columnHelper = createColumnHelper();

export default function Recordings() {
    const [recordings, setRecordings] = useState(initialRecordings);
    const [showForm, setShowForm] = useState(false);

    const handleUpload = (data) => {
        const uploadedFile = data.recording_file[0];
        const newRecording = {
            id: recordings.length + 1,
            type: uploadedFile.name,
            start_time: new Date().toISOString(),
            end_time: new Date().toISOString(),
        };

        setRecordings(prev => [...prev, newRecording]);
        setShowForm(false);
    };

    const handleDelete = (rec) => {
        setRecordings(prev => prev.filter(r => r.id !== rec.id));
    };

    const columns = [
        columnHelper.accessor('file_name', { header: 'File Name' }),
        columnHelper.accessor('start_time', {
            header: 'Start Time',
            cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
        }),
        columnHelper.accessor('end_time', {
            header: 'End Time',
            cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-3">
                    <button onClick={() => alert('Playing recording...')} className="text-blue-600 hover:text-blue-800"><FaEye /></button>
                    <button onClick={() => {
                        if (confirm('Are you sure you want to delete this recording?')) {
                            handleDelete(row.original);
                        }
                    }} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </div>
            ),
        }),
    ];

    const table = useReactTable({
        data: recordings,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#f5a944]">Recordings</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#f5a944] text-white px-4 py-2 rounded shadow hover:bg-[#e0912d]"
                >
                    + Upload Recording
                </button>
            </div>

            <GenericTable table={table} />

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Add New Recording</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
                        </div>
                        <RecordingForm onSubmit={handleUpload} />
                    </div>
                </div>
            )}
        </div>
    );
}
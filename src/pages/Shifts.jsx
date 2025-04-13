import React, { useState } from 'react';
import { ShiftForm, GenericTable } from '../components';
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';

const initialShifts = [
    { id: 1, type: 'Morning', start_time: '08:00', end_time: '16:00', is_available: 'true' },
    { id: 2, type: 'Evening', start_time: '16:00', end_time: '00:00', is_available: 'false' },
    { id: 3, type: 'Night', start_time: '00:00', end_time: '08:00', is_available: 'true' },
];

const columnHelper = createColumnHelper();

export default function Shifts() {
    const [shifts, setShifts] = useState(initialShifts);
    const [showForm, setShowForm] = useState(false);

    const handleCreate = (newShift) => {
        setShifts(prev => [
            ...prev,
            { ...newShift, id: prev.length + 1 }
        ]);
        setShowForm(false);
    };

    const handleDelete = (shift) => {
        setShifts(prev => prev.filter(s => s.id !== shift.id));
    };

    const columns = [
        columnHelper.accessor('type', { header: 'Type' }),
        columnHelper.accessor('start_time', { header: 'Start Time' }),
        columnHelper.accessor('end_time', { header: 'End Time' }),
        columnHelper.accessor('is_available', {
            header: 'Available?',
            cell: ({ getValue }) =>
                getValue() === 'true' ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                    <span className="text-red-600 font-semibold">No</span>
                ),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-4">
                    <button onClick={() => console.log('Edit:', row.original)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.original)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </div>
            )
        }),
    ];

    const table = useReactTable({
        data: shifts,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#f5a944]">Shifts</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#f5a944] text-white px-4 py-2 rounded shadow hover:bg-[#e0912d]"
                >
                    + Create Shift
                </button>
            </div>

            <GenericTable table={table} />

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Add New Shift</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
                        </div>
                        <ShiftForm onSubmit={handleCreate} />
                    </div>
                </div>
            )}
        </div>
    );
}
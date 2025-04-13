import React, { useState } from 'react';
import { IncidentForm, GenericTable } from '../components';
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';

const initialIncidents = [
    {
        id: crypto.randomUUID(),
        occurrenceTime: '2025-04-13T08:30:00',
        severity: 'High',
        description: 'Unauthorized access to restricted area.',
        status: 'Open',
    },
    {
        id: crypto.randomUUID(),
        occurrenceTime: '2025-04-12T17:15:00',
        severity: 'Medium',
        description: 'Camera offline for 10 minutes.',
        status: 'Resolved',
    },
    {
        id: crypto.randomUUID(),
        occurrenceTime: '2025-04-11T22:00:00',
        severity: 'Low',
        description: 'Employee reported suspicious behavior.',
        status: 'Investigating',
    },
];

const columnHelper = createColumnHelper();

export default function Incidents() {
    const [incidents, setIncidents] = useState(initialIncidents);
    const [showForm, setShowForm] = useState(false);
    const [editIncident, setEditIncident] = useState(null);

    const handleSave = (data) => {
        if (editIncident) {
            setIncidents(prev =>
                prev.map(i =>
                    i.id === editIncident.id ? { ...i, ...data } : i
                )
            );
        } else {
            setIncidents(prev => [...prev, { ...data, id: crypto.randomUUID() }]);
        }
        setShowForm(false);
        setEditIncident(null);
    };

    const handleEdit = (incident) => {
        setEditIncident(incident);
        setShowForm(true);
    };

    const handleDelete = (incident) => {
        setIncidents(prev => prev.filter(i => i.id !== incident.id));
    };

    const columns = [
        columnHelper.accessor('occurrenceTime', {
            header: 'Time',
            cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
        }),
        columnHelper.accessor('severity', { header: 'Severity' }),
        columnHelper.accessor('status', { header: 'Status' }),
        columnHelper.accessor('description', { header: 'Description' }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-3">
                    <button
                        onClick={() => handleEdit(row.original)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
        }),
    ];

    const table = useReactTable({
        data: incidents,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#f5a944]">Incidents</h1>
                <button
                    onClick={() => {
                        setEditIncident(null);
                        setShowForm(true);
                    }}
                    className="bg-[#f5a944] text-white px-4 py-2 rounded shadow hover:bg-[#e0912d]"
                >
                    + Add Incident
                </button>
            </div>

            <GenericTable table={table} />

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {editIncident ? 'Edit Incident' : 'Add New Incident'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setEditIncident(null);
                                }}
                                className="text-gray-500 hover:text-gray-800 text-xl font-bold"
                            >
                                &times;
                            </button>
                        </div>
                        <IncidentForm onSubmit={handleSave} defaultValues={editIncident || {}} />
                    </div>
                </div>
            )}
        </div>
    );
}
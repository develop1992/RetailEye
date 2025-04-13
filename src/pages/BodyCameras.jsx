import React, { useState } from 'react';
import { BodyCameraForm, GenericTable } from '../components';
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import { FaTrash, FaEdit } from 'react-icons/fa';

const initialBodyCameras = [
    {
        id: crypto.randomUUID(),
        serialNumber: 'BC-001',
        model: 'Axon Flex 2',
        manufacturer: 'Axon',
        isAvailable: true,
        isActive: true,
    },
    {
        id: crypto.randomUUID(),
        serialNumber: 'BC-002',
        model: 'BodyCam X1',
        manufacturer: 'Reveal Media',
        isAvailable: false,
        isActive: true,
    },
    {
        id: crypto.randomUUID(),
        serialNumber: 'BC-003',
        model: 'Wolfcom Vision',
        manufacturer: 'Wolfcom',
        isAvailable: true,
        isActive: false,
    },
];

const columnHelper = createColumnHelper();

export default function BodyCameras() {
    const [cameras, setCameras] = useState(initialBodyCameras);
    const [showForm, setShowForm] = useState(false);

    const handleCreate = (data) => {
        setCameras(prev => [
            ...prev,
            {
                ...data,
                id: crypto.randomUUID(),
                isAvailable: data.isAvailable === 'true',
                isActive: data.isActive === 'true',
            }
        ]);
        setShowForm(false);
    };

    const handleDelete = (cam) => {
        setCameras(prev => prev.filter(c => c.id !== cam.id));
    };

    const handleEdit = (emp) => {
        console.log('Edit:', emp);
    };

    const columns = [
        columnHelper.accessor('serialNumber', { header: 'Serial Number' }),
        columnHelper.accessor('model', { header: 'Model' }),
        columnHelper.accessor('manufacturer', { header: 'Manufacturer' }),
        columnHelper.accessor('isAvailable', {
            header: 'Available?',
            cell: ({ getValue }) =>
                getValue() ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                    <span className="text-red-600 font-semibold">No</span>
                ),
        }),
        columnHelper.accessor('isActive', {
            header: 'Active?',
            cell: ({ getValue }) =>
                getValue() ? (
                    <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                    <span className="text-red-600 font-semibold">No</span>
                ),
        }),
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
            )
        }),
    ];

    const table = useReactTable({
        data: cameras,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#f5a944]">Body Cameras</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#f5a944] text-white px-4 py-2 rounded shadow hover:bg-[#e0912d]"
                >
                    + Add Body Camera
                </button>
            </div>

            <GenericTable table={table} />

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Add New Body Camera</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
                        </div>
                        <BodyCameraForm onSubmit={handleCreate} />
                    </div>
                </div>
            )}
        </div>
    );
}
import React, { useState } from 'react';
import { BodyCameraForm, GenericTable, LoadingIndicator, ErrorMessage, ConfirmDialog } from '../../components';
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import { FaTrash, FaEdit } from 'react-icons/fa';
import useBodyCameras from '../../hooks/useBodyCamerasQueries';
import {
    useCreateBodyCamera,
    useUpdateBodyCamera,
    useDeleteBodyCamera
} from "../../hooks/useBodyCamerasMutations";

const columnHelper = createColumnHelper();

export default function BodyCameras() {
    const { data: cameras = [], isLoading, isError, error } = useBodyCameras();
    const createCameraMutation = useCreateBodyCamera();
    const updateCameraMutation = useUpdateBodyCamera();
    const deleteCameraMutation = useDeleteBodyCamera();

    const [showForm, setShowForm] = useState(false);
    const [editingCamera, setEditingCamera] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [cameraToDelete, setCameraToDelete] = useState(null);

    const handleEdit = (cam) => {
        setEditingCamera(cam);
        setShowForm(true);
    };

    const handleDelete = (camera) => {
        setCameraToDelete(camera);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (cameraToDelete) {
            deleteCameraMutation.mutate(cameraToDelete.id, {
                onSuccess: () => {
                    setConfirmOpen(false);
                    setCameraToDelete(null);
                },
                onError: (err) => {
                    console.error('Delete failed:', err);
                    alert('Failed to delete body camera.');
                    setConfirmOpen(false);
                }
            });
        }
    };

    const handleSubmit = (data) => {
        if (editingCamera) {
            const updated = {
                ...editingCamera,
                ...data,
                isAvailable: data.isAvailable !== undefined
                    ? data.isAvailable === 'true'
                    : editingCamera?.isAvailable ?? true,
                isActive: data.isActive === 'true',
            };

            updateCameraMutation.mutate(updated, {
                onSuccess: () => {
                    setShowForm(false);
                    setEditingCamera(null);
                },
                onError: (error) => {
                    console.error('Update failed:', error);
                    alert('Failed to update body camera');
                },
            });
        } else {
            const newCamera = {
                ...data,
                isAvailable: data.isAvailable === 'true',
                isActive: data.isActive === 'true',
            };

            createCameraMutation.mutate(newCamera, {
                onSuccess: () => {
                    setShowForm(false);
                },
                onError: (error) => {
                    console.error('Create failed:', error);
                    alert('Failed to create body camera');
                },
            });
        }
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
            cell: ({ row }) => {
                const camera = row.original;

                if (!camera.isAvailable) {
                    return <span className="text-sm text-gray-400 italic">In Use</span>;
                }

                return (
                    <div className="flex space-x-3">
                        <button
                            onClick={() => handleEdit(camera)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            title="Edit"
                        >
                            <FaEdit />
                        </button>
                        <button
                            onClick={() => handleDelete(camera)}
                            className="text-red-600 hover:text-red-800 cursor-pointer"
                            title="Delete"
                        >
                            <FaTrash />
                        </button>
                    </div>
                );
            }
        }),
    ];

    const table = useReactTable({
        data: cameras,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <LoadingIndicator message="Loading body cameras..." />;
    if (isError) {
        return (
            <div className="mt-10">
                <ErrorMessage
                    message="Failed to load body cameras."
                    details={error?.message}
                />
            </div>
        );
    }

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#f5a944]">Body Cameras</h1>
                <button
                    onClick={() => {
                        setEditingCamera(null);
                        setShowForm(true);
                    }}
                    className="bg-[#43af52] text-white px-4 py-2 rounded shadow hover:bg-[#43af52] cursor-pointer"
                >
                    + Add Body Camera
                </button>
            </div>

            <GenericTable table={table} />

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {editingCamera ? 'Edit Body Camera' : 'Add New Body Camera'}
                            </h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-800 text-xl font-bold cursor-pointer">&times;</button>
                        </div>
                        <BodyCameraForm
                            onSubmit={handleSubmit}
                            initialValues={editingCamera}
                        />
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={confirmOpen}
                title="Delete Body Camera"
                message={
                    cameraToDelete
                        ? `Are you sure you want to delete camera "${cameraToDelete.serialNumber}"? This action cannot be undone.`
                        : ''
                }
                onConfirm={confirmDelete}
                onCancel={() => {
                    setConfirmOpen(false);
                    setCameraToDelete(null);
                }}
            />
        </div>
    );
}
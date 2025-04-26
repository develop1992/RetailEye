import React, { useState } from 'react';
import { IncidentForm, GenericTable, LoadingIndicator, ErrorMessage, ConfirmDialog } from '@/components';
import {
    useReactTable,
    getPaginationRowModel,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useIncidents from '@/hooks/useIncidentsQueries';
import { useCreateIncident, useUpdateIncident, useDeleteIncident, useDeleteAllIncidents } from '@/hooks/useIncidentsMutations';

const columnHelper = createColumnHelper();

export default function Incidents() {
    const { data: incidents = [], isLoading, isError, error } = useIncidents();
    const createIncidentMutation = useCreateIncident();
    const updateIncidentMutation = useUpdateIncident();
    const deleteIncidentMutation = useDeleteIncident();
    const deleteAllIncidentsMutation = useDeleteAllIncidents();

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10); // Show 10 incidents per page

    const [showForm, setShowForm] = useState(false);
    const [editIncident, setEditIncident] = useState(null);

    const [incidentToDelete, setIncidentToDelete] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deleteAllOpen, setDeleteAllOpen] = useState(false);

    const handleSubmit = (data) => {
        if (editIncident) {
            // Edit (already handled)
            const updated = { ...editIncident, ...data };
            updateIncidentMutation.mutate(updated, {
                onSuccess: () => {
                    setShowForm(false);
                    setEditIncident(null);
                },
                onError: (err) => {
                    console.error('Update failed:', err);
                    alert('Failed to update incident.');
                },
            });
        } else {
            // Create
            createIncidentMutation.mutate(data, {
                onSuccess: () => {
                    setShowForm(false);
                },
                onError: (err) => {
                    console.error('Create failed:', err);
                    alert('Failed to create incident.');
                },
            });
        }
    };

    const handleDelete = (incident) => {
        setIncidentToDelete(incident);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (!incidentToDelete) return;

        deleteIncidentMutation.mutate(incidentToDelete.id, {
            onSuccess: () => {
                setConfirmOpen(false);
                setIncidentToDelete(null);
            },
            onError: (err) => {
                console.error('Delete failed:', err);
                alert('Failed to delete incident.');
                setConfirmOpen(false);
            },
        });
    };

    const handleDeleteAll = () => {
        deleteAllIncidentsMutation.mutate(undefined, {
            onSuccess: () => {
                setDeleteAllOpen(false);
            },
            onError: (err) => {
                console.error('Delete All failed:', err);
                alert('Failed to delete all incidents.');
                setDeleteAllOpen(false);
            }
        });
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
                        onClick={() => {
                            setEditIncident(row.original);
                            setShowForm(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="Edit"
                    >
                        <FaEdit />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
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
        getPaginationRowModel: getPaginationRowModel(), // ✅ enables client-side pagination
        state: {
            pagination: {
                pageIndex,
                pageSize,
            },
        },
        onPaginationChange: updater => {
            const next = typeof updater === 'function' ? updater({ pageIndex, pageSize }) : updater;
            setPageIndex(next.pageIndex ?? 0);
            setPageSize(next.pageSize ?? 10);
        },
    });

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-[#f5a944]">Incidents</h1>
                <div className="flex gap-3">
                    <button
                        onClick={() => {
                            setEditIncident(null);
                            setShowForm(true);
                        }}
                        className="bg-[#43af52] text-white px-4 py-2 rounded shadow hover:bg-[#43af52] cursor-pointer"
                    >
                        + Add Incident
                    </button>

                    <button
                        onClick={() => setDeleteAllOpen(true)}
                        className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 cursor-pointer"
                    >
                        Delete All
                    </button>
                </div>
            </div>

            {isLoading ? (
                <LoadingIndicator message="Loading incidents..." />
            ) : isError ? (
                <div className="mt-10">
                    <ErrorMessage message="Failed to load incidents" details={error?.message} />
                </div>
            ) : (
                <>
                    <GenericTable table={table} rows={table.getRowModel().rows} />

                    <div className="mt-6 flex justify-between items-center">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50 cursor-pointer"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </button>

                        <span>
                            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </span>

                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50 cursor-pointer"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {editIncident ? 'Edit Incident' : 'Add New Incident'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setEditIncident(null);
                                }}
                                className="text-gray-500 hover:text-gray-800 text-xl font-bold cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                        <IncidentForm
                            onSubmit={handleSubmit}
                            defaultValues={editIncident || {}}
                        />
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={confirmOpen}
                title="Delete Incident"
                message={
                    incidentToDelete
                        ? `Are you sure you want to delete the incident: "${incidentToDelete.description}"?`
                        : ''
                }
                onConfirm={confirmDelete}
                onCancel={() => {
                    setConfirmOpen(false);
                    setIncidentToDelete(null);
                }}
            />

            <ConfirmDialog
                open={deleteAllOpen}
                title="Delete All Incidents"
                message="Are you sure you want to delete ALL incidents? This action cannot be undone."
                onConfirm={() => {
                    deleteAllIncidentsMutation.mutate(undefined, {
                        onSuccess: () => {
                            setDeleteAllOpen(false);
                        },
                        onError: (err) => {
                            console.error('Delete All failed:', err);
                            alert('Failed to delete all incidents.');
                            setDeleteAllOpen(false);
                        }
                    });
                }}
                onCancel={() => setDeleteAllOpen(false)}
            />

        </div>
    );
};
import React, { useState } from 'react';
import { IncidentForm, GenericTable, LoadingIndicator, ErrorMessage, ConfirmDialog } from '../../components';
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useIncidents from '../../hooks/useIncidentsQueries';
import { useCreateIncident, useUpdateIncident, useDeleteIncident } from '../../hooks/useIncidentsMutations';

const columnHelper = createColumnHelper();

export default function Incidents() {
    const { data: incidents = [], isLoading, isError, error } = useIncidents();
    const createIncidentMutation = useCreateIncident();
    const updateIncidentMutation = useUpdateIncident();
    const deleteIncidentMutation = useDeleteIncident();

    const [showForm, setShowForm] = useState(false);
    const [editIncident, setEditIncident] = useState(null);

    const [incidentToDelete, setIncidentToDelete] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);

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
                    className="bg-[#43af52] text-white px-4 py-2 rounded shadow hover:bg-[#43af52] cursor-pointer"
                >
                    + Add Incident
                </button>
            </div>

            {isLoading ? (
                <LoadingIndicator message="Loading incidents..." />
            ) : isError ? (
                <ErrorMessage message="Failed to load incidents" details={error?.message} />
            ) : (
                <GenericTable table={table} />
            )}

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

        </div>
    );
};
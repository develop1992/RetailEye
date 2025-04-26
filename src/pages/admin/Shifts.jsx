import React, { useState } from 'react';
import { ShiftForm, GenericTable, LoadingIndicator, ErrorMessage, ConfirmDialog } from '@/components/index';
import {
    useReactTable,
    getPaginationRowModel,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useShifts from '@/hooks/useShiftsQueries';
import { useCreateShift, useUpdateShift, useDeleteShift } from '@/hooks/useShiftsMutations';

const columnHelper = createColumnHelper();

export default function Shifts() {
    const { data: shifts = [], isLoading, isError, error } = useShifts();
    const createShiftMutation = useCreateShift();
    const updateShiftMutation = useUpdateShift();
    const deleteShiftMutation = useDeleteShift();

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [editingShift, setEditingShift] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [shiftToDelete, setShiftToDelete] = useState(null);

    const handleEdit = (shift) => {
        setEditingShift(shift);
        setShowForm(true);
    };

    const handleSubmit = (data) => {
        if (editingShift) {
            const updated = {
                ...editingShift,
                ...data,
                isAvailable: data.isAvailable !== undefined
                    ? data.isAvailable === 'true'
                    : editingShift?.isAvailable ?? true,
            };

            updateShiftMutation.mutate(updated, {
                onSuccess: () => {
                    setShowForm(false);
                    setEditingShift(null);
                },
                onError: (err) => {
                    console.error('Update failed:', err);
                    alert('Failed to update shift');
                },
            });
        } else {
            createShiftMutation.mutate(
                {
                    ...data,
                    isAvailable: data.isAvailable === 'true',
                },
                {
                    onSuccess: () => {
                        setShowForm(false);
                    },
                    onError: (err) => {
                        console.error('Create failed:', err);
                        alert('Failed to create shift');
                    },
                }
            );
            setShowForm(false);
        }
    };

    const handleDelete = (shift) => {
        setShiftToDelete(shift);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (shiftToDelete) {
            deleteShiftMutation.mutate(shiftToDelete.id, {
                onSuccess: () => {
                    setConfirmOpen(false);
                    setShiftToDelete(null);
                },
                onError: (err) => {
                    console.error('Delete failed:', err);
                    alert('Failed to delete shift.');
                    setConfirmOpen(false);
                },
            });
        }
    };

    const columns = [
        columnHelper.accessor('type', { header: 'Type' }),
        columnHelper.accessor('startTime', { header: 'Start Time' }),
        columnHelper.accessor('endTime', { header: 'End Time' }),
        columnHelper.accessor('isAvailable', {
            header: 'Available?',
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
                <div className="flex space-x-4">
                    <button onClick={() => handleEdit(row.original)} className="text-blue-600 hover:text-blue-800 cursor-pointer"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.original)} className="text-red-600 hover:text-red-800 cursor-pointer"><FaTrash /></button>
                </div>
            ),
        }),
    ];

    const table = useReactTable({
        data: shifts,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-[#f5a944]">Shifts</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#43af52] text-white px-4 py-2 rounded shadow hover:bg-[#43af52] cursor-pointer"
                >
                    + Create Shift
                </button>
            </div>

            { isLoading ? (
                <LoadingIndicator message="Loading shifts..." />
                ) : isError ? (
                <div className="mt-10">
                    <ErrorMessage message="Failed to load shifts" details={error?.message} />
                </div>
            ) :
            (
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
                                {editingShift ? 'Edit Shift' : 'Add New Shift'}
                            </h2>
                            <button onClick={() => {
                                setShowForm(false);
                                setEditingShift(null);
                            }} className="text-gray-500 hover:text-gray-800 text-xl font-bold cursor-pointer">&times;</button>
                        </div>
                        <ShiftForm onSubmit={handleSubmit} initialValues={editingShift} />
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={confirmOpen}
                title="Delete Shift"
                message={
                    shiftToDelete
                        ? `Are you sure you want to delete the "${shiftToDelete.type}" shift?`
                        : ''
                }
                onConfirm={confirmDelete}
                onCancel={() => {
                    setConfirmOpen(false);
                    setShiftToDelete(null);
                }}
            />

        </div>
    );
};
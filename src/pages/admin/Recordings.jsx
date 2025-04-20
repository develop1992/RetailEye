import React, { useState } from 'react';
import { RecordingForm, GenericTable, LoadingIndicator, ErrorMessage, ConfirmDialog } from '../../components';
import {
    useReactTable,
    getPaginationRowModel,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import { FaEye, FaTrash } from 'react-icons/fa';
import useRecordings from '../../hooks/useRecordingsQueries';
import { useCreateRecording, useDeleteRecording } from '../../hooks/useRecordingsMutations';
import { getRecordingStreamUrl } from '../../api/recordings';

const columnHelper = createColumnHelper();

export default function Recordings() {
    const { data: recordings = [], isLoading, isError, error } = useRecordings();
    const createRecordingMutation = useCreateRecording();
    const deleteRecordingMutation = useDeleteRecording();

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [showForm, setShowForm] = useState(false);
    const [selectedRecording, setSelectedRecording] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [recordingToDelete, setRecordingToDelete] = useState(null);

    const handleUpload = async (data) => {
        const file = data.recording_file?.[0];

        if (!file) {
            alert('Please select a file.');
            return;
        }

        const fileName = file.name;
        const filePath = `C:/Users/bahra/OneDrive/Desktop/School/CS 4366/recordings/${fileName}`;
        const fileType = file.type;
        const fileSize = file.size;

        const now = new Date().toISOString();

        const payload = {
            fileName,
            filePath,
            fileType,
            fileSize,
            startTime: now,
            endTime: now,
        };

        return new Promise((resolve, reject) => {
            createRecordingMutation.mutate(payload, {
                onSuccess: () => {
                    setShowForm(false);
                    resolve(); // tells the form loading state to stop
                },
                onError: (err) => {
                    console.error('Upload failed:', err);
                    alert('Failed to create recording');
                    reject(err); // still stop loader on error
                },
            });
        });
    };

    const handleDelete = (recording) => {
        setRecordingToDelete(recording);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (recordingToDelete) {
            deleteRecordingMutation.mutate(recordingToDelete.id, {
                onSuccess: () => {
                    setConfirmOpen(false);
                    setRecordingToDelete(null);
                },
                onError: (err) => {
                    console.error('Delete failed:', err);
                    alert('Failed to delete recording.');
                    setConfirmOpen(false);
                },
            });
        }
    };

    const columns = [
        columnHelper.accessor('fileName', { header: 'File Name' }),
        columnHelper.accessor('fileType', { header: 'Type' }),
        columnHelper.accessor('fileSize', {
            header: 'Size (MB)',
            cell: ({ getValue }) => (getValue() / (1024 * 1024)).toFixed(2) + ' MB',
        }),
        columnHelper.accessor('startTime', {
            header: 'Start Time',
            cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
        }),
        columnHelper.accessor('endTime', {
            header: 'End Time',
            cell: ({ getValue }) => new Date(getValue()).toLocaleString(),
        }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-3">
                    <button
                        onClick={() => setSelectedRecording(row.original)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                        title="View"
                    >
                        <FaEye />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
        }),
    ];

    const table = useReactTable({
        data: recordings,
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
                <h1 className="text-3xl font-bold text-[#f5a944]">Recordings</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#43af52] text-white px-4 py-2 rounded shadow hover:bg-[#43af52] cursor-pointer"
                >
                    + Upload Recording
                </button>
            </div>

            {isLoading ? (<LoadingIndicator message="Loading recordings..." />)
                : isError ? (
                        <div className="mt-10">
                            <ErrorMessage
                                message="Failed to load recordings."
                                details={error?.message}
                            />
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
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Add New Recording</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-800 text-xl font-bold cursor-pointer">&times;</button>
                        </div>
                        <RecordingForm onSubmit={handleUpload} />
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={confirmOpen}
                title="Delete Recording"
                message={
                    recordingToDelete
                        ? `Are you sure you want to delete "${recordingToDelete.fileName}"? This cannot be undone.`
                        : ''
                }
                onConfirm={confirmDelete}
                onCancel={() => {
                    setConfirmOpen(false);
                    setRecordingToDelete(null);
                }}
            />

            {selectedRecording && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg w-full max-w-3xl shadow-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {selectedRecording.fileName}
                            </h3>
                            <button
                                onClick={() => setSelectedRecording(null)}
                                className="text-gray-500 hover:text-gray-800 text-xl font-bold cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                        <video
                            src={getRecordingStreamUrl(selectedRecording.id)}
                            controls
                            className="w-full rounded-lg shadow"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            )}

        </div>
    );
};
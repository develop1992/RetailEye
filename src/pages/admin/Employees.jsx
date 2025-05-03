import React, { useState } from 'react';
import { EmployeeForm, GenericTable, LoadingIndicator, ErrorMessage, ConfirmDialog } from '@/components';
import {
    useReactTable,
    getPaginationRowModel,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useEmployees from '@/hooks/useEmployeesQueries';
import { useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '@/hooks/useEmployeesMutations';

const columnHelper = createColumnHelper();

export default function Employees() {
    const { data: employees = [], isLoading, isError, error } = useEmployees();
    const createEmployeeMutation = useCreateEmployee();
    const updateEmployeeMutation = useUpdateEmployee();
    const deleteEmployeeMutation = useDeleteEmployee();

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [showForm, setShowForm] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const handleSubmit = (data) => {
        if (editingEmployee) {
            const updated = { ...editingEmployee, ...data };
            updateEmployeeMutation.mutate(updated, {
                onSuccess: () => {
                    setShowForm(false);
                    setEditingEmployee(null);
                },
                onError: (err) => {
                    console.error('Update failed:', err);
                    alert('Failed to update employee');
                },
            });
        } else {
            createEmployeeMutation.mutate(data, {
                onSuccess: () => {
                    setShowForm(false);
                },
                onError: (err) => {
                    console.error('Create failed:', err);
                    alert('Failed to create employee');
                },
            });
        }
    };

    const handleEdit = (emp) => {
        setEditingEmployee(emp);
        setShowForm(true);
    };

    const handleDelete = (employee) => {
        setEmployeeToDelete(employee);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        if (employeeToDelete) {
            deleteEmployeeMutation.mutate(employeeToDelete.id, {
                onSuccess: () => {
                    setConfirmOpen(false);
                    setEmployeeToDelete(null);
                },
                onError: (err) => {
                    console.error('Delete failed:', err);
                    alert('Failed to delete employee.');
                    setConfirmOpen(false);
                },
            });
        }
    };

    const columns = [
        columnHelper.accessor(row => `${row.firstName} ${row.middleName} ${row.lastName}`, {
            id: 'name',
            header: 'Name',
        }),
        columnHelper.accessor('role', { header: 'Role' }),
        columnHelper.accessor('phoneNumber', { header: 'Phone' }),
        columnHelper.accessor('email', { header: 'Email' }),
        columnHelper.accessor('address', { header: 'Address' }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-4">
                    <button onClick={() => handleEdit(row.original)} className="text-blue-600 hover:text-blue-800 cursor-pointer"><FaEdit /></button>
                    {row.original?.role !== 'Manager' && !['f66f9522-f48d-47f9-969f-2ce9cd48c002', 'f5743f51-26c4-42af-a71f-22d4faa0220e'].includes(row.original?.id) && <button onClick={() => handleDelete(row.original)} className="text-red-600 hover:text-red-800 cursor-pointer"><FaTrash /></button> }
                </div>
            ),
        }),
    ];

    const table = useReactTable({
        data: employees,
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
                <h1 className="text-3xl font-bold text-[#f5a944]">Employees</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-[#43af52] text-white px-4 py-2 rounded shadow hover:bg-[#43af52] cursor-pointer"
                >
                    + Create Employee
                </button>
            </div>

            {isLoading ? (
                <LoadingIndicator message="Loading employees..." />
            ) : isError ? (
                <div className="mt-10">
                    <ErrorMessage
                        message="Failed to load employees."
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

            {/* Modal-style form */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingEmployee(null);
                                }}
                                className="text-gray-500 hover:text-gray-800 text-xl font-bold cursor-pointer"
                            >
                                &times;
                            </button>
                        </div>
                        <EmployeeForm
                            onSubmit={handleSubmit}
                            initialValues={editingEmployee}
                        />
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={confirmOpen}
                title="Delete Employee"
                message={
                    employeeToDelete
                        ? `Are you sure you want to delete ${employeeToDelete.firstName} ${employeeToDelete.lastName}?`
                        : ''
                }
                onConfirm={confirmDelete}
                onCancel={() => {
                    setConfirmOpen(false);
                    setEmployeeToDelete(null);
                }}
            />

        </div>
    );
};
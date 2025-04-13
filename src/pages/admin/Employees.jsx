import React, { useState } from 'react';
import { EmployeeForm, GenericTable } from '../../components/index.js';
import {
    useReactTable,
    getCoreRowModel,
    createColumnHelper,
} from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';

const initialEmployees = [
    { id: 1, first_name: 'John', middle_name: 'Smith', last_name: 'Doe', role: 'Cashier',  phone_number: '806-345-2134', email:'smith@walmart.com', address: '201 first st lubbock tx, 74099'},
    { id: 2, first_name: 'David', middle_name: 'Micheal', last_name: 'Doe', role: 'General Merchandising',  phone_number: '806-789-1290', email:'micheal@walmart.com', address: '201 main st lubbock tx, 74213'},
    { id: 3, first_name: 'Lucas', middle_name: 'Pedro', last_name: 'Doe', role: 'Stocking and Unloading',  phone_number: '806-641-0947', email:'pedro@walmart.com', address: '201 hudson st lubbock tx, 74589'},
];

const columnHelper = createColumnHelper();

export default function Employees() {
    const [employees, setEmployees] = useState(initialEmployees);
    const [showForm, setShowForm] = useState(false);

    const handleCreate = (newEmployee) => {
        setEmployees(prev => [
            ...prev,
            { ...newEmployee, id: prev.length + 1 }
        ]);
        setShowForm(false);
    };

    const handleEdit = (emp) => {
        console.log('Edit:', emp);
    };

    const handleDelete = (emp) => {
        setEmployees(prev => prev.filter(e => e.id !== emp.id));
    };

    const columns = [
        columnHelper.accessor(row => `${row.first_name} ${row.middle_name} ${row.last_name}`, {
            id: 'name',
            header: 'Name',
        }),
        columnHelper.accessor('role', { header: 'Role' }),
        columnHelper.accessor('phone_number', { header: 'Phone' }),
        columnHelper.accessor('email', { header: 'Email' }),
        columnHelper.accessor('address', { header: 'Address' }),
        columnHelper.display({
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <div className="flex space-x-4">
                    <button onClick={() => handleEdit(row.original)} className="text-blue-600 hover:text-blue-800"><FaEdit /></button>
                    <button onClick={() => handleDelete(row.original)} className="text-red-600 hover:text-red-800"><FaTrash /></button>
                </div>
            )
        })
    ];

    const table = useReactTable({
        data: employees,
        columns,
        getCoreRowModel: getCoreRowModel(),
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

            <GenericTable table={table} />

            {/* Modal-style form */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Add New Employee</h2>
                            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-800 text-xl font-bold">&times;</button>
                        </div>
                        <EmployeeForm onSubmit={handleCreate} />
                    </div>
                </div>
            )}
        </div>
    );
}
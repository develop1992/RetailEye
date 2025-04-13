// components/shared/GenericTable.jsx
import React from 'react';
import { flexRender } from '@tanstack/react-table';

export default function GenericTable({ table }) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg text-gray-800">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#4762fe] text-white">
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="px-6 py-3 text-left text-sm font-semibold">
                                {flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="hover:bg-gray-100">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-6 py-4 text-sm text-left">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
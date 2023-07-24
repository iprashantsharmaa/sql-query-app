import React, { useRef } from 'react';
import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';
import Pagination from './Pagination';

function Table({
  columns,
  data,
  onPrevPageClick,
  onNextPageClick,
}) {
  const tableRef = useRef(null);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const scrollTableToTop = () => {
    tableRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const handlePrevPageClick = () => {
    onPrevPageClick();
    scrollTableToTop();
  };

  const handleNextPageClick = () => {
    onNextPageClick();
    scrollTableToTop();
  };

  return (
    <>
      <div className="flex flex-col h-full w-full border border-gray-300 rounded overflow-auto">
        <table ref={tableRef} className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                className="bg-blue-600"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    className="text-white text-sm text-left capitalize py-4 px-4 min-w-[6rem]"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="capitalize p-4 border-b text-sm"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        onPrevPage={handlePrevPageClick}
        onNextPage={handleNextPageClick}
      />
    </>
  );
}

export default Table;

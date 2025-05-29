'use client';

import { DataTableColumnHeader } from '@/components/data-table/sortable';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

// Define the type of the data structure
export type DataType = {
  id: number;
  title: string;
  description: string;
  type: string; // Replace with an enum if necessary: 'LONG_TERM' | 'SHORT_TERM'
  userId: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
};

// Column definitions
export const columns: ColumnDef<DataType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    enableSorting: true, // Enable sorting for the title column
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(), // Format the date
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
    cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(), // Format the date
  },
];

'use client';

import { DataTableColumnHeader } from '@/components/data-table/sortable';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of your data.
export type Goal = {
  id: string;
  title: string;
  description: string;
  goalId: number;
  due: string;
  createdAt: string;
  updatedAt: string;
  goal: {
    id: number;
    title: string; // Goal Name
    description: string;
    type: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const columns: ColumnDef<Goal>[] = [
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
    accessorKey: 'title', // Task Title
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Task Name' />
    ),
  },
  {
    accessorKey: 'description', // Task Description
    header: 'Description',
  },
  {
    accessorKey: 'due', // Task Due Date
    header: 'Due Date',
  },
  {
    accessorKey: 'createdAt', // Task Created Date
    header: 'Created At',
  },
  {
    accessorKey: 'updatedAt', // Task Updated Date
    header: 'Updated At',
  },
  {
    accessorKey: 'goal.title', // Only the Goal Title (Goal Name)
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Goal Name' />
    ),
  },
];

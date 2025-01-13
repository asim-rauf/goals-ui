'use client';
import { columns, Payment } from './columns';
import { DataTable } from './data-table';

// Fetch data from your API here.
const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
];
export default function Page() {
  return (
    <>
      <div className='py-10'>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}

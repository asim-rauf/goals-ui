'use client';
import { DataTable } from '@/components/data-table/table';
import { columns, Payment } from './columns';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CommonSheet } from '@/components/commot-sheet';
import { SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };
  return (
    <>
      <div className='py-10'>
        <DataTable
          columns={columns}
          data={data}
          showAddAction={true}
          renderSheetContent={
            <form onSubmit={handleSubmit}>
              <CommonSheet
                title='Add Goal'
                description='Add goals to achieve better'
                triggerText='Add Goal'
                footer={
                  <SheetClose asChild>
                    <Button type='submit'>Save changes</Button>
                  </SheetClose>
                }>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-center'>
                    Title:
                  </Label>
                  <Input
                    id='name'
                    placeholder='Goal title'
                    className='col-span-3'
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='username' className='text-right'>
                    Description:
                  </Label>
                  <Textarea className='col-span-3' placeholder='Description ' />
                </div>
              </CommonSheet>
            </form>
          }
        />
      </div>
    </>
  );
}

'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DataTable } from '@/components/data-table/table';
import { columns } from './columns';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CommonSheet } from '@/components/commot-sheet';
import { SheetClose } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useAddGoal from '@/hooks/api/use-add-goal';
import useGetGoals from '@/hooks/api/use-get-goals';

// Dummy data

interface FormData {
  title: string;
  description: string;
  goalType: string;
}

export default function Page() {
  const { mutate: addGoal } = useAddGoal();
  const { data: goals, isPending } = useGetGoals();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    addGoal(
      {
        title: formData.title,
        description: formData.description ?? '',
        goalType: formData.goalType,
      },
      {
        onSuccess: () => {
          // Close the sheet and reset the form upon success
          setIsSheetOpen(false);
          reset();
        },
        onError: () => {
          // Handle error (optional)
          alert('Failed to add the goal. Please try again.');
        },
      }
    );
  };

  return (
    <Card className='my-10 p-4 py-2 rounded-md'>
      <DataTable
        columns={columns}
        data={goals}
        showAddAction={true}
        loading={isPending}
        renderSheetContent={
          <CommonSheet
            title='Add Goal'
            description='Add goals to achieve better'
            triggerText='Add Goal'
            isOpen={isSheetOpen}
            onOpenChange={setIsSheetOpen}>
            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 py-4'>
              <div>
                <Label htmlFor='title'>Title:</Label>
                <Input
                  id='title'
                  {...register('title', { required: 'Title is required' })}
                  placeholder='Goal title'
                />
                {errors.title && (
                  <p className='text-red-500'>{errors.title.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor='description'>Description:</Label>
                <Textarea
                  id='description'
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  placeholder='Description'
                />
                {errors.description && (
                  <p className='text-red-500'>{errors.description.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor='goalType'>Goal Type:</Label>
                <Controller
                  name='goalType'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Please select a goal type' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a goal type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='SHORT_TERM'>Short Term</SelectItem>
                        <SelectItem value='LONG_TERM'>Long Term</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.goalType && (
                  <p className='text-red-500'>{errors.goalType.message}</p>
                )}
              </div>
              <div className='flex justify-between items-center gap-x-6'>
                <Button type='submit' size='sm' className='w-[50%]'>
                  Save changes
                </Button>

                <SheetClose asChild>
                  <Button
                    variant='outline'
                    type='button'
                    size='sm'
                    className='w-[50%]'
                    onClick={() => {
                      reset();
                      setIsSheetOpen(false);
                    }}>
                    Close
                  </Button>
                </SheetClose>
              </div>
            </form>
          </CommonSheet>
        }
      />
    </Card>
  );
}

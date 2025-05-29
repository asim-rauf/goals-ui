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
import useGetGoals from '@/hooks/api/use-get-goals';
import useAddTask from '@/hooks/api/use-add-task';
import useGetTasks from '@/hooks/api/use-get-tasks';

// Dummy data

interface FormData {
  title: string;
  description: string;
  goalId: string;
}

export default function Page() {
  const { mutate: addTask } = useAddTask();
  const { data: tasks, isPending } = useGetTasks();
  const { data: goals } = useGetGoals();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    addTask(
      {
        title: formData.title,
        description: formData.description ?? '',
        goalId: formData.goalId,
      },
      {
        onSuccess: () => {
          // Close the sheet and reset the form upon success
          setIsSheetOpen(false);
          reset();
        },
      }
    );
  };

  return (
    <Card className='my-10 p-4 py-2 rounded-md'>
      <DataTable
        columns={columns}
        data={tasks}
        showAddAction={true}
        loading={isPending}
        renderSheetContent={
          <CommonSheet
            title='Add Goal'
            description='Add tasks to achieve goals better'
            triggerText='Add Task'
            isOpen={isSheetOpen}
            onOpenChange={setIsSheetOpen}>
            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 py-4'>
              <div>
                <Label htmlFor='title'>Title:</Label>
                <Input
                  id='title'
                  {...register('title', { required: 'Title is required' })}
                  placeholder='Task title'
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
                <Label htmlFor='goalId'>Goal:</Label>
                <Controller
                  name='goalId'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Please select a goal type' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue>
                          {goals?.find(
                            (goal: { id: string; title: string }) =>
                              String(goal.id) === field.value
                          )?.title || 'Select a goal'}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {goals?.map((goal: { id: string; title: string }) => (
                          <SelectItem key={goal.id} value={goal.id}>
                            {goal.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.goalId && (
                  <p className='text-red-500'>{errors.goalId.message}</p>
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

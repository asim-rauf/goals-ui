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
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useUploadFile from '@/hooks/api/use-add-goal';
// import useUploadFile from '@/hooks/api/use-upload-file';

interface FormData {
  project: string;
  sensor: string;
  file: FileList;
}

export default function Page() {
  const { mutate: uploadFile } = useUploadFile();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    if (!formData.file || formData.file.length === 0) {
      alert('Please select a file to upload.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('file', formData.file[0]);
    formDataToSend.append('project', formData.project);
    formDataToSend.append('sensor', formData.sensor);

    uploadFile(formDataToSend, {
      onSuccess: () => {
        setIsSheetOpen(false);
        reset();
      },
    });
  };

  return (
    <Card className='my-10 p-4 py-2 rounded-md'>
      <DataTable
        columns={columns}
        data={[]}
        showAddAction={true}
        loading={false}
        renderSheetContent={
          <CommonSheet
            title='Upload File'
            description='Upload a file with project and sensor selection'
            triggerText='Upload File'
            isOpen={isSheetOpen}
            onOpenChange={setIsSheetOpen}>
            <form onSubmit={handleSubmit(onSubmit)} className='grid gap-4 py-4'>
              {/* Project Selection */}
              <div>
                <Label htmlFor='project'>Project:</Label>
                <Controller
                  name='project'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Please select a project' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a project' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Project_A'>Project A</SelectItem>
                        <SelectItem value='Project_B'>Project B</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.project && (
                  <p className='text-red-500'>{errors.project.message}</p>
                )}
              </div>

              {/* Sensor Selection */}
              <div>
                <Label htmlFor='sensor'>Sensor:</Label>
                <Controller
                  name='sensor'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Please select a sensor' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a sensor' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='Sensor_1'>Sensor 1</SelectItem>
                        <SelectItem value='Sensor_2'>Sensor 2</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.sensor && (
                  <p className='text-red-500'>{errors.sensor.message}</p>
                )}
              </div>

              {/* File Input */}
              <div>
                <Label htmlFor='file'>File:</Label>
                <Input
                  id='file'
                  type='file'
                  {...register('file', { required: 'Please upload a file' })}
                />
                {errors.file && (
                  <p className='text-red-500'>{errors.file.message}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className='flex justify-between items-center gap-x-6'>
                <Button type='submit' size='sm' className='w-[50%]'>
                  Upload
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

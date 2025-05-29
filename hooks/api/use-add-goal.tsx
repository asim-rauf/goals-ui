import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from '../use-toast';

const uploadFileApi = async (formData: FormData) => {
  const response = await axios.post(
    'http://localhost:3000/api/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};

export default function useUploadFile() {
  return useMutation({
    mutationFn: uploadFileApi,
    onSuccess: () => {
      toast({
        variant: 'default',
        title: 'Success',
        description:
          'File Uploaded Successfully. Pleas wait report is being generated',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to upload file.',
      });
    },
  });
}

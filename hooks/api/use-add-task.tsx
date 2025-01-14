import { useMutation } from '@tanstack/react-query';
import { addTask } from './api-actions';
import { toast } from '../use-toast';
import { queryClient } from '@/contexts/query-client';
import { API_TAGS } from './api-tags';
interface FormData {
  title: string;
  description: string;
  goalId: string;
}

const useAddTask = () => {
  return useMutation({
    mutationFn: async ({ title, description, goalId }: FormData) => {
      const body = {
        title,
        goalId: Number(goalId),
        description,
      };
      try {
        const response = await addTask(body);
        toast({
          variant: 'default',
          title: 'Success',
          description: response.message,
        });
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong',
        });
        console.log(err);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [API_TAGS.GET_GOALS],
        exact: false,
      });
    },
  });
};
export default useAddTask;

import { useMutation } from '@tanstack/react-query';
import { addGoal } from './api-actions';
import { useAuth } from '@clerk/nextjs';
import { toast } from '../use-toast';
import { queryClient } from '@/contexts/query-client';
import { API_TAGS } from './api-tags';
interface FormData {
  title: string;
  description: string;
  goalType: string;
}

const useAddGoal = () => {
  const { userId } = useAuth();
  return useMutation({
    mutationFn: async ({ title, description, goalType }: FormData) => {
      const body = {
        title,
        type: goalType,
        description,
        userId,
      };
      try {
        const response = await addGoal(body);
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
export default useAddGoal;

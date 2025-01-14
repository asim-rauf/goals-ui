import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { API_TAGS } from './api-tags';
import { getTasks } from './api-actions';

const useGetTasks = () => {
  const { userId } = useAuth();

  const query = useQuery({
    queryKey: [API_TAGS.GET_TASKS, userId],
    queryFn: () => getTasks(userId),
    enabled: Boolean(userId),
    refetchOnMount: true,
    staleTime: 0,
    retry: false,
  });

  return { ...query };
};

export default useGetTasks;
